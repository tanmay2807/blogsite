const mongoose = require('mongoose');
const slugify = require('slugify')

const blogSchema = new mongoose.Schema({

    title: String,
    markdown: String,
    slug: {
        type: String,
        reqired: true,
        unique: true
    }
});

blogSchema.pre('validate',function(next){
    if(this.title){
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    next()
});

module.exports = new mongoose.model("blogInfo", blogSchema);