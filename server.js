// express.js import하기
const express = require("express")
const session = require('express-session');
const maria = require("./database/db")  // mariaDB연결
const utils = require('./src/utils');

const app = express()
const port = 8000

app.use(express.json());    // application/json

// 세션 설정
app.use(session({
    secret: 'secret-key',       // [필수] SID를 생성할 때 사용되는 비밀 키로 String or Array 사용 가능.
    resave: false,              // true(default): 변경 사항이 없어도 세션을 다시 저장, false: 변경 시에만 다시 저장
    saveUninitialized: true,    // true: 어떠한 데이터도 추가되거나 변경되지 않은 세션 설정 허용, false: 비허용
    cookie: { maxAge: 1800000 } // 30분으로 세션 만료 시간을 설정(= 30 * 60 * 1000 ms)
}))

// API ( 파일을 반환하는 API )
app.get("/mainpage",(req,res) => {
    res.sendFile(`${__dirname}/main.html`)
})

const loginRouter = require('./src/routes/index');  // index.js파일 import
app.use('/login', loginRouter);

const accountApi = require("./src/routes/account") // account.js파일 import
app.use("/account", accountApi)

const postApi = require("./src/routes/post") // post.js파일 import
app.use("/post", postApi)

const commentApi = require("./src/routes/comment") // comment.js파일 import
app.use("/comment", commentApi)

// Web Server 실행 코드
app.listen(port, () => {
    console.log(`${port}번에서 HTTP Web Server 실행`)
})