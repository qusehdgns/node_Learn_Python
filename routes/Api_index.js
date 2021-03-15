// routes/View_index.js
// url 매핑 역할 Django urls.py 역할

const Arouter = require("express").Router();
const Acontroller = require("../controllers/Api_controller");

// Api

// 새로운 정보 입력
Arouter.post("/api/users/", Acontroller.postNewuser);

// 모든 정보 요청
Arouter.get("/api/users/", Acontroller.getAllusers);

// 특정 id 정보 요청
Arouter.get("/api/users/:_id/", Acontroller.getSelectluser);

// 특정 id 정보 갱신
Arouter.put("/api/users/:_id/", Acontroller.putSelectuser);

// 특정 id 정보 삭제
Arouter.delete("/api/users/:_id/", Acontroller.deleteSelectuser);


module.exports = Arouter;