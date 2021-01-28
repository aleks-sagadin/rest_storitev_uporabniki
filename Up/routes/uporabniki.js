require('dotenv').config();
const express = require('express');
const User = require('../models/User');
const { query } = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const utils = require('./utils');
const correlator = require('express-correlation-id');


const amqplib = require('amqplib');
var assert = require('assert');
var util = require('util');

var rabbit_user= "student";
var rabbit_pwd = "student123";
var rabbit_host = "172.17.0.77";
//var rabbit_host = "studentdocker.informatika.uni-mb.si";

var rabbit_port = "5672";
var vhost="";


// app.use other middleware here
router.use(correlator());
/*
app.get('/', (req, res) => {
  console.log('ID for this request is:', req.correlationId()); // id for this request
  console.log('ID for this request is:', correlator.getId());  // equal to above, not dependant on the req object
  res.end();
})*/

async function produce(message){

  var amql_url = util.format("amqp://%s:%s@%s:%s/%s", rabbit_user, rabbit_pwd, rabbit_host, rabbit_port, vhost);

  console.log("Publishing");
  var conn = await amqplib.connect(amql_url, "heartbeat=60");
    var ch = await conn.createChannel()
    var exch ='UPP-4';
    var q = 'UPP-4-logs';
    var rkey='upp-4-logs';
    await ch.assertExchange(exch,'direct',{durable:true}).catch(console.error);
    await ch.assertQueue(q,{durable:true});
    await ch.bindQueue(q,exch,rkey);
    //let status = req.status;
    //var msg  = `${status}`;
    await ch.publish(exch,rkey, Buffer.from(message));

    setTimeout( function(){
      ch.close();
      conn.close();}, 500);

}





