const nodemailer = require('nodemailer');

const Senderemail = "이메일 입력"
const password = "비밀번호 입력"

const smtpTransport = nodemailer.createTransport({
    service: "Naver",
    auth: {
        user: Senderemail,
        pass: password
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    smtpTransport,
    Senderemail
}