// 로그인 API

const router = require("express").Router() // express 안에 있는 Router만 import
const maria = require("../../database/db");

// 로그인 라우트
router.post("/", async (req, res) => {
    const { id, password } = req.body;
    const result = {
        "success" : false,
        "message" : "",
        "data" : null
    }

    try {
         // 예외처리
        if(id === null || id === undefined || id === ""){
            throw new Error("아이디를 입력해주세요.")
        } else if(password === null || password === undefined || password === ""){
            throw new Error("비밀번호를 입력해주세요.")
        }

        // DB통신
        // const loginResult = await new Promise((resolve, reject) => {
        //     maria.query('SELECT * FROM user WHERE id = ? AND password = ?', [id, password], (err, results) => {
        //         if (err) {
        //             reject(err); // 오류 발생 시 reject 호출
        //         } else {
        //             resolve(results); // 결과 반환 시 resolve 호출
        //         }
        //     });
        // });

        const connection = await maria.getConnection(); // 연결 생성
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ? AND password = ?', [id, password])

        // DB 통신 결과 처리
        if (rows.length > 0) {
            req.session.userIdx = rows[0].idx; // 세션에 사용자의 idx 저장
            console.log("Session 사용자 idx:", req.session.userIdx); // session 정보 확인

            result.success = true;
            result.message = "로그인 성공!";
            result.data = rows[0]; // 로그인에 성공한 사용자 정보 저장
        } else {
            result.message = "해당 계정 정보가 존재하지 않습니다.";
        }
    } catch (e) {
        result.message = e.message;
    } finally {
        res.send(result);
    }
});

module.exports = router;