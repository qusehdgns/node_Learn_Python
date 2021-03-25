// routes/View_index.js
// url 매핑 역할 Django urls.py 역할

// express 라이브러리의 라우터 기능 선언
const router = require("express").Router();
// 실행 함수가 있는 controller 선언
const controller = require("../controllers/controller");
// Middleware에서 사용한 auth 선언
const { auth } = require("../middleware/auth");

// Api

// 회원가입
router.post("/api/users/register", controller.usersregister);

// login
router.post("/api/users/login", controller.userslogin);

// 유저 정보 호출
router.get("/api/users/auth", auth, controller.usersauth);

// logout
router.get("/api/users/logout", auth, controller.userslogout);

// 생성 모듈에 선언한 라우터 추가
module.exports = router;