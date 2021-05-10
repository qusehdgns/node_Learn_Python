// https://poiemaweb.com/mongoose

// mongoose 선언
const mongoose = require('mongoose');
const Schema = mongoose.Schema

// 유저 정보가 담길 콜렉션 형식
const quizSchema = mongoose.Schema({
    study_id : {
        type: Schema.Types.ObjectId,

        ref: 'Study'
    },
    quiz : {
        type: String
    },
    input : {
        type: String
    },
    output : {
        type: String
    }
});

// User 변수에 user 스키마 저장
const Quiz = mongoose.model('Quiz', quizSchema);

// 생성 모듈에 User 객체 업로드
module.exports = { Quiz };