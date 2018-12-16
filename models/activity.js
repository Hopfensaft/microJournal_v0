var mongoose = require("mongoose");

var activitySchema = new mongoose.Schema({
   created: { type: Date, default: Date.now },
   updated: { type: Date, default: Date.now },
   title: String,
   description: String,
   category: String,
   versionKey: false
});

module.exports = mongoose.model("Activity", activitySchema);