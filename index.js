const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const sassMiddleware = require('node-sass-middleware');
const nodeSassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
  src:'./assets/scss',
  dest:'./assets/css',
  debug:true,
  outputStyle:'extended',
  prefix:'/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

// maake the uploads path available to browser
app.use('/uploads',express.static(__dirname +'/uploads'));

app.use(expressLayouts);
// extract styleand scripts from subpages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store session cookie in the db

app.use(session({
  name: 'codeial',
  // todo change the secret before deployment in production mode
  secret: 'something',
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:(1000*60*100)
  },
  store: new MongoStore(
    {
    mongooseConnection:db,
    autoRemove:'disabled'
  },
  function(err){
    console.log(err || 'connect-mongodb setup ok');
  }
  )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
  if(err){
    console.log(`Error in running the server : ${err}`);
  }

  console.log(`server is running on port :${port}`);

});