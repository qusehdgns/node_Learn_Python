// 유저 모델 사용을 위한 선언
const { User } = require("../models/User");

// 인증 처리
let auth = (req, res, next) => {
    // 클라이언트 쿠키에서 Token을 가져옴
    let token = req.cookies.x_auth;

    // Token 복호화 한후 유저 탐색
    User.findByToken(token, (err, user) => {
        // 에러 발생 시 에러 리턴
        if (err) throw err;

        // 유저 탐색 실패 시 거부
        if (!user) return res.json({ isAuth : false, error : true });

        // 유저 탐색 성공 시 토큰 정보와 유저 정보를 담음
        req.token = token;
        req.user = user;

        // 다음 동작 수행 명령
        next();
    });
}

// auth 권한 판단 함수를 생성 모듈에 추가
module.exports = { auth };