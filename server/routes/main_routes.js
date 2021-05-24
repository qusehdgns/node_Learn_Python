// routes/View_index.js
// url 매핑 역할 Django urls.py 역할

// express 라이브러리의 라우터 기능 선언
const router = require("express").Router();

const usersrouter = require('./user_routes');
const qandarouter = require('./qanda_routes');
const replyrouter = require('./reply_routes');
const listrouter = require('./list_routes');
const studyrouter = require('./study_routes');
const quizrouter = require('./quiz_routes');
const wikirouter = require('./wiki_routes');

// Api

// 유저
router.use("/api/users", usersrouter);

// QandA
router.use("/api/qa", qandarouter);

// Reply
router.use("/api/reply", replyrouter);

// List
router.use("/api/list", listrouter);

// Study
router.use("/api/study", studyrouter);

// Quiz
router.use("/api/quiz", quizrouter);

// Wiki
router.use("/api/wiki", wikirouter);

// 생성 모듈에 선언한 라우터 추가
module.exports = router;