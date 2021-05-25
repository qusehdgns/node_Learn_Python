const { Wiki } = require("../models/Wiki");

exports.createWiki = (req, res) => {

    let wiki = new Wiki(req.body);

    wiki.save()
        .then(wikiInfo => res.status(200).json({ success: true, value: wikiInfo }))
        .catch(err => res.json({ success: false, err }));
}

exports.readWiki = async (req, res) => {

    let lists = [1, 2, 3, 4];
    let wikiData = new Array();

    for await (let i of lists) {
        wikiData.push(await Wiki.find({ study_id: req.params.study_id, tag: i }, { __v: 0 })
            .populate('user_id', { _id: 0, email: 1 }).sort({ date: 1 })
            .then(result => result)
            .catch(err => []));
    }

    res.status(200).json({ value: wikiData });
}

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