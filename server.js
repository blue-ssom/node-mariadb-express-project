// express.js import하기
const express = require("express")
const session = require('express-session');

const app = express()
const port = 8000

// 세션 설정
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}))

// mariaDB연결
const maria = require("./database/db")
maria.query(`SELECT * FROM user`, function(error, result){
    if(error){
        console.error('Error executing query:', error);
        return;
    }
    console.log(result);
});

// API ( 파일을 반환하는 API )
//app.get("/mainpage",(req,res) => {
//    res.sendFile(`${__dirname}/main.html`)
//})


// Web Server 실행 코드
app.listen(port, () => {
    console.log(`${port}번에서 HTTP Web Server 실행`)
})