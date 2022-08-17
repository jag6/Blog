import express from "express";
import mongoose from "mongoose";
import articleRouter from "./routers/articleRouter";
import Article from "./models/articleModel";
import methodOverride from "method-override";

const app = express();
mongoose.connect('mongodb://localhost/blog', 
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to mongodb');
    }).catch((error) => {
        console.log(error.reason);
    });

app.set("view engine", 'ejs');

app.use(express.static("css")); 

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
    const articles = await Article.find().sort(
        { createdAt: 'descending'});
    res.render('articles/index', { articles: articles})
});

const port = 5000;
app.listen(port, () => {
    console.log(`serving at localhost:${port}`)
});