var mongoose = require("mongoose");

var activitySchema = new mongoose.Schema({
   created: { type: Date, default: Date.now },
   updated: { type: Date, default: Date.now },
   title: String,
   description: String,
   category: String
});

module.exports = mongoose.model("Activity", activitySchema);


var activityTrackingSchema = new mongoose.Schema({
   created: { type: Date, default: Date.now },
   updated: { type: Date, default: Date.now },
   userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
   startDate: { type: Date, default: Date.now },
   endDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ActivityTracking", activityTrackingSchema);