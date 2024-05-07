const express = require('express');
const app = express();
const path = require('path');
const PORT = 3004;
const Articles = require(path.join(__dirname, 'controller', 'articles.js'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let totalArticles = 0;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/publish', async(req, res) => {
    try{
        const {story} = req.query;
        const {title} = req.query;
        if(story != "" && title != ""){
            const msg = await Articles.addArticle(story, title);
            totalArticles++;
        }
        res.redirect('/write');
    }
    catch(err){
        console.log(err);
    }
})

app.post('/getArticle', async(req, res) => {
    try{
        const {indx} = req.body;
        const Article = await Articles.getArticle(indx);
        res.send(Article);
    }
    catch(err){
        console.log(err);
    }
})

app.get('/getArticles', async(req, res) => {
    try{
        const totalArticles = await Articles.getArticles();
        res.send(totalArticles);
    }
    catch(err){
        console.log(err);
    }
})

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/write', express.static(path.join(__dirname, 'write')));


app.listen(PORT, () => {
    console.log('http://localhost:'+PORT);
})



