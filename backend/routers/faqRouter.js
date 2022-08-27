import express from "express";

const faqRouter = express.Router();

faqRouter.get('/faq', (req, res) => {
    res.render('pages/faq');
});

export default faqRouter;