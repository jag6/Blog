import express from "express";
import mongoose from "mongoose";
import config from "./config";
import cors from "cors";
import methodOverride from "method-override";
import mongoSanitize from "express-mongo-sanitize";
import articleRouter from "./routers/articleRouter";
import pageRouter from "./routers/pageRouter";
import userRouter from "./routers/userRouter";
import Article from "./models/articleModel";
import User from "./models/userModel";
import contactRouter from "./routers/contactRouter";

mongoose.connect(config.MONGODB_URL, 
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to mongodb');
    }).catch((error) => {
        console.log(error.reason);
    });

const app = express();

app.set("view engine", 'ejs');

app.use(cors());
app.use(express.static("public")); 
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); //allows form to have delete action
app.use(mongoSanitize());
app.use(express.json()); //read request's body section

//handle errors
app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError'? 400: 500;
    res.status(status).send({ message: err.message });
});

//gives the pages a url to be routed to
app.use('/blog', articleRouter);
app.use('/about', pageRouter);
app.use('/contact', contactRouter);
app.use('/faq', pageRouter);
app.use('/', userRouter);

//launch apis
app.use('/api/users', userRouter);
app.use('/api/blog', articleRouter);

//get pages, render has to match the folder structure
app.get('/', async (req, res) => {
    const articles = await Article.find().sort(
        { createdAt: 'descending' });
    res.render('blog/index', { articles: articles })
});
app.get('/about', (req, res) => {
    res.render('pages/about')
});
app.get('/contact', async (req, res) => {
    const users = await User.find();
    res.render('pages/contact', { users: users })
});
app.get('/faq', (req,res) => {
    res.render('pages/faq')
});
app.get('/register', (req, res) => {
    res.render('user/register')
});
app.get('/login', (req, res) => {
    res.render('user/login')
});
app.get('/dashboard', async (req, res) => {
    const articles = await Article.find().sort(
        { createdAt: 'descending' });
    res.render('user/dashboard', { articles: articles })
});

app.listen(config.PORT, () => {
    console.log(`http://localhost:${config.PORT}`)
});