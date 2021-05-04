// https://poiemaweb.com/mongoose

// mongoose 선언
const mongoose = require('mongoose');
const Schema = mongoose.Schema

var now = new Date();

// 유저 정보가 담길 콜렉션 형식
const qandaSchema = mongoose.Schema({
    user_id : {
        type: Schema.Types.ObjectId,
        
        ref: 'User'
    },
    quiz_id : {
        type: Schema.Types.ObjectId,
        
        ref: 'Quiz',

        default : null
    },
    date : {
        type: Date,

        default: now
    },
    title: {
        type: String,

        maxlength: 100
    },
    contents: {
        type: String
    }
});

// User 변수에 user 스키마 저장
const QandA = mongoose.model('QandA', qandaSchema);

// 생성 모듈에 User 객체 업로드
module.exports = { QandA };