let Emails = require('../models/email').Emails;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, async (req, resp) =>{

    resp.send(await Emails.find());

});

router.post('/', async (req, resp) =>{
    let reqBody = req.body;
    let newEmail = new Emails({
        id: uniqid(),
        name: reqBody.name,
        email: reqBody.email,
        message: reqBody.message,
        date: new Date()
    });

    await newEmail.save();
    resp.send('Email log with ' 
            + reqBody.email + " created");

});
router.delete('/:id', authMiddleware, async (req, resp) =>{

    await Emails.deleteOne({id: req.params.id});
    resp.send('Deleted!');

});

module.exports = router;