const { Quiz } = require('../models/Quiz');

exports.readQuiz = (req, res) => {
    Quiz.findOne({ study_id: req.query.study_id }, { __v: 0 })
    .then(result => {
        res.status(200).json({ value: result });
    }).catch(err => res.status(500).json({ status: false, err }));
}