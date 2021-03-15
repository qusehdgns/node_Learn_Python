// routes/View_index.js
// url 매핑 역할 Django urls.py 역할

const Vrouter = require("express").Router();
const Vcontroller = require("../controllers/View_controller");

// View
Vrouter.get("/", Vcontroller.mainview);


module.exports = Vrouter;