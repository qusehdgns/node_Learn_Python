// routes/View_index.js
// url 매핑 역할 Django urls.py 역할

// express 라이브러리의 라우터 기능 선언
const router = require("express").Router();

const usersrouter = require('./user_routes');

// Api

// 회원가입
router.use("/api/users", usersrouter);

// 생성 모듈에 선언한 라우터 추가
module.exports = router;