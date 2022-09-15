import express from "express";
import Article from "../models/articleModel";
import { isAuth, isAdmin } from "../utils";

const articleRouter = express.Router();

//creates new blog article page
articleRouter.get('/new', isAuth, isAdmin, (req, res) => {
    res.render('blog/new', { article: new Article() })
});

//goes to edit blog article
articleRouter.get('/edit/:id', isAuth, isAdmin, async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id)
    res.render('blog/edit', { article: article })
});

//shows blog articles
articleRouter.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug});
    if(article == null) res.redirect('/')
    res.render('blog/show', { article: article })
});

//saves blog article
articleRouter.post('/', isAuth, isAdmin, async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect('new'));

//edits blog article
articleRouter.put('/:id', isAuth, isAdmin, async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect('edit'));

//deletes blog article
articleRouter.delete('/:id', isAuth, isAdmin, async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
});

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title
        article.category = req.body.category
        article.description = req.body.description
        article.markdown = req.body.markdown
        article.author = req.body.author
        try {
            article = await article.save();
            res.redirect(`/blog/${article.slug}`)
        }catch (e) {
            console.log(e);
            res.render(`blog/${path}`, { article: article })
        }
    }
}

export default articleRouter;