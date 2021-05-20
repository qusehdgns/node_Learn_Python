// routes/View_index.js
// url 매핑 역할 Django urls.py 역할

// express 라이브러리의 라우터 기능 선언
const router = require("express").Router();
// 실행 함수가 있는 controller 선언
const controller = require("../controllers/list_controller");

// API

router.get('/chapterandindex', controller.ChapterandIndex);

router.get('/', controller.readStudyList);

module.exports = router;