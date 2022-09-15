import express from "express";
import User from "../models/userModel";

const contactRouter = express.Router();


contactRouter.get('/contact', (req, res) => {
    res.render('pages/contact')
});




contactRouter.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/')
});


export default contactRouter