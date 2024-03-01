// express.js import하기
const express = require("express")
const session = require('express-session');
const maria = require("./database/db") // mariaDB연결

const app = express()
const port = 8000

app.use(express.urlencoded({ extended: false })); // application/x-www-form-urlencode
app.use(express.json()); // application/json

// 세션 설정
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}))

// API ( 파일을 반환하는 API )
app.get("/mainpage",(req,res) => {
    res.sendFile(`${__dirname}/main.html`)
})

const loginRouter = require('./src/index');  // index.js파일 import
app.use('/login', loginRouter); // 로그인 라우터를 사용하도록 설정

const accountApi = require("./src/routes/account") // account.js파일 import
app.use("/account", accountApi)

// Web Server 실행 코드
app.listen(port, () => {
    console.log(`${port}번에서 HTTP Web Server 실행`)
})