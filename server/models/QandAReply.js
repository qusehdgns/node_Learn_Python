// https://poiemaweb.com/mongoose

// mongoose 선언
const mongoose = require('mongoose');
const Schema = mongoose.Schema

var now = new Date();

// 유저 정보가 담길 콜렉션 형식
const qandareplySchema = mongoose.Schema({
    qanda_id : {
        type: Schema.Types.ObjectId,
        
        ref: 'QandA'
    },
    user_id : {
        type: Schema.Types.ObjectId,
        
        ref: 'User'
    },
    reply : {
        type: String
    },
    date : {
        type: Date,

        default: now
    }
});

// User 변수에 user 스키마 저장
const QandAReply = mongoose.model('QandAReply', qandareplySchema);

// 생성 모듈에 User 객체 업로드
module.exports = { QandAReply };