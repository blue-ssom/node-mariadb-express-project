// mariaDB 모듈 할당
const maria = require('mysql2/promise')

// creationConnection 메소드 호출
const connection = maria.createPool({
    host : 'localhost', // mariaDB가 존재하는 서버의 주소
    user : 'stageus',   // mariaDB의 계정
    password: '1234',   // mariaDB 계정의 비밀번호
    database : 'web'    // 접속 후 사용할 DB
})

module.exports = connection