// routes/View_index.js
// url 매핑 역할 Django urls.py 역할

// express 라이브러리의 라우터 기능 선언
const router = require("express").Router();
// 실행 함수가 있는 controller 선언
const controller = require("../controllers/wiki_controller");
// Middleware에서 사용한 auth 선언
const { auth } = require("../middleware/auth");

// API
router.post('/', auth, controller.createWiki);

// router.get('/:quiz_id', controller.readWiki);

// router.put('/:_id', auth, controller.updateWiki);

// router.delete('/:_id', auth, controller.deleteWiki);

module.exports = router;