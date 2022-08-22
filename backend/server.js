import express from "express";
import mongoose from "mongoose";
import articleRouter from "./routers/articleRouter";
import aboutRouter from "./routers/aboutRouter";
import contactRouter from "./routers/contactRouter";
import userRouter from "./routers/userRouter";
import Article from "./models/articleModel";
import methodOverride from "method-override";
import mongoSanitize from "express-mongo-sanitize";

mongoose.connect('mongodb://localhost/blog', 
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to mongodb');
    }).catch((error) => {
        console.log(error.reason);
    });

const app = express();

app.set("view engine", 'ejs');

app.use(express.static("public")); 

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use(mongoSanitize());

//gives the pages a url to be routed to
app.use('/articles', articleRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/users', userRouter);

//render has to match the folder structure for get method
app.get('/', async (req, res) => {
    const articles = await Article.find().sort(
        { createdAt: 'descending'});
    res.render('articles/index', { articles: articles})
});

app.get('/about', (req, res) => {
    res.render('pages/about')
});

app.get('/contact', (req, res) => {
    res.render('pages/contact')
});

const port = 5000;
app.listen(port, () => {
    console.log(`serving at localhost:${port}`)
});