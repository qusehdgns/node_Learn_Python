// routes/View_index.js
// url 매핑 역할 Django urls.py 역할

// express 라이브러리의 라우터 기능 선언
const router = require("express").Router();
// 실행 함수가 있는 controller 선언
const controller = require("../controllers/quiz_controller");

// API

router.get('/', controller.readQuiz);

router.post('/:quiz_id', controller.solveQuiz);

module.exports = router;