import express from "express";
import articleRouter from "./routers/articleRouter";

const app = express();

app.set("view engine", 'ejs')

app.use('/articles', articleRouter);

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test',
        createdAt: new Date(),
        description: 'test'
    }]
    res.render('index', { articles: articles})
})


const port = 5000;

app.listen(port, () => {
    console.log(`serving at localhost:${port}`)
});