import express from "express";
import Article from "../models/articleModel";

const articleRouter = express.Router();

//creates new article page
articleRouter.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

//shows articles
articleRouter.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug});
    if(article == null) res.redirect('/')
    res.render('articles/show', { article: article })
});

//creates new article
articleRouter.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        pageTitle: req.body.pageTitle,
        pageDescription: req.body.pageDescription,
        author: req.body.author,
        twitterTitle: req.body.twitterTitle,
        twitterDescription: req.body.twitterDescription,
        ogTitle: req.body.ogTitle,
        ogDescription: req.body.ogDescription,
        ogUrl: req.body.ogUrl
    });
    try {
        article = await article.save();
        res.redirect(`/articles/${article.slug}`)
    }catch (e) {
        console.log(e);
        res.render('articles/new', { article: article })
    }
});

//deletes article
articleRouter.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
});

export default articleRouter;