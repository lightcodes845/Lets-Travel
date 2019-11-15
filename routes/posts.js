let uniqid = require('uniqid');
let Post  = require("../models/post.js").Post;
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');


//REST APIs
router.get('/', async (req,resp)=>{
    let posts = await Post.find();
    resp.send(posts);

})

router.get('/:id', async (req,resp)=>{
    let postid = req.params.id;
    let post = await Post.findOne({id: postid});
    resp.send(post);

})

router.post('/', authMiddleware, async (req,resp)=>{
    let reqBody = req.body;
    let imgPath;
    //choose between image url and file name on server
    if(reqBody.imageUrl){
        imgPath = reqBody.imageUrl;
    }else{
        imgPath = req.file.path.substring(req.file.path.indexOf('/'),req.file.path.length);
    }

    imgPath = imgPath.replace(/\\/g, "/");
    imgPath = imgPath.replace(/public/, "");

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageUrl: imgPath
    });

    await newPost.save();
    resp.send("Post with title " + reqBody.title + " created");

})

router.delete('/:id',authMiddleware, async (req, resp) =>{
    let id = req.params.id;
    await Post.deleteOne({id: id})
    resp.send("Post with id: " + id + " deleted!");
});

router.put('/:id',authMiddleware, async (req,resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('Updated!');

});


module.exports = router;