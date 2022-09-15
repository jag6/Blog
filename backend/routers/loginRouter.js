import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { generateToken } from "../utils";

const loginRouter = express.Router();

//login user
loginRouter.post('/login', asyncHandler(async (req, res) => {
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

//get login page
loginRouter.get('/login', (req, res) => {
    res.render('user/login')
});

export default loginRouter;