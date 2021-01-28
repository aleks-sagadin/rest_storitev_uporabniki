var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  username: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
ime: {
    type: String,
    required: true
},
priimek: {
    type: String,
    required: true
}
,
naslov: {
    type: String,
    required: true
},
posta: {
    type: Number,
    required: true
},
telefon: {
    type: Number,
    required: true
}
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');