/**
 * Created by user on 03.08.2015.
 */
var express = require('express');
var app = express();
var path =require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;
var MongoStore = require('connect-mongo')(session);

var db = new Db ('tutor',
    new Server('localhost',27017,{safe:true}, {auto_reconnect:true},{})
);
db.open(function(){
    console.log("Mongo connection is oppened");
    db.collection('notes',function(error,notes){
        db.notes = notes;
    });
    db.collection('sections', function(error, sections) {
        db.sections = sections;
    });
    db.collection('users',function(error, users) {
        db.users = users;
    });

});
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
    store: new MongoStore({
        url:'mongodb://localhost:27017/angular_session'
    }),
    secret:"ang8",
    resave: true,
    saveUninitialized: true
}));


// Notes endpoints
app.get("/notes",function(req,res){
    var query = setUser(req, req.query);
    db.notes.find(query).sort({order:-1}).toArray(function(error,items){
        res.send(items);
    });
});

app.post("/notes", function(req,res){
    var query = setUser(req, req.body);
    db.notes.insert(query);
    res.end();
});

app.delete("/notes", function(req,res){
    var id = new ObjectID(req.query.id);
   db.notes.remove({_id:id},function(err){
       if(err){
           console.log(err);
       }
       else{
           res.send("Success");
       }
   });
});

// Sections endpoints
app.get("/sections", function(req,res) {
    var userName = req.session.userName || "demo";
    db.users.find({userName:userName})
        .toArray(function(err, items) {
            var user = items[0];
            res.send(user.sections);
        });
});

app.post("/sections/replace", function(req,res) {
    var userName = req.session.userName || "demo";
    db.users.update({userName:userName},
        {$set:{sections:req.body}},
        function() {
            res.end();
        });
});

app.post("/users", function(req,resp){
    db.users.insert(req.body,function(err,res){
        req.session.userName = req.body.userName;
        resp.end();
    });
});

app.get("/checkUser", function(req,resp) {
    db.users.find({userName:req.query.user}).toArray(function(err,items){
        if(err) console.log(err);
            if(items[0]) {
                resp.send(false);
            }
            else{
                resp.send(true);
            }
    });

});

app.post("/login", function(req,res){
    db.users.find(
        {
            userName : req.body.login,
            password : req.body.password
        }
    ).toArray(function(err,items){
         res.send(items.length>0);
    });
});



function setUser(req, query) {
    var userName = req.session.userName || "demo";
    query.userName = userName;
    return query;
}

app.listen(3000);
