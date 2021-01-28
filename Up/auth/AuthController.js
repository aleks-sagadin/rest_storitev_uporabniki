var express = require('express');
var route = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('./VertifyToken');

router.use(bodyParser.urlencoded({ extend: false }));

router.use(bodyParser.json());

var User = require('../routes/Uporabnik');

/**
 * Konfiguracija JWT
 */

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypts');
var config = require('../config'); // pridobimo config dat.
const router = require('../routes/uporabniki');
const Uporabnik = require('../models/uporabnik');

//LOGIN
router.post('/login', function (req, res) {
    Uporabnik.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error na strezniku.');
        if (!user) return res.status(404).send('Uporabnik ni najden.');
    
    //preverimo ce je geslo pravilno
    var gesloPravilno = bcrypt.compareSync(req.body.geslo, uporabnik.geslo);
    if(!gesloPravilno) return res.status(401).send({auth:false, token: null});

    //ce je pravilno oboje
    //naredi se token
    var token = jwt.sign({id:user._id},config.secret,{
        //"iat": 1516239022,
        expiresIn:1616239022 //21 marec 2021
        });

        res.status(200).send({auth:true, token:true});
    });


}); 

//logout
router.get('/logout',function(req,res){
res.status(200).send({auth:false,token:null});
});

//REGISTER

router.post('/register',function(req,res){
    var hashedPassword = bcrypt.hashSync(req.body.geslo,8);

    Uporabnik.create({
        email: req.body.email,
        geslo: hashedPassword,
        ime: req.body.ime,
        priimek: req.body.priimek,
        naslov: req.body.naslov,
        posta: req.body.posta,
        telefon: req.body.telefon,
        statusStudenta: req.body.statusStudenta,

    },
    function(err,uporabnik){

        if(err) return res.status(500).send("Problem pri registraciji");
   
            //ce se registrira brez tezav
            //kreira token
        var token = jwt.sign({_id: uporabnik._id},config.secret,{

            expiresIn:1616239022 // 18 marec 2021
        });
    
        res.status(200).send({ auth: true, token: token });
    
    });

});



router.get('/me',VerifyToken, function(req,res,next){

    Uporabnik.findById(req.userId, { password: 0 }, function (err, uporabnik) {
        if (err) return res.status(500).send("Problem z iskanjem uporabnika");
        if (!uporabnik) return res.status(404).send("Ni najdlo uporabnika.");
        res.status(200).send(uporabnik);
      });
});

