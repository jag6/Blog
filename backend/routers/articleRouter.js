const express = require('express');
const Article = require('../models/articleModel');
const { isAuth, isAdmin } = require('../utils');

const articleRouter = express.Router();

//API

//get all articles 
articleRouter.get('/articles', async (req, res) => {
    const articles = await Article.find().sort(
        { createdAt: 'descending' });
    res.send(articles);
});


//GET PAGES

//new blog article
articleRouter.get('/new', async (req, res) => {
    res.render('blog/new', { 
        article: new Article(),
        //metadata
        meta_title: 'New Article',
        meta_description: 'Write a new article',
        meta_image: 'words.jpg',
        meta_url: '/blog/new',
        //script
        script: '<script type="module" src="/scripts/user/new.js" defer></script>'
    });
});

//blog article page
articleRouter.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if(article == null) res.redirect('/');
    res.render('blog/show', { article: article });
});

//get blog article category page
articleRouter.get('/category/:category_slug', async (req, res) => {
    const articles = await Article.find({ category_slug: req.params.category_slug }).sort(
        { createdAt: 'descending' });
    res.render('blog/category', { articles: articles });
});

//get edit blog article pages
articleRouter.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('blog/edit', { 
        article: article,
        //metadata
        meta_title: 'Edit Article',
        meta_description: 'Edit your article',
        meta_image: 'words.jpg',
        meta_url: '',
        //script
        script: '<script type="module" src="/scripts/user/edit.js" defer></script>'
    });
});


//POST

//save new blog article
articleRouter.post('/new', isAuth, isAdmin, async (req, res) => {
    const article = new Article({
        title: req.body.title,
        category: req.body.category,
        category_slug: req.body.category_slug,
        description: req.body.description,
        markdown: req.body.markdown,
        author: req.body.author,
        image: req.body.image,
        image_description: req.body.image_description
    });
    const createdArticle = await article.save();
    if(!createdArticle) {
        res.status(401).send({
            message: 'Invalid Data'
        });
    }else {
        res.send({
            title: createdArticle.title,
            category: createdArticle.category,
            category_slug: createdArticle.category_slug,
            description: createdArticle.description,
            markdown: createdArticle.markdown,
            author: createdArticle.author,
            image: createdArticle.image,
            image_description: createdArticle.image_description
        });
    }
});

//edit blog article
articleRouter.post('/edit/:id', isAuth, isAdmin, async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id);
    if(article) {
        article.title = req.body.title;
        article.category = req.body.category;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        article.author = req.body.author;
        article.image = req.body.image;
        article.image_description = req.body.image_description;
        const editedArticle = await article.save();
        if(editedArticle) {
            res.send({ message: 'Article Edited', article: editedArticle });
        }else {
            res.status(500).send({ message: 'Error in editing article'});
        }
    }else {
        res.status(404).send({ message: 'Article Not Found'});
    }
});


//post comments
articleRouter.post('/:slug/comment', isAuth, async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if(article) {
        if(article.comments.find((x) => x.first_name === req.user.first_name && x.last_name === req.user.last_name)) {
            return res.status(400).send({ message: 'You\'ve already posted a comment!' });
        }
        const comment = {
            comment: req.body.comment,
            user: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name
        };
        article.comments.push(comment);
        article.numComments = article.comments.length;
        const updatedArticle = await article.save();
        res.status(201).send({
            message: 'Comment Created',
            data: updatedArticle.comments[updatedArticle.comments.length - 1]
        });
    }else {
        throw Error('Article does not exist');
    }
});


//DELETE

//blog article
articleRouter.delete('/delete/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
});

module.exports = articleRouter;