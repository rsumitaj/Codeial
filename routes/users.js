const express = require('express');
const { user } = require('../config/mongoose');
const passport = require('passport');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication ,usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);

// use passport as the middleware to authenticate
router.post('/create-session', passport.authenticate('local',{failureRedirect:'/users/sign-in'}), usersController.createSession);


const postsController = require('../controllers/users_controller');

router.get('/posts',postsController.posts);


module.exports = router;
