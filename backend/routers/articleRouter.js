import express from "express";
import Article from "../models/articleModel";

const articleRouter = express.Router();

//creates new blog article page
articleRouter.get('/new', (req, res) => {
    res.render('blog/new', { article: new Article() })
});

//goes to edit blog article
articleRouter.get('/edit/:id', async (req, res) => {
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
articleRouter.post('/', async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect('new'));

//edits blog article
articleRouter.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect('edit'));

//deletes blog article
articleRouter.delete('/:id', async (req, res) => {
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
            res.redirect(`/blog/${article.slug}`)
        }catch (e) {
            console.log(e);
            res.render(`blog/${path}`, { article: article })
        }
    }
}

export default articleRouter;