const { Quiz } = require('../models/Quiz');

const { PythonShell } = require('python-shell');

const fs = require('fs');

const { SERVER_LOCATION } = require('../config/config');

const fileLocation = 'files/code/';

const totallocation = SERVER_LOCATION + fileLocation;

exports.readQuiz = (req, res) => {
    Quiz.findOne({ study_id: req.query.study_id }, { __v: 0 })
        .then(result => {
            res.status(200).json({ value: result });
        }).catch(err => res.status(500).json({ status: false, err }));
}

exports.solveQuiz = async (req, res) => {

    const quizData = await Quiz.findOne({ _id: req.params.quiz_id }, { __v: 0 }).then(res => res);

    const filepath = totallocation + req.body.user_id + '_quiz.py';

    if (typeof quizData.input !== 'undefined') {
        if (!req.body.answer.includes('input(')) {
            return res.json({ success: false });
        }
    }

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
                if (err) {
                    return res.json({ success: false });
                }

                const result = resultArray.join('\r\n');

                res.status(200).json({ success: result === quizData.output ? true : false });
            });
        });
    });


}