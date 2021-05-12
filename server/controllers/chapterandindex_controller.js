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