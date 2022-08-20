import express from "express";
import Article from "../models/articleModel";

const articleRouter = express.Router();

//creates new article page
articleRouter.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
});

//goes to edit article
articleRouter.get('/edit/:id', async (req, res) => {
    const article = await Article.findOneAndUpdate(req.params.id)
    res.render('articles/edit', { article: article })
});

//shows articles
articleRouter.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug});
    if(article == null) res.redirect('/')
    res.render('articles/show', { article: article })
});

//saves article
articleRouter.post('/', async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect('new'));

//edits article
articleRouter.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect('edit'));

//deletes article
articleRouter.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
});

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        article.pageTitle = req.body.pageTitle
        article.pageDescription = req.body.pageDescription
        article.author = req.body.author
        article.twitterTitle = req.body.twitterTitle
        article.twitterDescription = req.body.twitterDescription
        article.ogTitle = req.body.ogTitle
        article.ogDescription = req.body.ogDescription
        article.ogUrl = req.body.ogUrl
        try {
            article = await article.save();
            res.redirect(`/articles/${article.slug}`)
        }catch (e) {
            console.log(e);
            res.render(`articles/${path}`, { article: article })
        }
    }
}

export default articleRouter;