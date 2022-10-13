import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import Article from "../models/articleModel";
import config from "../config";
import { generateToken, isAuth, isAdmin } from "../utils";

const userRouter = express.Router();

//register page
userRouter.get('/register', (req, res) => {
    res.render('user/register')
});

//login page
userRouter.get('/login', (req, res) => {
    res.render('user/login')
});

//admin dashboard page
userRouter.get('/dashboard', async (req, res) => {
    const articles = await Article.find().sort(
        { createdAt: 'descending' });
    res.render('user/dashboard', { articles: articles })
});

//create admin user
userRouter.get('/createadmin', expressAsyncHandler(async (req, res) => {
    try {
        const user = new User({
            first_name: 'Matt',
            last_name: 'Cor',
            email: 'matt@matt.com',
            password: config.ADMIN_PW,
            isAdmin: true
        });
        const createdUser = await user.save();
        res.send(createdUser);
    }catch(err) {
        res.status(500).send({ message: err.message });
    }
}));

//login user
userRouter.post('/login', expressAsyncHandler(async (req, res) => {
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
}));

//register user
userRouter.post('/register', expressAsyncHandler(async (req, res) => {
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
}));

//change user details
userRouter.put('/:id', isAuth, expressAsyncHandler(async (req, res) => {
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
}));

//delete user
userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        const deletedUser = await user.remove();
        res.send({ message: 'User Deleted', user: deletedUser });
    }else {
        res.status(404).send({ message: 'User Not Found' });
    }
}));

export default userRouter;