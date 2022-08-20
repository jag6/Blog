import express from "express";

const aboutRouter = express.Router();

//gets about page
aboutRouter.get('/about', (req, res) => {
    res.render('pages/about');
});

export default aboutRouter;