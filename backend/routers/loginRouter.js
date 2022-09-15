import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { generateToken } from "../utils";

const loginRouter = express.Router();

//login user
loginRouter.post('/login', asyncHandler(async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(!signinUser) {
        res.status(401).send({
            message: 'Invalid Email or Password'
        });
    }else {
        res.send({
            _id: signinUser._id,
            first_name: signinUser.first_name,
            last_name: signinUser.last_name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: generateToken(signinUser)
        });
    }
}));

//get login page
loginRouter.get('/login', (req, res) => {
    res.render('user/login')
});

export default loginRouter;