
// Express js 라이브러리 호출
const express = require("express");
// express 함수로 서버 구동 변수 생성
const server = express();

// 쿠키를 사용하기 위해 선언
const cookieParser = require('cookie-parser');

// Mongo DB 연결
const db = require("./db");

// server 변수에 http 부여
const http = require('http').createServer(server);
// 서버 구동 포트 5000 지정
const port = 5000;

// application/x-www-form-urlencoded 형식 분석하기 위해 선언
server.use(express.urlencoded({ extended : true }));
// application/json 형식 분석하기 위해 선언
server.use(express.json());

// cookie-parser 사용
server.use(cookieParser());

// url을 함수와 연결 파일 호출
const routes = require("./routes/main_routes");

// 서버에 routes 파일을 사용하겠다고 선언
server.use(routes);

// 서버 구동
http.listen(port, () => {
    // 콘솔에 서버가 열리면 포트와 함께 출력
    console.log(`localhost:${port} 실행...`);
});

// collections 생성
// const test = require("./test")