// models/usermodel.js
// https://poiemaweb.com/mongoose


const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    _id: 'string',
    password: 'string',
    name: 'string'
}, {
    // __v 필드 생성 여부
    versionKey: false

    // 기존 Collection 사용할 시
    // collection : '콜렉션명'
});

// Model 함수화

// Create new todo document
userSchema.statics.createUser = function (payload) {
    // this === Model
    const user = new this(payload);
    // return Promise
    return user.save();
};

// Find All
userSchema.statics.findAllUser = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
};

// Find One by todoid
userSchema.statics.findByUserid = function (userid) {
    return this.findById(userid);
};

// Update by todoid
userSchema.statics.updateByUserid = function (userid, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findByIdAndUpdate(userid, payload, { new: true });
};

// Delete by todoid
userSchema.statics.deleteByUserid = function (userid) {
    return this.findByIdAndRemove(userid);
};

//////////

let User = mongoose.model('users', userSchema);

module.exports = User;