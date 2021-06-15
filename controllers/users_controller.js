module.exports.profile = function(req,res){
  return res.render('profile',{
    title:"Profile"
  });
}

module.exports.posts = function(req,res){
  return res.end('<h1>User Posts</h1>');
}

// render the sign up page
module.exports.signUp = function(req,res){
  return res.render('user_sign_up',{
    title:"codeial | sign Up"
  });
}
// render the sign in page
module.exports.signIn = function(req,res){
  return res.render('user_sign_in',{
    title:"codeial | sign In"
  });
}

//get the sign up data
module.exports.create=function(req,res){

};
// sign in and create a session for the user
module.exports.createSession =  function(req,res){

};

