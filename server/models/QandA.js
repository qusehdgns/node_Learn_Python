// https://poiemaweb.com/mongoose

// mongoose 선언
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooseDateFormat = require('mongoose-date-format');

// 유저 정보가 담길 콜렉션 형식
const qandaSchema = mongoose.Schema({
    user_id : {
        type: Schema.Types.ObjectId,
        
        ref: 'User'
    },
    study_id : {
        type: Schema.Types.ObjectId,
        
        ref: 'Study',

        default : null
    },
    date : {
        type: Date,

        default: new Date()
    },
    title: {
        type: String,

        maxlength: 100
    },
    contents: {
        type: String
    }
});

qandaSchema.statics.updateByQAid = function(QA_id, payload){
    payload.date = new Date();

    return this.findByIdAndUpdate(QA_id, payload, { new : true });
}


qandaSchema.plugin(mongooseDateFormat);
// User 변수에 user 스키마 저장
const QandA = mongoose.model('QandA', qandaSchema);

// 생성 모듈에 User 객체 업로드
module.exports = { QandA };