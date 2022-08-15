import express from "express";

const articleRouter = express.Router();
articleRouter.get('/', (req, res) => {
    res.send('article');
});


export default articleRouter;