function test (req, res, next) {
  
    var token = req.headers['authorization'];
    if (!token) return next(); //ce ni tokena nadaljujenpm
    token = token.replace('Bearer ', '');
  
  
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      } else {
        req.user = user; 
        next();
      }
    });
  };
  
  function authenticateToken(req, res, next) {
    // dobi token 
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if ce ni pravilno
  
    jwt.verify(token, process.env.JWT_SECRET , function (err, user) {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
  //var User = require('./user/User');
  
  /**
   * @api {post}  /users/add zaregistracijo 
   * @apiname DodajanjeUporabnika
   * @apiGroup Post
   * 
   * @apiParam {Username} [username]
   * @apiParam {password} [password]
   * @apiParam {Ime} [ime]
   * @apiParam {Priimek} [priimek]
   * @apiParam {Naslov} [naslov]
   * @apiParam {Posta} [posta]
   * @apiParam {Telefon} [telefon]
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "_id": "5fd8ba08fbf57e32d8e938a7",
          "username": "arr",
          "password": "arr",
          "ime": "arr",
          "priimek": "arr",
          "naslov": "arr",
          "posta": 2000,
          "telefon": 123123213,
   *     }
   */
  router.post('/users/add', function (req, res) {
      User.create({
          username: req.body.username,
          password: req.body.password,
          ime: req.body.ime,
          priimek: req.body.priimek,
          naslov: req.body.naslov,
          posta: req.body.posta,
          telefon: req.body.telefon
          }, 
          function (err, user) {
              if (err) return res.status(500).send("There was a problem adding the information to the database.");
              res.status(200).send(user);
          });
          //logging
        let current_datetime = new Date();
    
        let url = req.url;
        var log = "fafed73d90a73cebf6f6000"
        let level= req.level;
        let method = req.method; 
        let status = res.statusCode
       
        var mess = {
          "timestamp": `${current_datetime}`,
          "URL": ` ${url}`,
          "STATUS": ` ${status}`,
          "Correlationid": `${log}`,
          "imestoritve": "[UPORABNIKI]",
          "Sporocilo": `< ${method} metoda za registracijo > `
        }
        const message = JSON.stringify(mess);
        produce(message).then(()=>{
        console.log("registracija");
      })


  });
  
  
  
  /**
   * @api {post}  /users/dodajUpp dodaj Uporabnika
   * @apiname DodajanjeUporabnika
   * @apiGroup Post
   * 
   * @apiParam {Username} [username]
   * @apiParam {password} [password]
   * @apiParam {Ime} [ime]
   * @apiParam {Priimek} [priimek]
   * @apiParam {Naslov} [naslov]
   * @apiParam {Posta} [posta]
   * @apiParam {Telefon} [telefon]
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "_id": "5fd8ba08fbf57e32d8e938a7",
          "username": "arr",
          "password": "arr",
          "ime": "arr",
          "priimek": "arr",
          "naslov": "arr",
          "posta": 2000,
          "telefon": 123123213,
   *     }
   */
  router.post('/users/dodajUpp',authenticateToken, function (req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password,
        ime: req.body.ime,
        priimek: req.body.priimek,
        naslov: req.body.naslov,
        posta: req.body.posta,
        telefon: req.body.telefon
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
        let current_datetime = new Date();
      let url = req.url;
      var log = "fafed73d90a73cebf6f6001"
      let method = req.method; 
      let status = res.statusCode
      var mess = {
        "timestamp": `${current_datetime}`,
        "URL": ` ${url}`,
        "STATUS": ` ${status}`,
        "Correlationid": `${log}`,
        "imestoritve": "[UPORABNIKI]",
        "Sporocilo": `< ${method} doda uporabnika > `
      }
      const message = JSON.stringify(mess);
       produce(message).then(()=>{
      console.log("dodajanje up");
    })
  });
  
  
  
  
  /**
   * @api {get}  /users/all  uporabnke
   * @apiName Pridobi vse uporabnike
   * @apiGroup Get
   * 
   * 
   * @apiSuccess {Uporabnik} vrne vse uporabnike
   */
  router.get('/users/all',authenticateToken, function (req, res, next) {
      User.find({}, function (err, users) {
          if (err) return res.status(500).send("There was a problem finding the users.");
          res.status(200).send(users);
      });

      //console.log('ID for this request is:', req.correlationId()); // id for this request
     
      let current_datetime = new Date();

    let url = req.url;
    var log = "fafed73d90a73cebf6f6002"
    let method = req.method; 
    let status = res.statusCode
    var mess = {
    "timestamp": `${current_datetime}`,
    "URL": ` ${url}`,
    "STATUS": ` ${status}`,
    "Correlationid": `${log}`,
    "imestoritve": "[UPORABNIKI]",
    "Sporocilo": `< ${method} metoda pridobi vse uporabnike > `
  }
  console.log('ID for this request is:', log);  // equal to above, not dependant on the req object

  const message = JSON.stringify(mess);

    produce(message).then(()=>{
    console.log("vrne vse uporabnike");
  })



  });
  

  router.get('/users/vrni', function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });

    //console.log('ID for this request is:', req.correlationId()); // id for this request
   
    let current_datetime = new Date();

  let url = req.url;
  var log = "fafed73d90a73cebf6f6002"
  let method = req.method; 
  let status = res.statusCode
  var mess = {
  "timestamp": `${current_datetime}`,
  "URL": ` ${url}`,
  "STATUS": ` ${status}`,
  "Correlationid": `${log}`,
  "imestoritve": "[UPORABNIKI]",
  "Sporocilo": `< ${method} metoda pridobi vse uporabnike > `
}
console.log('ID for this request is:', log);  // equal to above, not dependant on the req object

const message = JSON.stringify(mess);

  produce(message).then(()=>{
  console.log("vrne vse uporabnike");
})



});














  /**
   * @api {put}  /posodobi/:id  /pososdobitev
   * @apiName PosodobitevUporabnika
   * @apiGroup Put
   * 
   * @apiParam {Username} [username]
   * @apiParam {password} [password]
   * @apiParam {Ime} [ime]
   * @apiParam {Priimek} [priimek]
   * @apiParam {Naslov} [naslov]
   * @apiParam {Posta} [posta]
   * @apiParam {Telefon} [telefon]
   * 
  * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "_id": "5fd8ba08fbf57e32d8e938a7",
          "username": "arr",
          "password": "arr",
          "ime": "arr",
          "priimek": "arr",
          "naslov": "arr",
          "posta": 2000,
          "telefon": 123123213,
   *     }
   */
  router.put('/posodobi/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });

    let current_datetime = new Date();

  let url = req.url;
  var log = "fafed73d90a73cebf6f6003"
  let method = req.method; 
  let status = res.statusCode
  
  var mess = {
    "timestamp": `${current_datetime}`,
    "URL": ` ${url}`,
    "STATUS": ` ${status}`,
    "Correlationid": `${log}`,
    "imestoritve": "[UPORABNIKI]",
    "Sporocilo": `< ${method} metoda posodobi uporabnika > `
  }
  const message = JSON.stringify(mess);
  produce(message).then(()=>{
  console.log("vrne vse uporabnike");
  })
  });
  
  
  // static user details
  const userData = {
      userId: "789789",
      password: "123456",
      name: "Clue Mediator",
      username: "cluemediator",
      isAdmin: true
    };
  
  /**
   * @api {post} /users/signin /za login
   * @apiname vpis username/mail in geslo
   * @apiGroup Post
   * 
   * @apiParam {String} [username]
   * @apiParam {String} [password]
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *  
          "username": "arr",
          "password": "arr",
   *     }
   */
  router.post('/users/signin', function (req, res) {
    //const user = req.body.username;
    //const pwd = req.body.password;
    User.findOne({ username: req.body.username }, function (err, user) {
    // return 400 status if username/password is not exist
  
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
  
    if (!req.body.password || !req.body.username) {
      return res.status(400).json({
        error: true,
        message: "Username or Password required."
      });
    }
  
    // return 401 status if the credential is not match.
    if (user.username !== req.body.username || user.password !== req.body.password) {
      return res.status(401).json({
        error: true,
        message: "Username or Password is Wrong."
      })
    }

    let current_datetime = new Date();

  let url = req.url;
  var log = correlator.getId(); // Returns the current id
  let method = req.method; 
  let status = res.statusCode
  var mess = {
    "timestamp": `${current_datetime}`,
    "URL": ` ${url}`,
    "STATUS": ` ${status}`,
    "Correlationid": `${log}`,
    "imestoritve": "[UPORABNIKI]",
    "Sporocilo": `< ${method} metoda za login > `
  }
  const message = JSON.stringify(mess);


  produce(message).then(()=>{
  console.log("login");
})




   
    // generate token
    const token = utils.generateToken(user);
    // get basic user details
    const userObj = utils.getCleanUser(user);
    // return the token along with user details
    return res.json({ user: userObj, token });
      });



  });
   
   
  router.get('/verifyToken', function (req, res) {
    // preveri
    var token = req.body.token || req.query.token;
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required."
      });
    }
    // checkne token
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) return res.status(401).json({
        error: true,
        message: "Invalid token."
      });
   
      // vrne error
      if (user._id !== req.body._id) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      }
      // detaili
      var userObj = utils.getCleanUser(user);
      return res.json({ user: userObj, token });
    });
  });
  
  /*
  router.listen(port, () => {
    console.log('Server started on: ' + port);
  });
  */
  
  /**
   * @api {delete}  /users/delete/:id Brisi uporabnika by id
   * @apiname Brisi uporabnikaBYID
   * @apiGroup Delete
   * 
   * 
   * @apiSuccess (204) message Successfully deleted
   */
  router.delete('/users/delete/:id', authenticateToken,function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });

    let current_datetime = new Date();

  let url = req.url;
  var log = "fafed73d90a73cebf6f6004"
  let method = req.method; 
  let status = res.statusCode
  
  var mess = {
    "timestamp": `${current_datetime}`,
    "URL": ` ${url}`,
    "STATUS": ` ${status}`,
    "Correlationid": `${log}`,
    "imestoritve": "[UPORABNIKI]",
    "Sporocilo": `< ${method} deleta uporabnika > `
  }
  const message = JSON.stringify(mess);

  produce(message).then(()=>{
  console.log("deleta uporabnika");
})
  });
  
  /**
   * @api {get}  /users/GetByTelefon/:telefon   Pridobi po telefonu
   * @apiname Pridobi uporabnikaBY_telefon
   * @apiGroup Get
   * 
   * 
   * @apiParam {Number} [telefon]
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "_id": "5fd8ba08fbf57e32d8e938a7",
          "username": "arr",
          "password": "arr",
          "ime": "arr",
          "priimek": "arr",
          "naslov": "arr",
          "posta": 2000,
          "telefon": 123123213,
   *     }
   */
  router.get('/users/GetByTelefon/:telefon', function (req, res) {
    User.find({telefon: req.params.telefon}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
    let current_datetime = new Date();

  let url = req.url;
  var log = "fafed73d90a73cebf6f6005"
  let method = req.method; 
  let status = res.statusCode
 
  var mess = {
    "timestamp": `${current_datetime}`,
    "URL": ` ${url}`,
    "STATUS": ` ${status}`,
    "Correlationid": `${log}`,
    "imestoritve": "[UPORABNIKI]",
    "Sporocilo": `< ${method}vrne vse uporabnike z enakim telefonom > `
  }
  const message = JSON.stringify(mess);
 
  produce(message).then(()=>{
  console.log("vrne vse uporabnike z enakim telefonom");
})
  });
  
  
  /**
   * @api {get}  /users/GetById/:id   Pridobi po id
   * @apiname Pridobi uporabnikaById
   * @apiGroup Get
   * 
   * 
   * @apiParam {Number} [ID]
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "_id": "5fd8ba08fbf57e32d8e938a7",
          "username": "arr",
          "password": "arr",
          "ime": "arr",
          "priimek": "arr",
          "naslov": "arr",
          "posta": 2000,
          "telefon": 123123213,
   *     }
   */
  router.get('/users/GetById/:id', function (req, res) {
    User.findById( req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
    let current_datetime = new Date();

  let url = req.url;
  var log = "fafed73d90a73cebf6f6006"
  let method = req.method; 
  let status = res.statusCode
  
  var mess = {
    "timestamp": `${current_datetime}`,
    "URL": ` ${url}`,
    "STATUS": ` ${status}`,
    "Correlationid": `${log}`,
    "imestoritve": "[UPORABNIKI]",
    "Sporocilo": `< ${method} metoda pridobi vse uporabnike po ID > `
  }
  const message = JSON.stringify(mess);

  produce(message).then(()=>{
  console.log("pridobi by ID");
})
  });
  
  /**
   * @api {get}  /users/GetByPosta/:posta Pridobi po  posta
   * @apiname Pridobi uporabnikaBY_Posta
   * @apiGroup Get
   * 
   * @apiParam {Number} [posta]
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "_id": "5fd8ba08fbf57e32d8e938a7",
          "username": "arr",
          "password": "arr",
          "ime": "arr",
          "priimek": "arr",
          "naslov": "arr",
          "posta": 2000,
          "telefon": 123123213,
   *     }
   */
  router.get('/users/GetByPosta/:posta', function (req, res) {
    User.find({posta: req.params.posta}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
    let current_datetime = new Date();

  let url = req.url;
  var log = "fafed73d90a73cebf6f6007"
  let method = req.method; 
  let status = res.statusCode
 
  var mess = {
    "timestamp": `${current_datetime}`,
    "URL": ` ${url}`,
    "STATUS": ` ${status}`,
    "Correlationid": `${log}`,
    "imestoritve": "[UPORABNIKI]",
    "Sporocilo": `< ${method} metoda pridobi vse uporabnike po posti > `
  }
  const message = JSON.stringify(mess);
 
  produce(message).then(()=>{
  console.log("vrne vse uporabnike z takšno pošto");
})
  });
  
  // request handlers
  router.get('/', (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
    res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
  });

module.exports = router;