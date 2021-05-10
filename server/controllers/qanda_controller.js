const { QandA } = require("../models/QandA");
const { User } = require("../models/User");

exports.createQA = (req, res) => {

    let qanda = new QandA(req.body);

    // save(몽고 디비 함수)를 사용하여 유저 저장
    qanda.save((err, qaInfo) => {
        // 유저 저장 실패 및 에러 발생 시 실패와 에러 리턴
        if (err) return res.json({ success: false, err });
        // 유저 저장 성공 시 성공 리턴
        return res.status(200).json({ success: true, value: qaInfo });
    });
}

exports.readAllQA = (req, res) => {
    QandA.find({}, { __v: 0 }).sort({ date:-1 }).then(async qandas => {
        var values = JSON.parse(JSON.stringify(qandas));

        if (!qandas.length) {
            res.json({ status: false });
            return;
        }

        let i = 0;
        for await (let qanda of qandas) {
            await User.findOne({ _id: qanda.user_id }, { _id: 0, email: 1 }).then(result => {
                values[i].date = values[i].date.substr(0,10);
                values[i].user_id = result.email;
                i++;
            })
        }

        return res.status(200).json({ status: true, value: values });
    }).catch(err => res.status(500).json({ err }));
}

exports.readSearchQA = (req, res) => {
    let search = req.params.search;

    console.log(search);
}

exports.updateQA = (req, res) => {

    QandA.updateByQAid(req.params._id, req.body)
    .then(qaInfo => res.status(200).json({ success: true, value: qaInfo }))
    .catch(err => res.json({ success: false, err }));
}

exports.deleteQA = (req, res) => {
    
    QandA.findByIdAndRemove(req.params._id)
    .then(user => {
        if(!user){
            res.status(404).json({ success: false, msg: 'No record for delete' });
        }

        res.status(200).json({ success: true });
    }). catch(err => res.json({ success: false, err }));
}