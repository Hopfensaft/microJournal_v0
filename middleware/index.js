var middlewareObj = {},
    Journalentry = require("../models/journalentry");
    //Comment = require("../models/comment");

middlewareObj.checkEntryOwnership = function(req, res, next){
   if(req.isAuthenticated()){
      Journalentry.findById(req.params.id, function(err, foundJournalentry){
         if(err){
            req.flash("error", "Journalentry not found");
            res.redirect("/journalentries")
         } else {
            if(foundJournalentry.author.id.equals(req.user._id)) {
               next();
            } else {
               req.flash("error", "You do not have permission to do that");
               res.redirect("back");
            }
         }
      });
   } else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
   }
}

/*
middlewareObj.checkCommentOwnership = function(req, res, next){
   if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err, foundComment){
         if(err){
            req.flash("error", "Comment not found");
            res.redirect("/campgrounds/" + req.params.id)
         } else {
            if(foundComment.author.id.equals(req.user._id)) {
               next();
            } else {
               req.flash("error", "You do not have permission to do that");
               res.redirect("back");
            }
         }
      });
   } else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
   }
}

*/

middlewareObj.isLoggedIn = function(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   req.flash("error", "You need to be logged in to do that");
   res.redirect("/login");
}

module.exports = middlewareObj