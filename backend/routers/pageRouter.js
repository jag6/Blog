import express from "express";

const pageRouter = express.Router();

pageRouter.get('/about', (req, res) => {
    res.render('pages/about')
});

pageRouter.get('/contact', (req, res) => {
    res.render('pages/contact')
});

pageRouter.get('/faq', (req, res) => {
    res.render('pages/faq');
});

export default pageRouter;