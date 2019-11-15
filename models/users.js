let mongoose = require('mongoose');
let Schema = mongoose.Schema

let usersSchema = new Schema({
    email: String,
    password: String,
  
});

let User = mongoose.model('User', usersSchema);

module.exports = { User }
