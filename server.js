require('dotenv').config()
const express = require("express");
const mailer = require("nodemailer");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose");
const blogInfo = require("./static/schema");
const User = require("./static/me");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));
app.set('view engine','ejs');


mongoose.connect("mongodb+srv://technhealth:technhealth123@affiliate.7yjmc.mongodb.net/blog",{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

//LOGINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN///////////////////////////////
const electronics = new User ({
    email: "electronics",
    password: process.env.PASS
});

const largeappliances = new User ({
    email: "large-appliances",
    password: process.env.PASS
});

const softwares = new User ({
    email: "softwares",
    password: process.env.PASS
})

const gadgets = new User ({
    email: "gadgets",
    password: process.env.PASS
})

const health = new User ({
    email: "health",
    password: process.env.PASS
})

app.enable('trust proxy');

app.use(function(req,res,next){
    if (req.secure) {
        // request was via https, so do no special handling
        next();
} else {
        // request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
}
});

app.get("/imadmin",function(req,res){
    res.render("admin");
});

app.post("/imadmin",function(req,res){

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err, foundUser){
        if (err){
            console.log(err);
        } else {
            if (foundUser) {
                if( foundUser.password === password){
                    res.render(`form-${username}`);
                }
            }
        }
    })
})
//LOGIN COMPLETEEEEEEEEEEEEEEEEEEEEEEEEE///////////////////////////////////////

//FORM-ROUTESSSSSSSSSSSSSSSSSSSSSSSSSSSS///////////////////////////////////////

//ELECTRONICSSSS/////
app.get("/electronics/:slug", async (req , res)=>{
    const blog = await blogInfo.findOne({ slug: req.params.slug})
    if (blog == null) res.redirect("/")
    res.render("post", {blog: blog});
})


app.post("/electronics", async (req, res)=>{
    let bloginfo = new blogInfo ({
        title: req.body.route,
        description: req.body.description,
        blogtitle: req.body.title,
        markdown: req.body.markdown
    })
    try {
        bloginfo = await bloginfo.save()
        res.redirect(`/electronics/${bloginfo.slug}`);
    } catch (e) {
        console.log(e);
        res.render("admin");
    }
})
//////
//LARGE-APPLIANCES//////
app.get("/large-appliances/:slug", async (req , res)=>{
    const blog = await blogInfo.findOne({ slug: req.params.slug})
    if(blog == null) res.redirect("/")
    res.render("post", {blog: blog});
})


app.post("/large-appliances", async (req, res)=>{
    let bloginfo = new blogInfo ({
        title: req.body.route,
        description: req.body.description,
        blogtitle: req.body.title,
        markdown: req.body.markdown
    })
    try {
        bloginfo = await bloginfo.save()
        res.redirect(`/large-appliances/${bloginfo.slug}`);
    } catch (e) {
        res.render("admin");
    }
})
/////
//SOFTWARES/////////////////////
app.get("/softwares/:slug", async (req , res)=>{
    const blog = await blogInfo.findOne({ slug: req.params.slug})
    if(blog == null) res.redirect("/")
    res.render("post", {blog: blog});
})


app.post("/softwares", async (req, res)=>{
    let bloginfo = new blogInfo ({
        title: req.body.route,
        description: req.body.description,
        blogtitle: req.body.title,
        markdown: req.body.markdown
    })
    try {
        bloginfo = await bloginfo.save()
        res.redirect(`/softwares/${bloginfo.slug}`);
    } catch (e) {
        res.render("admin");
    }
})
/////
//GADGETS////////////////////////
app.get("/gadgets/:slug", async (req , res)=>{
    const blog = await blogInfo.findOne({ slug: req.params.slug})
    if(blog == null) res.redirect("/")
    res.render("post", {blog: blog});
})


app.post("/gadgets", async (req, res)=>{
    let bloginfo = new blogInfo ({
        title: req.body.route,
        description: req.body.description,
        blogtitle: req.body.title,
        markdown: req.body.markdown
    })
    try {
        bloginfo = await bloginfo.save()
        res.redirect(`/gadgets/${bloginfo.slug}`);
    } catch (e) {
        res.render("admin");
    }
})
/////
////HEALTH////////////////////////////
app.get("/health/:slug", async (req , res)=>{
    const blog = await blogInfo.findOne({ slug: req.params.slug})
    if(blog == null) res.redirect("/")
    res.render("post", {blog: blog});
})


app.post("/health", async (req, res)=>{
    let bloginfo = new blogInfo ({
        title: req.body.route,
        description: req.body.description,
        blogtitle: req.body.title,
        markdown: req.body.markdown
    })
    try {
        bloginfo = await bloginfo.save()
        res.redirect(`/health/${bloginfo.slug}`);
    } catch (e) {
        res.render("admin");
    }
})


app.post("/contact",function(req,res){


    var Email = req.body.email;
    var Message = req.body.message;
    var Name = req.body.username;

    var transporter = mailer.createTransport({
        pool: true,
        service: 'Gmail',
        auth: {
            user: 'technhealth2021@gmail.com',
            pass: process.env.EMAIL_PASS
        }
    });

    var mailOptions = {
        from: 'technhealth2021@gmail.com',
        to: 'technhealth2021@gmail.com',
        subject: 'New Message!' +  " " + Name + " " + Email,
        html: Message
    };

    transporter.sendMail(mailOptions, function(error,info){
        if (error){
            console.log(error);
        } else {
            console.log('Email sent:' + info.response);
        }
    });

    if(res.statusCode === 200){
        res.render("contact");
    } else {
        res.send("There was an error with signing up, please try again");
    }
});

function mailchimp(req,res){

    var Email = req.body.email;

    var data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/b9650a6320"
    const options = {
        method: "POST",
        auth: process.env.LIST_API
    }
    const request = https.request(url, options, function (response){
        response.on("data",function(data){
            
        })
    })

    request.write(jsonData);
    request.end();

    if(res.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    } else {
        res.send("There was an error with signing up, please try again");
    }
}

app.get("/robots.txt", (req,res)=>{
    res.sendFile(__dirname + "/robots.txt");
});

app.get("/sitemap.xml", (req,res)=>{
    res.sendFile(__dirname + "/sitemap.xml");
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/electronics", (req,res)=>{
    res.render("Electronics");
})

app.get("/softwares",function(req,res){
    res.render("Softwares");
});

app.get("/large-appliances",function(req,res){
    res.render("Large_appliances");
});

app.get("/gadgets",function(req,res){
    res.render("Gadgets");
});

app.get("/health",function(req,res){
    res.render("Health");
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/aboutus",function(req,res){
    res.render("aboutus");
});

app.get("/policy",function(req,res){
    res.render("policy");
});

app.get("/success",function(req,res){
    res.sendFile(__dirname + "/success.html");
});

app.get("/affiliate",function(req,res){
    res.sendFile(__dirname + "/affiliate.html");
});

app.post("/",function(req,res){
    mailchimp(req,res);
});

app.listen(process.env.PORT || 3000 , ()=>{
    console.log("Server is running on port 3000");
});
