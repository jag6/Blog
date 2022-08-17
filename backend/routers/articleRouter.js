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
        markdown: req.body.markdown
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

/*articleRouter.delete(':/id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if(article) {
        const deletedArticle = await article.remove();
        res.send ({message: 'Article Deleted,', article: deletedArticle})
    }else {
        res.status(404).send({message: 'Article Not Found'})
    }
})*/

export default articleRouter;