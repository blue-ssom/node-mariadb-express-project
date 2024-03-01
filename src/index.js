// express.js import하기
const express = require("express")
const router = express.Router();

const maria = require("./database/db")

// 유저 테이블 조회하기
router.get('/users', (req, res) => {
    maria.query('SELECT * FROM user', function(err, rows) {
        if (err) {
            // 에러 처리
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching users');
            return;
        }
        
        // 결과 처리
        res.json(rows);
    });
});

module.exports = router;