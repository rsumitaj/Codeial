const Post = require("../models/posts");

module.exports.home = function(req,res){

  // Post.find({},function(err,posts){
  //   return res.render('home',{
  //     title:"Codial | Home",
  //     post_list : posts
  //   });
  // });


// populate the user of each post  
  Post.find({})
  .populate('user')
  .populate({
    path:'comments',
    populate:{
      path:'user'
    }
  })
  .exec(function(err,posts){
    return res.render('home',{
      title:"Codial | Home",
      post_list : posts
    });
  });
  
}
