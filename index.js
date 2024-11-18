const express = require('express');
const mongoose = require('mongoose');
// mongodb+srv://ahmedbarkhed:<db_password>@myfirstnodejscluster.y2gbr.mongodb.net/?retryWrites=true&w=majority&appName=myfirstNodeJSCluster
const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect('mongodb+srv://ahmedbarkhed:99149747amm@myfirstnodejscluster.y2gbr.mongodb.net/?retryWrites=true&w=majority&appName=myfirstNodeJSCluster')
.then(()=>{
    console.log('connected successfully');
}).catch((error)=>{
    console.error("Could not connect to MongoDB:", error);
})

const Article = require('./models/article')

// end points
app.get('/hello', (req, res)=>{
    res.send("Welcome to the new online page!");
})

app.get('/findsum/:number1/:number2', (req , res)=>{
    res.send(`the total is ${
        parseInt(req.params.number1)+ parseInt(req.params.number2)
    }`
)})  


app.get('/sayhello', (req , res)=>{
    res.send(`my name is ${req.body.name}`)
})  

app.get('/queryparams', (req , res)=>{
    res.send(`my age is ${req.query.age}`)
})


// ======== Articles Endpoints =================//

app.post('/articles', async (req, res)=>{

    const newArticle = new Article();
    newArticle.title = req.body.title;
    newArticle.content = req.body.content;
    newArticle.author = req.body.author;
    newArticle.date = new Date;
    newArticle.save();
    await res.json(newArticle);
})

app.get('/articles/', async (req, res) => {
    const id = req.params.articleId;
    try {
        const articles = await Article.find();
        console.log("The articles are: ", articles);
        res.json(articles);
        return
    } 
    catch (error) {
        console.error("Error fetching articles:", error.message);
        res.status(500).json({ error: "An error occurred while fetching articles." });
    }
});

app.get('/articles/:articleId', async (req, res) => {
    const id = req.params.articleId;
    try {
        const articles = await Article.findById(id);
        console.log("The articles are: ", articles);
        res.json(articles);
        return
    } 
    catch (error) {
        console.error("Error fetching articles:", error.message);
        res.status(500).json({ error: "An error occurred while fetching articles." });
    }
});

app.delete('/articles/:articleId', async (req, res) => {
    const id = req.params.articleId;
    
    try{
        const article = await Article.findByIdAndDelete(id);
        res.json(article);
        return
    }
    catch(error){
        console.error("Error deleting article:", error.message);
        res.status(500).json({ error: "An error occurred while deleting article." });
    }
})

app.get('/showsarticles', async (req, res)=>{
    try{
        const articles = await Article.find();
        res.render('./articles.ejs', {
            articles: articles
        })
        return
    }
    catch(error){
        console.error("Error deleting article:", error.message);
        res.status(500).json({ error: "An error occurred while deleting article." });
    }
})



app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
});

