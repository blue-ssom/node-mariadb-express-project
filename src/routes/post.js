// 게시글과 관련된 API

const router = require("express").Router() // express 안에 있는 Router만 import
const maria = require("../../database/db");
const utils = require('../utils');

// 게시글 보기
router.get('/', (req, res) => {

});

// 게시글 추가하기
router.post('/', (req, res) => {

});

// 게시글 수정하기
router.put('/', (req, res) => {

});

// 게시글 삭제하기
router.delete('/', (req, res) => {

});

// export 작업
module.exports = router