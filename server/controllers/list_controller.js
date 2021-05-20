const { Study } = require('../models/Study');

exports.ChapterandIndex = (req, res) => {
    Study.aggregate([
        {
            $group: {
                _id: "$chapter",
                count: { $sum: 1 }
            }
        }
    ]).sort({ _id: 1 }).then(result => res.json(result));
}

exports.readStudyList = (req, res) => {
    Study.find({}, { _id: 1, title: 1, chapter: 1, index: 1 }).sort({ chapter: 1, index: 1}).then(result => {
        if(!result) {
            return res.status(404).json({ status: false });
        }

        res.status(200).json({ status: true, value: result });
    }).catch(err => res.status(500).json({ status: false, err }));

}