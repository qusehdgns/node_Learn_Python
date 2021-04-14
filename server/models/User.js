// models/usermodel.js
// https://poiemaweb.com/mongoose

// mongoose 선언
const mongoose = require('mongoose');

// bcrypt 사용, 비밀번호 암호화
const bcrypt = require('bcrypt');
// 암호화 시 필요한 설정 값
const saltRounds = 10

// jsonwebtoken 사용
const jwt = require('jsonwebtoken');

// 토큰을 만들거나 해독할 때 사용할 문자열 키값
const tokenKey = 'secretToken';

// 유저 정보가 담길 콜렉션 형식
const userSchema = mongoose.Schema({
    // 유저 이름
    name: {
        // 문자열 타입
        type: String,
        // 최대 길이 50
        maxlength: 50
    },
    // 유저 연락처
    phone: {
        // 문자열 타입
        type: String,
        // 최대 길이 50
        maxlength: 50
    },
    // 유저 이메일 
    email: {
        // 문자열 타입
        type: String,

        // trim은 공백을 제거
        trim: true,

        // 중복된 값을 허용하지 않음
        unique: true
    },
    // 유저 비밀번호
    password: {
        // 문자열
        type: String,
        // 최소길이 5
        minlength: 5
    },
    // 유저 권한 설정
    role: {
        // 숫자 타입
        type: Number,

        // 0은 일반 유저, 1은 관리자 계정
        // 기본 값 0
        default: 0
    },
    // 점수
    score : {
        type: Number,

        default : 0
    },
    // 유효성 관리
    token: {
        type: String
    }
});

// UserSchema Save 진행 전에 수행
userSchema.pre('save', function (next) {
    // save에서 들어오는 user 모델을 변수에 저장
    var user = this;

    // Password가 변경될 시에만 수행
    if (user.isModified('password')) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            // 에러일 경우 에러 리턴
            if (err) return next(err);

            // salt 암호화 키와 비밀번호를 사용해 해쉬 암호화
            bcrypt.hash(user.password, salt, function(err, hash) {
                // 에러 발생 시 에러 리턴
                if (err) return next(err);
                
                // 변경된 해쉬값으로 비밀번호 변경
                user.password = hash;

                // save 함수로 넘어갈 수 있도록 next 선언
                next();
            });
        });
    }
    // Password 변경이 아닐 경우
    else {
        // 바로 save 함수로 넘어감
        next();
    }
});

// 사용자가 로그인 시 입력한 Password를 암호화 함수
userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword(사용자가 로그인시 입력한 비밀번호) 암호화 후 모델 비밀번호와 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        // 비밀번호가 맞지 않거나 에러 발생 시 호출
        if(err) return cb(err);

        // 비밀번호가 맞을 경우 리턴
        cb(null, isMatch);
    });
}

// 로그인 성공 시 사용자 Token 생성 함수
userSchema.methods.generateToken = function(cb) {
    // 로그인 시 입력한 정보 user 모델 저장
    var user = this;
    // jsonwebtoken 이용해서 token 생성
    // 뒷부분은 해독과 토큰화 키값 같은 것 임의의 값 사용 가능
    var token = jwt.sign(user._id.toHexString(), tokenKey)

    // Token 값을 user 모델의 Token에 저장
    user.token = token;

    // 사용자 정보를 사용하여 변경된 Token 값 저장
    user.save(function(err, user) {
        // 에러 발생 시 에러 리턴
        if(err) return cb(err);

        // 저장 성공 시 저장 유저 정보 리턴
        cb(null, user);
    })
}

// Middleware 접근 권한 처리 시 토큰을 사용하여 데이터베이스 탐색 함수
userSchema.statics.findByToken = function (token, cb){
    // 함수 실행 시 사용하는 user 정보를 저장
    var user = this;

    // Token decode
    jwt.verify(token, tokenKey, function(err, decoded) {
        // 유저 아이디를 이용하여 유저 탐색
        // 클라이언트 토큰과 DB 유저 토큰 비교를 위해 사용
        user.findOne({ "_id" : decoded, "token" : token }, function(err, user) {
            // 에러 발생 시 에러 리턴
            if (err) return cb(err);
            // 탐색 성공 시 해당 사용자 정보 리턴
            cb(null, user);
        });
    })
}

// User 변수에 user 스키마 저장
const User = mongoose.model('User', userSchema);

// 생성 모듈에 User 객체 업로드
module.exports = { User };