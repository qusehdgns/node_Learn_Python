const { QandA } = require("../models/QandA");

exports.createQA = (req, res) => {
    
    let qanda = new QandA(req.body);

    // save(몽고 디비 함수)를 사용하여 유저 저장
    qanda.save((err, qaInfo) => {
        // 유저 저장 실패 및 에러 발생 시 실패와 에러 리턴
        if (err) return res.json({ success: false, err });
        // 유저 저장 성공 시 성공 리턴
        return res.status(200).json({ success: true });
    });
}