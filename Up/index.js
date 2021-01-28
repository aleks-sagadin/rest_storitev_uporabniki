const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const correlator = require('express-correlation-id');
const uporabnikiRoutes = require('./routes/uporabniki');
const cors = require('cors');
var path = require("path");
global.__root   = __dirname + '/'; 

const PORT = process.env.PORT || 3001; 
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://aleks:aleks@cluster0.ga8fi.mongodb.net/uporabniki?retryWrites=true&w=majority';
mongoose.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true}).catch(err => console.log(err));;
mongoose.set('useFindAndModify', false);


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',uporabnikiRoutes);
app.use(correlator());

app.use(express.static(path.join(__dirname,'public')));
//  CORS
app.use(cors());
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
 //swagger
app.use('/doc', express.static(__dirname +'/doc'));


app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'routes/uporabniki');
app.use('/api/users', UserController);

var AuthController = require(__root + 'routes/uporabniki');
app.use('/api/auth', AuthController);


app.use('/doc', express.static(__dirname + '/doc'));

app.use(cors());
app.listen(PORT, () => {
   console.log(`Strežnik posluša na http://localhost:${PORT}`);
});
