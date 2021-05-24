const { Wiki } = require("../models/Wiki");

exports.createWiki = (req, res) => {

    let wiki = new Wiki(req.body);

    wiki.save()
        .then(wikiInfo => res.status(200).json({ success: true, value: wikiInfo }))
        .catch(err => res.json({ success: false, err }));
}

// exports.readReply = (req, res) => {

//     QandAReply.find({ qanda_id: req.params.quiz_id }, { __v: 0 })
//         .populate('user_id', { _id: 0, email: 1 }).sort({ date: 1 })
//         .then(result => res.status(200).json({ status: true, value: result }))
//         .catch(err => res.status(500).json({ status: false, err }));
// }

// exports.updateReply = (req, res) => {

//     QandAReply.findByIdAndUpdate(req.params._id, req.body, { new: true })
//     .then(reply => res.status(200).json({ success: true, value: reply }))
//     .catch(err => res.json({ success: false, err }));
// }

// exports.deleteReply = (req, res) => {

//     QandAReply.findByIdAndRemove(req.params._id)
//         .then(reply => {
//             if (!reply) {
//                 res.status(404).json({ success: false, msg: 'No record for delete' });
//             }

//             res.status(200).json({ success: true });
//         }).catch(err => res.json({ success: false, err }));
// }