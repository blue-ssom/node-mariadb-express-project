// 계정과 관련된 API

const router = require("express").Router() // express 안에 있는 Router만 import
const maria = require("../../database/db");
const utils = require('../utils');


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
        const findIdResult = await maria.query('SELECT id FROM user WHERE name = ? AND phoneNumber = ?', [name, phoneNumber])

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
router.get('/find-password', async(req, res) => {
    const { id, name, phoneNumber} = req.body
    const result = {
        "success" : false,
        "message" : "",
        "data" : null
    }

    try {

        // 예외처리
        if(id === null || id === undefined || id === ""){
                throw new Error("아이디를 입력해주세요.")
        }else if(name === null || name === undefined || name === ""){
            throw new Error("이름를 입력해주세요.")
        }else if(phoneNumber === null || phoneNumber === undefined || phoneNumber === ""){
            throw new Error("전화번호를 입력해주세요.")
        }

        // DB통신
        const findIdResult = await maria.query('SELECT password FROM user WHERE id = ? AND name = ? AND phoneNumber = ?', [id, name, phoneNumber])


        // DB 통신 결과 처리
        if (findIdResult.length > 0) {
            result.success = true;
            result.message = "비밀번호 찾기 성공!";
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

// 특정 user 정보 보기
router.get('/:idx', async(req, res) => {
    const requestedUserIdx = req.params.idx; // 사용자가 입력한 idx
    const sessionUserIdx = req.session.userIdx; // 세션에 저장된 사용자 idx
    const result = {
            "success" : false,
            "message" : "",
            "data" : null
        }
   
   try {

        // 예외처리
        if (!sessionUserIdx) {
          throw new Error("잘못된 접근입니다.")   // 세션이 없는 경우
        }

        // DB통신
        //const userInfoResult = await maria.query('SELECT * FROM user WHERE idx = ?', [requestedUserIdx])
        const connection = await maria.getConnection(); // 연결 생성
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE idx = ?', [requestedUserIdx])


        // DB 통신 결과 처리
        result.success = true;
        result.message = "내 정보 보기";
        result.data = rows[0];

    } catch (e) {
    result.message = e.message;
    } finally {
    res.send(result);
    }

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
        const duplicateResult = await utils.checkDuplicateId(id);
        if (duplicateResult) {
            throw new Error("이미 존재하는 아이디입니다.");
        }

        // 2. 이메일 중복 확인
        // 3. 전화번호 중복 확인

        // 회원가입 진행
        const signUpResult = await maria.query('INSERT INTO user (id, password, name, phoneNumber, email, address) VALUES (?, ?, ?, ?, ?, ?)', [id, password, name, phoneNumber, email, address])

        // DB 통신 결과 처리
        result.success = true;
        result.data = signUpResult;
        
    } catch(e) {
        result.message = e.message;
    } finally {
        res.send(result);
    }

});

// 내 회원 정보 수정
router.put('/', async(req, res) => {
    const {password, name, phoneNumber, email, address } = req.body
    console.log(req.body);
    const requestedUserIdx = req.params.idx; // 사용자가 입력한 idx
    const sessionUserIdx = req.session.userIdx; // 세션에 저장된 사용자 idx
    console.log("회원 정보 수정 세션: ", sessionUserIdx);

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

        if(password === null || password === undefined || password === ""){
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
        const duplicateResult = await utils.checkDuplicateId(id);
        if (duplicateResult) {
            throw new Error("이미 존재하는 아이디입니다.");
        }

        // 2. 이메일 중복 확인
        // 3. 전화번호 중복 확인

        // 내 정보 수정 진행
        const updateUserResult = await maria.query('UPDATE user SET password=?, name=?, phoneNumber=?, email=?, address=? WHERE idx=?', [password, name, phoneNumber, email, address, sessionUserIdx])

        // DB 통신 결과 처리
        if (updateUserResult.affectedRows > 0) {
            result.success = true;
            result.message = "내 정보 수정 성공!";
            result.data = updateUserResult;
        } else {
            result.message = "내 정보 수정 실패";
        }
        
    } catch(e) {
        result.message = e.message;
    } finally {
        res.send(result);
    }

});

// 내 회원 탈퇴
router.delete('/', async(req, res) => {
    const requestedUserIdx = req.params.idx; // 사용자가 입력한 idx
    const sessionUserIdx = req.session.userIdx; // 세션에 저장된 사용자 idx
    console.log("회원 탈퇴 세션: ", sessionUserIdx);

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
        const deleteUserResult = await maria.query('DELETE FROM user WHERE idx = ?', [sessionUserIdx])

        // DB 통신 결과 처리
        if (deleteUserResult.affectedRows > 0) {
            result.success = true;
            result.message = "회원 탈퇴 성공";
        } else {
            result.message = "회원 탈퇴 실패";
        }
        
    } catch(e) {
        result.message = e.message;
    } finally {
        res.send(result);
    }
});

// export 작업
module.exports = router