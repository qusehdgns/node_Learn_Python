// User 데이터 베이스 사용을 위한 User 모델 선언
const { User } = require("../models/User");

const { smtpTransport, Senderemail } = require('../config/email');

// 유저 회원가입 함수
exports.usersregister = (req, res) => {
    // 입력되어 들어오는 정보를 user 변수에 저장
    let user = new User(req.body);

    // save(몽고 디비 함수)를 사용하여 유저 저장
    user.save((err, userInfo) => {
        // 유저 저장 실패 및 에러 발생 시 실패와 에러 리턴
        if (err) return res.json({ success: false, err });
        // 유저 저장 성공 시 성공 리턴
        return res.status(200).json({ success: true });
    });
}

// 로그인 함수
exports.userslogin = (req, res) => {
    // 요청된 이메일 데이터베이스 검색
    User.findOne({ email: req.body.email }, (err, user) => {
        // 유저 검색 실패 또는 에러 발생 시 로그인 실패 리턴
        if (!user) return res.json({ loginSuccess: false, message: "해당 이메일의 유저가 없습니다. " });

        // 요청된 이메일이 데이터베이스에 존재 시 비밀번호 확인(암호화 비교 함수 실행)
        user.comparePassword(req.body.password, (err, isMatch) => {
            // 에러 및 비밀번호가 다르다면 로그인 실패 리턴
            if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });

            // 로그인 성공 시 Token 생성
            user.generateToken((err, user) => {
                // 에러 발생 시 에러 리턴
                if (err) return res.status(400).send(err);

                // token을 저장 (쿠키, 로컬스토리지, ...) 가능, 쿠키에 저장
                res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id });
            });
        });
    });
}

// role 0 -> 일반 유저  role !0 -> 어드민
// 유저 정보를 호출할 때 사용
exports.usersauth = (req, res) => {
    // auth 미들웨어 통과 성공 시 수행, 유저에게 권한이 있음
    res.status(200).json({
        // 데이터 저장 시 생성되는 레코드 아이디
        _id: req.user._id,
        // 역활 지정을 판단하여 관리자 권한 확인
        isAdmin: req.user.role === 0 ? false : true,
        // 로그인 유무
        isAuth: true,
        // 유저 이메일
        email: req.user.email,
        // 유저 역할
        role: req.user.role
    });
}

// 로그아웃 함수
exports.userslogout = (req, res) => {
    // 데이터베이스 레코드 아이디를 사용하여 토큰을 비움
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        // 토큰 비우기 실패 또는 에러 발생시 실패와 에러 리턴
        if (err) return res.json({ logoutSuccess: false, err });
        // 로그아웃 성공 시 성공 리턴
        return res.status(200).send({ logoutSuccess: true, userId: '' });
    });
}


exports.usersfindid = (req, res) => {

    User.findOne({ name: req.query.name, phone: req.query.phone }, (err, user) => {
        // 유저 검색 실패 또는 에러 발생 시 로그인 실패 리턴
        if (!user) return res.json({ success: false, message: "해당 정보의 사용자가 존재하지 않습니다." });

        return res.json({ success: true, email: user.email });
    });
}

// 이메일 확인
exports.usercheckemail = (req, res) => {

    User.findOne(req.query, async (err, user) => {
        if (!user) return res.json({ checkSuccess: false, message: "해당 정보의 사용자가 존재하지 않습니다." });

        // req에 phone 객체가 포함되어 있는지 필터링(비밀번호 재설정)
        if(req.query.hasOwnProperty('phone')){
            const number = Math.floor(Math.random() * 888889) + 111111;

            const mailOptions = {
                from: Senderemail,
                to: user.email,
                subject: "[Learn Python]인증 관련 이메일 입니다",
                text: "오른쪽 숫자 6자리를 입력해주세요 : " + number
            };

            await smtpTransport.sendMail(mailOptions, (error, responses) => {
                if (error) {
                    res.json({ checkSuccess: true, certification: error });
                } else {
                    res.json({ checkSuccess: true, certification: number });
                }
                smtpTransport.close();
            });
        } else {// req에 email만 있으면 회원가입 ID 중복에 사용
            return  res.json({ checkSuccess: true });
        }
    });
}

// 비밀번호 재설정
exports.userresetpassword = (req, res) => {
    User.findOne({ email: req.body.email, phone: req.body.phone }, (err, user_data) => {
        user_data.password = req.body.password;

        let user = new User(user_data);

        // save(몽고 디비 함수)를 사용하여 유저 저장
        user.save((err, userInfo) => {
            // 유저 저장 실패 및 에러 발생 시 실패와 에러 리턴
            if (err) return res.json({ resetsuccess: false, err });
            // 유저 저장 성공 시 성공 리턴
            return res.status(200).json({ resetsuccess: true });
        });
    });
}