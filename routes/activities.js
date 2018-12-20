var express = require("express"),
    router = express.Router(),
    Journalentry = require("../models/journalentry"),
    Activity = require("../models/activity"),
    ActivityTrackig = require("../models/tracking"),
    middleware = require("../middleware");

/*
router.get("/", middleware.isLoggedIn, function(req, res){
   Journalentry.find({author:{id: req.user._id}}, function(err, journalentries){
      if(err){
         console.log(err);
      } else {
         res.render("journalentries/index", {journalentries: journalentries});
      }
   });
}); */

router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("activities/new"); 
});

router.post("/new", middleware.isLoggedIn, function(req, res){
   var title = req.body.title;
   var description = req.body.description;
   var category = req.body.category;
   var logo = req.body.logo;
   
   console.log("triggered new ability to save");
   
   var newActivity = {title: title, description: description, 
                      category: category, logo: logo};
   Activity.create(newActivity, function(err, newlyCreated){
     if(err){
        console.log(err);
     } else {
        req.flash("success", "Activity successfully created!");
        res.redirect("/journalentries");
     }
   });
   
});

router.get("/track", middleware.isLoggedIn, function(req, res){
      Activity.find({}, function(err, activities){
      if(err){
         console.log(err);
      } else {
         res.render("activities/track", {activities: activities});
      }
   }); 
});

router.post("/track", middleware.isLoggedIn, function(req, res){
   var userId = req.user._id;
   var startDate = req.body.startDate;
   var endDate = req.body.endDate;
   
   console.log("triggered new ability to track");
   
   var newActivityTracking = {userId: userId, startDate: startDate, endDate: endDate};
   Activity.create(newActivityTracking, function(err, newlyCreated){
     if(err){
        console.log(err);
     } else {
        req.flash("success", "Activity successfully tracked!");
        res.redirect("/journalentries");
     }
   });
});

router.get("/:id", function(req, res){
   Activity.findById(req.params.id).exec(function(err, foundEntry){
      if(err){
         console.log(err);
      } else {
         res.render("activities/show", {activity: foundEntry});
      }
   });
});

/* router.get("/:id/edit", middleware.checkEntryOwnership, function(req, res){
   Journalentry.findById(req.params.id, function(err, foundEntry){
         res.render("journalentries/edit", {journalentry: foundEntry});
   });
}); */

/* router.put("/:id", middleware.checkEntryOwnership, function(req, res){
   Journalentry.findByIdAndUpdate(req.params.id, req.body.journalentry, function(err, updatedJournalentry){
      if(err) {
         res.redirect("/journalentries");
      } else {
         res.redirect("/journalentries/" + req.params.id);
      }
   });
}); */

/* router.delete("/:id", middleware.checkEntryOwnership, function(req, res){
   Journalentry.findByIdAndRemove(req.params.id, function(err){
      if(err) {
         res.redirect("/journalentries");
      } else {
         res.redirect("/journalentries");
      }
   });
}); */


module.exports = router;