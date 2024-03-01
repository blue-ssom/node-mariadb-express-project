// 계정과 관련된 API

const router = require("express").Router() // express 안에 있는 Router만 import
const maria = require("../../database/db");

// 아이디 찾기
router.get('/find-id', async(req, res) => {
    const { name, phoneNumber} = req.body
    const result = {
        "success" : false,
        "message" : "",
        "data" : null
    }

    try {
        // 예외처리
       if(name === null || name === undefined || name === ""){
           throw new Error("이름를 입력해주세요.")
       } else if(phoneNumber === null || phoneNumber === undefined || phoneNumber === ""){
           throw new Error("전화번호를 입력해주세요.")
       }

       // DB통신
       const findIdResult = await new Promise((resolve, reject) => {
           maria.query('SELECT id FROM user WHERE name = ? AND phoneNumber = ?', [name, phoneNumber], (err, results) => {
               if (err) {
                   reject(err); // 오류 발생 시 reject 호출
               } else {
                   resolve(results); // 결과 반환 시 resolve 호출
               }
           });
       });

       // DB 통신 결과 처리
       if (findIdResult.length > 0) {
           result.success = true;
           result.message = "아이디 찾기 성공!";
           result.data = findIdResult[0]; // 결과의 첫 번째 아이디를 반환
       } else {
           result.message = "해당 계정 정보가 존재하지 않습니다.";
       }
   } catch (e) {
       result.message = e.message;
   } finally {
       res.send(result);
   }
});

// 비밀번호 찾기
router.get('/find-password', (req, res) => {

});

// 내 정보 보기
router.get('/:idx', (req, res) => {

});

// 회원가입
router.post('/', async(req, res) => {
    const { id, password, name, phoneNumber, email, address } = req.body
    console.log(req.body);

    const result = {
        "success" : false,
        "message" : "",
        "data" : null
    }

    try {

        // 예외처리
        if(id === null || id === undefined || id === ""){
            throw new Error("아이디를 입력해주세요.")
        }else if(password === null || password === undefined || password === ""){
            throw new Error("비밀번호를 입력해주세요.")
        }else if(name === null || name === undefined || name === ""){
            throw new Error("이름 입력해주세요.")
        }else if(phoneNumber === null || phoneNumber === undefined || phoneNumber === ""){
            throw new Error("전화번호를 입력해주세요.")
        }else if(email === null || email === undefined || email === ""){
            throw new Error("이메일을 입력해주세요.")
        }else if(address === null || address === undefined || address === ""){
            throw new Error("주소를 입력해주세요.")
        }

        // DB통신
        // 1. 아이디 중복 확인
        const duplicateResult = await checkDuplicateId(id);
        if (duplicateResult) {
            throw new Error("이미 존재하는 아이디입니다.");
        }

        // 2. 회원가입 진행
        const insertResult = await new Promise((resolve, reject) => {
            maria.query('INSERT INTO user (id, password, name, phoneNumber, email, address) VALUES (?, ?, ?, ?, ?, ?)', [id, password, name, phoneNumber, email, address], (err, results) => {
                if (err) {
                    reject(err); // 오류 발생 시 reject 호출
                } else {
                    resolve(results); // 결과 반환 시 resolve 호출
                }
            });
        });

        // DB 통신 결과 처리
        if (insertResult.affectedRows > 0) {
            result.success = true;
            result.message = "회원가입 성공!";
        } else {
            result.message = "회원가입 실패";
        }
        
    } catch(e) {
        result.message = e.message;
    } finally {
        res.send(result);
    }

});

router.put('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

// 아이디 중복 확인
function checkDuplicateId(id) {
    return new Promise((resolve, reject) => {
        maria.query('SELECT COUNT(*) FROM user WHERE id = ?', [id], (err, results) => {
            if (err) {
                reject(err); // 에러 발생 시 처리
            }

            const { count } = results[0];
            resolve(count > 0); // 중복 여부를 resolve로 반환
        });
    });
}

// export 작업
module.exports = router