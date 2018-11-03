var mongoose = require("mongoose");

var journalSchema = new mongoose.Schema({
   created: { type: Date, default: Date.now },
   updated: { type: Date, default: Date.now },
   day_number: Number,
   memento: String,
   special: String,
   to_do: [String],
   gratitude: [String],
   sleep: {
        awake: String,
        asleep: String,
        quality: { type: Number, min: 0, max: 4 }
   },
   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
   },
   activities: [
       {
           id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Activity"
           },
           done: Boolean
       }
    ],
   goals: [
       {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Goal"
       }
    ],
});

module.exports = mongoose.model("Journal", journalSchema);