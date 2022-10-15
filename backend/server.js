const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const methodOverride = require('method-override');
const mongoSanitize = require('express-mongo-sanitize');
const articleRouter = require('./routers/articleRouter');
const userRouter = require('./routers/userRouter');
const uploadRouter = require('./routers/uploadRouter');
const Article = require('./models/articleModel');
const User = require('./models/userModel');
const contactRouter = require('./routers/contactRouter');

mongoose.connect(config.MONGODB_URL, 
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to mongodb');
    }).catch((error) => {
        console.log(error.reason);
    });

const app = express();

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); //allows form to have put and delete action
app.use(mongoSanitize());
app.use(express.json()); //read request's body section

//handle errors
app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError'? 400: 500;
    res.status(status).send({ message: err.message });
});

//gives the pages a url to be routed to
app.use('/blog', articleRouter, uploadRouter);
app.use('/contact', contactRouter);
app.use('/', userRouter); //register, login, dashboard

//image upload api
app.use('/api/blog/imageUpload', uploadRouter);

//get pages, render has to match the folder structure
//for other pages requiring dynamic functionality use router.get('/...')
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

app.listen(config.PORT, () => {
    console.log(`http://localhost:${config.PORT}`)
});