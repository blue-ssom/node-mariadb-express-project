const maria = require("../database/db");

// 아이디 중복 확인
function checkDuplicateId(id) {
    return new Promise((resolve, reject) => {
        maria.query('SELECT COUNT(*) FROM user WHERE id = ?', [id], (err, rows) => {
            if (err) {
                reject(err); // 에러 발생 시 처리
            }

            // maria.query로 실행된 쿼리 결과는 rows 배열에 담김
            // 첫 번째 행의 COUNT(*) 컬럼 값 읽어오기
            const count = rows[0]['COUNT(*)'];
            console.log("rows",rows);
            console.log("count",count);
            resolve(count > 0); // 중복 여부를 resolve로 반환
        });
    });
}


module.exports = {
    checkDuplicateId
};