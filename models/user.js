var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    birthday: Date,
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);