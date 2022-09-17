import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { generateToken } from "../utils";
import config from "../config";

const registerRouter = express.Router()

//create admin user
registerRouter.get('/createadmin', asyncHandler(async (req, res) => {
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
registerRouter.post('/', asyncHandler(async (req, res) => {
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

//get register page
registerRouter.get('/register', (req, res) => {
    res.render('user/register')
});

export default registerRouter;