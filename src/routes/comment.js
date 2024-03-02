// 댓글과 관련된 API

const router = require("express").Router() // express 안에 있는 Router만 import
const maria = require("../../database/db");

// 댓글 보기
router.get('/:postIdx', (req, res) => {

});

// 댓글 추가
router.post('/:postIdx', (req, res) => {

});

// 댓글 수정
router.put('/:postIdx/:commentIdx', (req, res) => {

});

// 댓글 삭제
router.delete('/:postIdx/:commentIdx', (req, res) => {

});

// export 작업
module.exports = router