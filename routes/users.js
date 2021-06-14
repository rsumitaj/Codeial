const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);


const postsController = require('../controllers/users_controller');

router.get('/posts',postsController.posts);


module.exports = router;
