const { QandA } = require("../models/QandA");
const { Study } = require("../models/Study");
const { QandAReply } = require('../models/QandAReply');

exports.createQA = async (req, res) => {

    const study_id = await Study.findOne({ chapter: req.body.chapter, index: req.body.index }, { _id: 1 })
        .then(result => {
            if (!result) {
                return null;
            } else {
                return result._id
            }
        });

    const qanda_data = {
        user_id: req.body.user_id,
        title: req.body.title,
        contents: req.body.contents,
        study_id: study_id
    };

    let qanda = new QandA(qanda_data);

    // save(몽고 디비 함수)를 사용하여 유저 저장
    qanda.save((err, qaInfo) => {
        // 유저 저장 실패 및 에러 발생 시 실패와 에러 리턴
        if (err) return res.json({ success: false, err });
        // 유저 저장 성공 시 성공 리턴
        return res.status(200).json({ success: true, value: qaInfo });
    });
}

exports.readQA = async (req, res) => {

    let qanda = QandA.find({}, { __v: 0 });

    if (typeof req.query.search !== 'undefined' && typeof req.query.chapter !== 'undefined') {

        let study_data = {
            chapter: req.query.chapter
        };

        if (typeof req.query.index !== 'undefined') {
            study_data.index = req.query.index;
        }

        const studyIds = await Study.find(study_data, { _id: 1 }).then(result => result);

        const study = studyIds.map(study => {
            return { study_id: study._id }
        });

        let search = req.query.search;

        const searchList = search.split(/ /g).map(value => {
            return { title: { $regex: value } }
        });

        qanda = QandA.find({ $and: [{ $or: searchList }, { $or: study }] }, { __v: 0 });

    } else if (typeof req.query.search !== 'undefined') {
        let search = req.query.search;

        const searchList = search.split(/ /g).map(value => {
            return { title: { $regex: value } }
        });

        qanda = QandA.find({ $or: searchList }, { __v: 0 });

    } else if (typeof req.query.chapter !== 'undefined') {

        let study_data = {
            chapter: req.query.chapter
        };

        if (typeof req.query.index !== 'undefined') {
            study_data.index = req.query.index;
        }

        const studyIds = await Study.find(study_data, { _id: 1 }).then(result => result);

        const study = studyIds.map(study => {
            return { study_id: study._id }
        });

        qanda = QandA.find({ $or: study }, { __v: 0 });

    }

    qanda.populate('user_id', { _id: 0, email: 1 }).populate('study_id', { _id: 0, chapter: 1, index: 1 }).sort({ date: -1 })
        .then(result => {
            if (result.length === 0) {
                return res.json({ status: false });
            }

            res.status(200).json({ status: true, value: result });
        }).catch(err => res.status(500).json({ status: false, err }));
}

exports.readMyQA = (req, res) => {
    QandA.find({ user_id: req.params.user_id }, { __v: 0 }).populate('user_id', { _id: 0, email: 1 }).sort({ data: -1 })
        .then(result => {
            if (result.length === 0) {
                return res.json({ status: false });
            }

            res.status(200).json({ status: true, value: result });
        }).catch(err => res.status(500).json({ status: false, err }));
}

exports.updateQA = async (req, res) => {

    const study_id = await Study.findOne({ chapter: req.body.chapter, index: req.body.index }, { _id: 1 })
        .then(result => {
            if (!result) {
                return null;
            } else {
                return result._id
            }
        });

    const qanda_data = {
        user_id: req.body.user_id,
        title: req.body.title,
        contents: req.body.contents,
        study_id: study_id
    };

    QandA.updateByQAid(req.params._id, qanda_data)
        .then(qaInfo => res.status(200).json({ success: true, value: qaInfo }))
        .catch(err => res.json({ success: false, err }));
}

exports.deleteQA = (req, res) => {

    QandA.findByIdAndRemove(req.params._id)
        .then(qanda => {

            QandAReply.remove({ qanda_id: qanda._id }).exec();

            if (!qanda) {
                res.status(404).json({ success: false, msg: 'No record for delete' });
            }

            res.status(200).json({ success: true });
        }).catch(err => res.json({ success: false, err }));
}