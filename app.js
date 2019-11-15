let express = require('express');
let app = express();
let auth = require('./controllers/auth');

//used for processing binary data sent to the server
let multer = require('multer');

//routers from other files
let postsRouter = require('./routes/posts');
let emailsRouter = require('./routes/emails');
let CallbackRequestRouter = require('./routes/callback-requests');
let usersRouter = require('./routes/users');

//EJS
app.set('view engine', 'ejs');

//cookie parser
let cookieParser = require('cookie-parser');
app.use(cookieParser());

//database
let mongoose = require('mongoose');
// let Post  = require("./models/post.js").Post; (moved to posts.js)

mongoose.connect('mongodb://localhost/travels',
{ useNewUrlParser: true })
.then(()=>{
    console.log("Connected to MongoDB...");
})
.catch((error)=>{
    console.log("Something is wrong...");
});

let Post = require('./models/post').Post;


app.use(express.json());

//for handling saving files sent to server on server disk
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})
app.use(multer({storage: imageStorage}).single('imageFile'));

app.use('/posts', postsRouter);
app.use('/emails', emailsRouter);
app.use('/callback-requests', CallbackRequestRouter);
app.use('/users', usersRouter);

app.get('/sight', async (req, resp) =>{
    let id = req.query.id;
    let post = await Post.findOne({id: id})
    resp.render('sight',{
        title: post.title,
        imageUrl: post.imageUrl,
        date: post.date,
        text: post.text
    })
});

//for sign-in purposes
app.get('/admin', (req, resp)=>{
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        resp.render('admin');
    } else{
        resp.redirect('/login');
    }    
})

app.get('/login', (req,resp) =>{
    resp.render('login');
})

app.use(express.static('public'));

app.listen(3000, ()=> console.log('Listening 3000...'))
