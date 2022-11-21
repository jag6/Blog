const express = require('express');
const Article = require('../models/articleModel');
const { isAuth, isAdmin } = require('../utils');

const articleRouter = express.Router();

//new blog article page
articleRouter.get('/new', async (req, res) => {
    res.render('blog/new', { article: new Article() });
});

//get all articles 
articleRouter.get('/articles', async (req, res) => {
    const articles = await Article.find().sort(
        { createdAt: 'descending' });
    res.send(articles);
});

//save new blog article
articleRouter.post('/new', isAuth, isAdmin, async (req, res) => {
    const article = new Article({
        title: req.body.title,
        category: req.body.category,
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
            description: createdArticle.description,
            markdown: createdArticle.markdown,
            author: createdArticle.author,
            image: createdArticle.image,
            image_description: createdArticle.image_description
        });
    }
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

//edit blog article pages
articleRouter.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('blog/edit', { article: article });
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

//delete blog article
articleRouter.delete('/delete/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
});

module.exports = articleRouter;