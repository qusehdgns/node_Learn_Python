const { Quiz } = require('../models/Quiz');

const { Solve } = require('../models/Solve');

const { User } = require('../models/User');

const { PythonShell } = require('python-shell');

const fs = require('fs');

const { SERVER_LOCATION } = require('../config/config');

const fileLocation = 'files/code/';

const totallocation = SERVER_LOCATION + fileLocation;

exports.readQuiz = (req, res) => {
    Quiz.findOne({ study_id: req.params.study_id }, { __v: 0 })
        .then(result => {
            res.status(200).json({ value: result });
        }).catch(err => res.status(500).json({ status: false, err }));
}

exports.solveQuiz = async (req, res) => {

    const quizData = await Quiz.findOne({ _id: req.params.quiz_id }, { __v: 0 }).then(res => res);

    const filepath = totallocation + req.body.user_id + '_quiz.py';

    fs.writeFile(filepath, req.body.answer, () => {

        const pyshell = new PythonShell(filepath);

        let resultArray = new Array();

        if (typeof quizData.input !== 'undefined') {
            for (let temp of quizData.input.split('\n')) {
                pyshell.send(temp);
            }
        }

        pyshell.on('message', message => {
            resultArray.push(message);
        });

        pyshell.end(function (err, code) {

            fs.unlink(filepath, () => {
                let success = true;

                if (typeof quizData.input !== 'undefined') {
                    if (!req.body.answer.includes('input(')) {
                        success = false;
                    }
                }

                if (success) {
                    if (err) {
                        success = false;
                    } else {
                        const result = resultArray.join('\r\n');

                        success = result === quizData.output ? true : false;
                    }
                }

                if (req.body.user_id !== 'guest') {

                    let solveData = {
                        user_id: req.body.user_id,
                        quiz_id: req.params.quiz_id,
                        answer: req.body.answer,
                        success: success
                    }

                    Solve.findOneAndUpdate({ user_id: req.body.user_id, quiz_id: req.params.quiz_id }, solveData, { upsert: true, new: true })
                        .then(solveResult => {
                            Quiz.countDocuments({}).then(async count => {

                                const wikiAuth = await Solve.countDocuments({ user_id: req.body.user_id, success: true }).then(correct => correct) === count ? true : false;

                                if(wikiAuth){
                                    User.findOneAndUpdate({ _id: req.body.user_id, role: 0 }, { role: 2 }).exec();
                                }

                            }).catch(error => res.json({ success: false }));


                            if (err) {
                                return res.json({ success: solveResult.success, error: String(err) })
                            }
                            res.json({ success: solveResult.success })
                        });
                } else {
                    if (err) {
                        return res.json({ success: solveResult.success, error: String(err) })
                    }

                    res.json({ success: success });
                }
            });
        });
    });
}

exports.checkQuiz = (req, res) => {

    Solve.findOne(req.query, { __v: 0 })
        .then(result => res.status(200).json({ success: true, value: result }))
        .catch(err => res.json({ success: false, err }));

}

exports.checkQuizProgress = (req, res) => {

    Quiz.countDocuments({}).then(async count => {

        const correct = (await Solve.countDocuments({ user_id: req.params.user_id, success: true }).then(correct => correct) / count) * 100;

        const wrong = (await Solve.countDocuments({ user_id: req.params.user_id, success: false }).then(wrong => wrong) / count) * 100;

        res.status(200).json({ success: true, correct: correct.toFixed(1), wrong: wrong.toFixed(1) });
    }).catch(err => res.json({ success: false }));
}