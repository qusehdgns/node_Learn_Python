const { Study } = require('../models/Study');

exports.readStudy = (req, res) => {
    Study.findOne({ _id: req.query.study_id }, { title: 1, material: 1, code: 1 })
    .then(result => {
        res.status(200).json({ value: result });
    }).catch(err => res.status(500).json({ status: false, err }));
}