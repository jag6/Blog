import express from "express";
import expressAsyncHandler from "express-async-handler";
import Article from "../models/articleModel";
import { isAuth, isAdmin } from "../utils";

const articleRouter = express.Router();

//new blog article page
articleRouter.get('/new', async (req, res) => {
    res.render('blog/new', { article: new Article() })
});

//get all articles
articleRouter.get('/articles', expressAsyncHandler(async (req, res) => {
    const articles = await Article.find().sort(
        { createdAt: 'descending' });
    res.send(articles);
}));

//save new blog article
articleRouter.post('/new', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const article = new Article({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        markdown: req.body.markdown,
        author: req.body.author
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
            author: createdArticle.author
        });
    }
}));

//blog article pages
articleRouter.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug});
    if(article == null) res.redirect('/')
    res.render('blog/show', { article: article })
});

//edit blog article pages
articleRouter.get('/edit/:id', async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id)
    res.render('blog/edit', { article: article })
});

//edit blog article
articleRouter.post('/edit/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id);
    if(article) {
        article.title = req.body.title;
        article.category = req.body.category;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        article.author = req.body.author;
        const editedArticle = await article.save();
        if(editedArticle) {
            res.send({ message: 'Article Edited', article: editedArticle });
        }else {
            res.status(500).send({ message: 'Error in editing article'});
        }
    }else {
        res.status(404).send({ message: 'Article Not Found'});
    }
}));

//delete blog article
articleRouter.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard')
});

export default articleRouter;