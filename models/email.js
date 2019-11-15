let mongoose = require('mongoose');
let Schema = mongoose.Schema


let emailsSchema = new Schema({
    id: String,
    name: String,
    email: String,
    message: String,
    date: Date
});

let Emails = mongoose
    .model('Emails', emailsSchema, 'emails');


module.exports.Emails = Emails;