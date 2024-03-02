// 댓글과 관련된 API

const router = require("express").Router() // express 안에 있는 Router만 import
const maria = require("../../database/db");

// 댓글 보기
router.get('/:postIdx', async(req, res) => {
    const postIdx = req.params.postIdx; // 사용자가 입력한 PostIdx
    const sessionUserIdx = req.session.userIdx; // 세션에 저장된 사용자 idx
    console.log("댓글 보기 세션: ", sessionUserIdx)

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
        const commentInfoResult = await new Promise((resolve, reject) => {
            maria.query('SELECT * FROM comment where post_id = ? ', [postIdx], (err, results) => {
                if (err) {
                    reject(err); // 오류 발생 시 reject 호출
                } else {
                    resolve(results); // 결과 반환 시 resolve 호출
                }
            });
        });

        // DB 통신 결과 처리
        result.success = true;
        result.message = "해당 게시글의 댓글 보기";
        result.data = commentInfoResult;

    } catch (e) {
    result.message = e.message;
    } finally {
    res.send(result);
    }

});

// 댓글 추가
router.post('/:postIdx', (req, res) => {

});

// 댓글 수정
router.put('/:postIdx/:commentIdx', (req, res) => {

});

// 댓글 삭제
router.delete('/:postIdx/:commentIdx', (req, res) => {

});

// export 작업
module.exports = router