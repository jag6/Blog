const express = require('express');
const User = require('../models/userModel');
const Article = require('../models/articleModel');
const config = require('../config');
const { generateToken, isAuth, isAdmin } = require('../utils');

const userRouter = express.Router();


//API

//create admin user
userRouter.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            first_name: config.ADMIN_FN,
            last_name: config.ADMIN_LN,
            email: config.ADMIN_E,
            password: config.ADMIN_PW,
            isAdmin: true
        });
        const createdUser = await user.save();
        res.send(createdUser);
    }catch(err) {
        res.status(500).send({ message: err.message });
    }
});


//GET PAGES

//register page
userRouter.get('/register', (req, res) => {
    res.render('user/register', {
         //metadata
         meta_title: 'Register',
         meta_description: 'Register your account',
         meta_image: '/words.jpg',
         meta_url: '/register',
         //script
         script: '<script type="module" src="/scripts/user/register.js" defer></script>'
    });
});

//login page
userRouter.get('/login', (req, res) => {
    res.render('user/login', {
         //metadata
         meta_title: 'Login',
         meta_description: 'Log in to your account',
         meta_image: '/words.jpg',
         meta_url: '/login',
         //script
         script: '<script type="module" src="/scripts/user/login.js" defer></script>'
    });
});

//admin dashboard page
userRouter.get('/dashboard', async (req, res) => {
    const articles = await Article.find().sort(
        { createdAt: 'descending' });
    res.render('user/dashboard', { 
        articles: articles,
        //metadata
        meta_title: 'Dashboard',
        meta_description: 'Your personal user dashboard',
        meta_image: '/words.jpg',
        meta_url: '/dashboard',
        //script
        script: '<script type="module" src="/scripts/user/logout.js" defer></script>'
    });
});


//POST

//login user
userRouter.post('/login', async (req, res) => {
    const loginUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(!loginUser) {
        res.status(401).send({
            message: 'Invalid Email or Password'
        });
    }else {
        res.send({
            _id: loginUser._id,
            first_name: loginUser.first_name,
            last_name: loginUser.last_name,
            email: loginUser.email,
            isAdmin: loginUser.isAdmin,
            token: generateToken(loginUser)
        });
    }
});

//register user
userRouter.post('/register', async (req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    });
    const createdUser = await user.save();
    if(!createdUser) {
        res.status(401).send({
            message: 'Invalid User Data'
        });
    }else {
        res.send({
            _id: createdUser._id,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser)
        });
    }
});


//PUT

//change user details
userRouter.put('/:id', isAuth, async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        res.status(404).send({
            message: 'User Not Found'
        });
    }else {
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        });
    }
});


//DELETE

//user
userRouter.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        const deletedUser = await user.remove();
        res.send({ message: 'User Deleted', user: deletedUser });
    }else {
        res.status(404).send({ message: 'User Not Found' });
    }
});

module.exports = userRouter;