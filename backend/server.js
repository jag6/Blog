import express from "express";
import mongoose from "mongoose";
import config from "./config";
import methodOverride from "method-override";
import mongoSanitize from "express-mongo-sanitize";
import articleRouter from "./routers/articleRouter";
import pageRouter from "./routers/pageRouter";
import registerRouter from "./routers/registerRouter";
import loginRouter from "./routers/loginRouter";
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

app.use(express.static("public")); 

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use(mongoSanitize());

app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError'? 400: 500;
    res.status(status).send({message: err.message});
});

//gives the pages a url to be routed to
app.use('/blog', articleRouter);
app.use('/about', pageRouter);
app.use('/contact', contactRouter);
app.use('/faq', pageRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

//render has to match the folder structure for get method
app.get('/', async (req, res) => {
    const articles = await Article.find().sort(
        { createdAt: 'descending'});
    res.render('blog/index', { articles: articles})
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

app.listen(config.PORT, () => {
    console.log(`http://localhost:${config.PORT}`)
});