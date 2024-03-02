// 게시글과 관련된 API

const router = require("express").Router() // express 안에 있는 Router만 import
const maria = require("../../database/db");

// 게시글 보기
router.get('/all', async(req, res) => {
    const sessionUserIdx = req.session.userIdx; // 세션에 저장된 사용자 idx
    console.log("게시글 보기기 세션: ", sessionUserIdx)

    const result = {
            "success" : false,
            "message" : "",
            "data" : null
        }
   
   try {

        // 예외처리
        // if (!sessionUserIdx) {
        //   throw new Error("잘못된 접근입니다.")   // 세션이 없는 경우
        // } 

        // DB통신
        const postInfoResult = await new Promise((resolve, reject) => {
            maria.query('SELECT * FROM post', (err, results) => {
                if (err) {
                    reject(err); // 오류 발생 시 reject 호출
                } else {
                    resolve(results); // 결과 반환 시 resolve 호출
                }
            });
        });

        // DB 통신 결과 처리
        result.success = true;
        result.message = "게시글 보기";
        result.data = postInfoResult;

    } catch (e) {
    result.message = e.message;
    } finally {
    res.send(result);
    }
});

// 게시글 추가
router.post('/', async(req, res) => {
    const sessionUserIdx = req.session.userIdx; // 세션에 저장된 사용자 idx
    console.log("게시글 추가하기 세션: ", sessionUserIdx)
    
    const { title, content } = req.body
    const result = {
        "success" : false,
        "message" : "",
        "data" : null
    }

    try {

        // 예외처리
        // if (!sessionUserIdx) {
        //   throw new Error("잘못된 접근입니다.")   // 세션이 없는 경우
        // } 

        if(title === null || title === undefined || title === ""){
            throw new Error("제목을 입력해주세요.")
        }else if(content === null || content === undefined || content === ""){
            throw new Error("내용을 입력해주세요.")
        }

        // DB통신
        const createPostResult = await new Promise((resolve, reject) => {
            maria.query('INSERT INTO post (user_idx, title, content, creationDate, updationDate) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)', [sessionUserIdx, title, content], (err, results) => {
                if (err) {
                    reject(err); // 오류 발생 시 reject 호출
                } else {
                    resolve(results); // 결과 반환 시 resolve 호출
                }
            });
        });

        // DB 통신 결과 처리
        // affectedRows는 삽입된 행의 수
        if (createPostResult.affectedRows > 0) {
            result.success = true;
            result.message = "게시글 추가하기";
        } else {
            result.message = "게시글 작성 실패";
        }
        
    } catch(e) {
        result.message = e.message;
    } finally {
        res.send(result);
    }
});

// 게시글 수정
router.put('/:postIdx', (req, res) => {

});

// 게시글 삭제
router.delete('/:postIdx', (req, res) => {

});

// export 작업
module.exports = router