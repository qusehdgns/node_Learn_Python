// MongoDB 중요 정보, 개발시 사용
// DB 접근자 ID
let db_id = "learn_python";
// DB 접근자 PW
let db_pw = "1234";
// DB 이름
let db_name = "learn_python";

// 실행 모듈에 mongoURI를 업로드
module.exports ={
    mongoURI: `mongodb+srv://${db_id}:${db_pw}@nodelearnpython.3nlbg.mongodb.net/${db_name}?retryWrites=true&w=majority`
}