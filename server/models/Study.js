// https://poiemaweb.com/mongoose

// mongoose 선언
const mongoose = require('mongoose');

// 유저 정보가 담길 콜렉션 형식
const studySchema = mongoose.Schema({
    chapter : {
        type: Number
    },
    index : {
        type: Number
    },
    title : {
        type: String
    },
    material : {
        type: String
    },
    code : {
        type: String
    }
});

// User 변수에 user 스키마 저장
const Study = mongoose.model('Study', studySchema);

// 생성 모듈에 User 객체 업로드
module.exports = { Study };