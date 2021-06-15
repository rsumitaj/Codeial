const express = require('express');
const { user } = require('../config/mongoose');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);


const postsController = require('../controllers/users_controller');

router.get('/posts',postsController.posts);


module.exports = router;
