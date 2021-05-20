// routes/View_index.js
// url 매핑 역할 Django urls.py 역할

// express 라이브러리의 라우터 기능 선언
const router = require("express").Router();
// 실행 함수가 있는 controller 선언
const controller = require("../controllers/users_controller");
// Middleware에서 사용한 auth 선언
const { auth } = require("../middleware/auth");

// Api

// 회원가입
router.post("/register", controller.usersregister);

// login
router.post("/login", controller.userslogin);

// 유저 정보 호출
router.get("/auth", auth, controller.usersauth);

// logout
router.get("/logout", auth, controller.userslogout);

// Findid
router.get("/findid", controller.usersfindid);

// CheckEmail
router.get("/checkemail", controller.usercheckemail);

// ResetPassword
router.put("/resetpassword", controller.userresetpassword);

// move Study_id
router.put("/movestudy", controller.usermoveStudy);

// 생성 모듈에 선언한 라우터 추가
module.exports = router;