const express =  require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejs = require('ejs')
const {v4 : uuid} = require('uuid')

app.use(express.urlencoded({extended : true}));
app.use(express.json())
app.use(methodOverride('_method'));
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))

let posts = [
    {
        "id": uuid(),
        "author": 'shruti',
        "topic": "animals",
        "text": "I love cats",
    },
    {
        "id": uuid(),
        "author": 'bobo',
        "topic": "animals",
        "text": "I love dogs",
    },
    {
        "id": uuid(),
        "author": 'bambi',
        "topic": "animals",
        "text": "I love giraffes",
    },
    {
        "id": uuid(),
        "author": 'sudo',
        "topic": "animals",
        "text": "I love rats",
    }
    
]

app.listen(3000, () => {
    console.log("on port 3000")
})

app.get('/posts/newpost', (req, res) => {
    res.render('posts/new');
});

app.post('/posts', (req,res) => {
    const { author, topic, text} = req.body;
    posts.push({ id: uuid(), author, topic, text});
    res.redirect('/posts');
});

app.get('/posts', (req, res) => {
    res.render('posts/posts', {posts});
});


app.post('/posts', (req,res) => {
    const { author, topic, text} = req.body;
    posts.push({ id: uuid(), author, topic, text});
    res.redirect('/posts');
});

app.get('/posts/:id/edit', (req, res) =>{
    const {id} = req.params;
    const post = posts.find(p => p.id === id);
    res.render('posts/edit.ejs', {post});
});

app.get('/posts/:id' , (req, res) => {
    const {id} = req.params;
    const post = posts.find(p => p.id === id);
    res.render('posts/details', {post});
});
app.patch('/posts/:id', (req, res) => {
    //update
    const {id} = req.params;
    const foundPost = posts.find(p => p.id === id )
    const newPost = req.body.text
    foundPost.text = newPost;
    res.redirect('/posts')
});

app.delete('/posts/:id', (req, res) => {
    const {id} = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect('/posts')
    
});






