// routes/View_controller.js

// file system 라이브러리
const fs = require("fs")

// html 전송 예제
exports.mainview = function (request, response) {
    fs.readFile("./views/test.html", "utf8", (error, buffer) => {
        response.send(buffer);
    });
}