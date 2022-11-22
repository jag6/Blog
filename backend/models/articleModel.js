const mongoose = require('mongoose');
const { marked } = require('marked');
const slugify = require('slugify');
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const dompurify = DOMPurify(new JSDOM().window);

const commentSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true
    },
    first_name: { 
        type: String, 
        required: true 
    },
    last_name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }}, 
    { timestamps: true }
);

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
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
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    image_description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category_slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
    comments: [commentSchema],
    numComments: {
        type: Number,
        default: 0,
        required: true
    }
});

articleSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        });
    }
    if(this.category) {
        this.category_slug = slugify(this.category, {
            lower: true,
            strict: true
        });
    }
    if(this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next();
});

module.exports = mongoose.model('Article', articleSchema);