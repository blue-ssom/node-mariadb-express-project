// 게시글과 관련된 API

const router = require("express").Router() // express 안에 있는 Router만 import
const maria = require("../../database/db");
const utils = require('../utils');

// 게시글 보기
router.get('/all', async(req, res) => {
    const sessionUserIdx = req.session.userIdx; // 세션에 저장된 사용자 idx
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

// 게시글 추가하기
router.post('/', async(req, res) => {

});

// 게시글 수정하기
router.put('/', (req, res) => {

});

// 게시글 삭제하기
router.delete('/', (req, res) => {

});

// export 작업
module.exports = router