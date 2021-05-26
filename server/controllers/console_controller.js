
const { PythonShell } = require('python-shell');

const fs = require('fs');

const serverlocation = '/Users/donghunbyun/Desktop/workspace/nodejs/node_Learn_Python/'

const fileLocation = 'server/files/code/';

const totallocation = serverlocation + fileLocation

exports.test = (req, res) => {

    const filepath = totallocation + req.body.user_id +'.py';

    fs.writeFile(filepath, req.body.code, () => {

        const pyshell = new PythonShell(filepath);

        let resultArray = new Array();

        if(req.body.hasOwnProperty("input_data")){
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
                    console.log(String(err))
                    return res.json({ result: String(err) });
                }
                const result = resultArray.join('\n');

                res.status(200).json({ result: result });
            });
        });
    });
}