// database.js

const mongoose = require('mongoose');

let db_id = "learn_python";
let db_pw = "1234";
let db_name = "learn_python";

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${db_id}:${db_pw}@localhost:27017/${db_name}`, {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : false});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error : '));

db.once('open', () => {
    console.log("database open");
})