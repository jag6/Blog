import express from "express";

const contactRouter = express.Router();

//gets contact page
contactRouter.get('/contact', (req, res) => {
    res.render('pages/contact');
});

export default contactRouter;