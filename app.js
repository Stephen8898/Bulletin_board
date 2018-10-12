// var Pool = require('pg');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:@localhost/bulletinboard');

app.set('view engine', 'ejs');
app.use(express.static('public'));

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var Messages = sequelize.define('messages', {
    title: Sequelize.TEXT,
    body: Sequelize.TEXT
});


Messages.sync().then(function(){
    
});

app.get('/index',function(req,res){
    res.render('index');
});

app.post('/', function(req,res){
        Messages.create({
            title: req.body.title,
            body: req.body.body

        });

        res.render('index');

});


app.post('/',function(req,res){

    var values = [req.body.title,req.body.body];

    if (values[0] !== '' && values[1] !== '') {
        Messages.create({
            title: values[0],
            body: values[1]
        });
    }

    res.render('index');
});

app.get("/bulletin", function(req,res){
    Messages.findAll().then(function(rows){
        var card = rows
        if(card == null){
            res.render('bulletin');
        }else {
            res.render('bulletin', {card:card});
         }
        })
        
});


app.listen(8080);
console.log('app listening on port 8080');

