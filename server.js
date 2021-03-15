// server.js
// Django settings.py 역할

const express = require("express");
const server = express();

const db = require("./database");

const http = require('http').createServer(server);
const port = 8000;

server.use(express.urlencoded({ extended : true }));
server.use(express.json());

const Vroutes = require("./routes/View_index");
const Aroutes = require("./routes/Api_index");

// views 경로 정적으로 만듬
server.use(express.static(__dirname + "/views"));

server.use(Vroutes);
server.use(Aroutes);


http.listen(port, () => {
    console.log(`localhost:${port} 실행...`)
});