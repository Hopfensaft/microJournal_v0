var express = require("express"),
    router = express.Router(),
    Journalentry = require("../models/journalentry"),
    middleware = require("../middleware");

router.get("/", middleware.isLoggedIn, function(req, res){
   Journalentry.find({author:{id: req.user._id}}, function(err, journalentries){
      if(err){
         console.log(err);
      } else {
         res.render("journalentries/index", {journalentries: journalentries});
      }
   });
});

router.post("/", middleware.isLoggedIn, function(req, res){
   var memento = req.body.memento;
   // Calculate days since birth. Magic number is milliseconds/day
   var day_number = Math.round(Math.abs((Date.now() - req.user.birthday.getTime())/(1000 * 60 * 60 * 24)));
   var desc = req.body.description;
   var author = { 
      id: req.user._id,
      username: req.user.username
      };
   var newJournalentry = {memento: memento, day_number: day_number, author: author};
   Journalentry.create(newJournalentry, function(err, newlyCreated){
     if(err){
        console.log(err);
     } else {
        req.flash("success", "Journalentry successfully created!");
        res.redirect("/journalentries");
     }
   });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("journalentries/new"); 
});

router.get("/:id", function(req, res){
   Journalentry.findById(req.params.id).exec(function(err, foundEntry){
      if(err){
         console.log(err);
      } else {
         res.render("journalentries/show", {journalentry: foundEntry});
      }
   });
});

router.get("/:id/edit", middleware.checkEntryOwnership, function(req, res){
   Journalentry.findById(req.params.id, function(err, foundEntry){
         res.render("journalentries/edit", {journalentry: foundEntry});
   });
});

router.put("/:id", middleware.checkEntryOwnership, function(req, res){
   Journalentry.findByIdAndUpdate(req.params.id, req.body.journalentry, function(err, updatedJournalentry){
      if(err) {
         res.redirect("/journalentries");
      } else {
         res.redirect("/journalentries/" + req.params.id);
      }
   });
});

router.delete("/:id", middleware.checkEntryOwnership, function(req, res){
   Journalentry.findByIdAndRemove(req.params.id, function(err){
      if(err) {
         res.redirect("/journalentries");
      } else {
         res.redirect("/journalentries");
      }
   });
});


module.exports = router;