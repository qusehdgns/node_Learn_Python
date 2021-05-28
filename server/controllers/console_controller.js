const { Compiler } = require('../models/Compiler');

const { PythonShell } = require('python-shell');

const fs = require('fs');

const { SERVER_LOCATION } = require('../config/config');

const fileLocation = 'files/code/';

const totallocation = SERVER_LOCATION + fileLocation;

exports.runConsole = (req, res) => {

    const filepath = totallocation + req.body.user_id +'.py';

    fs.writeFile(filepath, req.body.code, () => {

        const pyshell = new PythonShell(filepath);

        let resultArray = new Array();

        if("input_data" in req){
            for(let temp of req.body.input_data){
                pyshell.send(temp);
            }
        }

        pyshell.on('message', message => {
            resultArray.push(message);
        });

        pyshell.end(function (err, code) {
            fs.unlink(filepath, () => {
                if (err) {
                    return res.json({ result: String(err) });
                }
                const result = resultArray.join('\n');

                res.status(200).json({ result: result });
            });
        });
    });

}

exports.readConsole = (req, res) => {

    Compiler.findOne({ user_id: req.params.user_id }, { code: 1, input: 1 }).then(result => {
        if(!result){
            return res.json({ success: true, value: null });
        }

        res.status(200).json({ success: true, value: result });
    }).catch(err => res.json({ success: false, err }));

}

exports.saveConsole = (req, res) => {

    let saveData = req.body;

    saveData.user_id = req.params.user_id;

    Compiler.findOneAndUpdate({ user_id: req.params.user_id }, saveData, { upsert: true, new: true })
    .then(saveResult => res.status(200).json({ success: true, value: saveResult }))
    .catch(err => res.json({ success: false, err }));

}