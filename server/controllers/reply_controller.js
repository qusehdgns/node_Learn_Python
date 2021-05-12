const { QandAReply } = require("../models/QandAReply");

exports.createReply = (req, res) => {

    let reply = new QandAReply(req.body);

    reply.save()
    .then(replyInfo => res.status(200).json({ success: true, value: replyInfo }))
    .catch(err => res.json({ success: false, err }));
}

exports.readReply = (req, res) => {

    QandAReply.find({ qanda_id: req.params.quiz_id }, { __v: 0 })
        .populate('user_id', { _id: 0, email: 1 }).sort({ date: -1 })
        .then(result => res.status(200).json({ status: true, value: result }))
        .catch(err => res.status(500).json({ status: false, err }));
}