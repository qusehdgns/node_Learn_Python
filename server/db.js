
// mongoose 사용 선언
const mongoose = require('mongoose');

// config/key에 지정한 DB 정보 호출
const config = require('./config/key');

// DB 서버와 연결, 성공 시 MongoDB Connected... 출력
mongoose.connect(config.mongoURI, {useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false})
.then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));