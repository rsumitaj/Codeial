const Post = require("../models/posts");
const User = require("../models/user")


module.exports.home = async function(req,res){

  // Post.find({},function(err,posts){
  //   return res.render('home',{
  //     title:"Codial | Home",
  //     post_list : posts
  //   });
  // });

  try{

  // populate the user of each post  
  let posts = await Post.find({})
  .populate('user')
  .populate({
    path:'comments',
    populate:{
      path:'user'
    }
  });

  let users = await User.find({});

  return res.render('home',{
    title:"Codial | Home",
    post_list : posts,
    all_users:users
  });

  }catch(err){
    console.log('Error',err);
    return;
  }
  
}


