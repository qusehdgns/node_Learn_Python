// https://poiemaweb.com/mongoose

// mongoose 선언
const mongoose = require('mongoose');
const Schema = mongoose.Schema

// 유저 정보가 담길 콜렉션 형식
const solveSchema = mongoose.Schema({
    quiz_id : {
        type: Schema.Types.ObjectId,
        
        ref: 'Quiz'
    },
    user_id : {
        type: Schema.Types.ObjectId,
        
        ref: 'User'
    },
    answer : {
        type: String
    },
    success : {
        type: Boolean
    }
});

// User 변수에 user 스키마 저장
const Solve = mongoose.model('Solve', solveSchema);

// 생성 모듈에 User 객체 업로드
module.exports = { Solve };