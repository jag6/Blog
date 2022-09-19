import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import config from "../config";
import { generateToken } from "../utils";

const userRouter = express.Router();

//create admin user
userRouter.get('/createadmin', asyncHandler(async (req, res) => {
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
        res.status(500).send({message: err.message});
    }
}));

//register user
userRouter.post('/register', asyncHandler(async (req, res) => {
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
    }
));

//login user
userRouter.post('/login', asyncHandler(async (req, res) => {
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
        res.redirect('/dashboard');
    }
}));

export default userRouter;