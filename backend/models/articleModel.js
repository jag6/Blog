import mongoose from "mongoose";
import marked from "marked";
import slugify from "slugify";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    pageTitle: {
        type: String,
        required: true,
    },
    pageDescription: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    twitterTitle: {
        type: String,
        required: true,
    },
    twitterDescription: {
        type: String,
        required: true,
    },
    ogTitle: {
        type: String,
        required: true,
    },
    ogDescription: {
        type: String,
        required: true,
    },
    ogUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

articleSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }
    next();
});

const Article = mongoose.model('Article', articleSchema);

export default Article;