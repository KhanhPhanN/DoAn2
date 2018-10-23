var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname ,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
var expressValidator = require('express-validator');
app.use(expressValidator( { errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;

  while(namespace.length) {
    formParam += '[' + namespace.shift() + ']';
  }
  return {
    param : formParam,
    msg   : msg,
    value : value
  };
}
}));
app.use(function(req,res,next){
        res.locals.errors = null;
        res.locals.user = req.user || null;
        res.locals.mail = req.mail || null;
        
        next();
    });
var server  = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
io.on("connection",function(socket){
console.log("Ket noi thanh cong ...")
socket.on("thong-tin", function(){
    
})

})
app.post('/register/account', function (req, res) {
	var name = req.body.username;
	var email = req.body.email;
	var password = req.body.user_password_1;
	var password2 = req.body.user_password_2;

	// Validation
	req.checkBody('name', 'User Name is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.user_password_2);
    req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();

	var errors = req.validationErrors();
	if (errors) {
		res.render('register', {
			errors: errors
		});
    }else {
	     res.render("login")
	}
    
});
var result1=0;
app.get("/", function(req,res){ 
    var current = new Date();
    result1 = null;
res.render("lich",{
    user: result1,
ngay : current.getDate(),
thang : current.getMonth()+1,
nam: current.getFullYear()
});
})
app.get("/login/account",function(req,res){
res.render("login")
})
app.get("/register",function(req,res){
    res.render("signup")
    })


    var dataclient ;
    var datarev ;
    var title ;
    var describle ;
    var time;
    var time_start ;
    var time_end  ;
    var full ;
    var day ;
    var month;
    var year;
    var colorSinhnhat="blue";
    var colorCuochop="rgb(93,219,55)";
    var colorNhacnho="rgb(195,236,98)";



app.get("/:id", function(req,res){
    var url = req.params.id;
    var MongoClient = require('mongodb').MongoClient;
var urldata = "mongodb://localhost:27017/";

MongoClient.connect(urldata, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Calendar");
  dbo.collection("EventCalendar").find({}).toArray(function(err, result) {
    if (err) throw err;
    var current = new Date();
    var data = url.split("-");
    res.render("ChiTiet",{
        user: result1,
        work : result,
        ngay : data[0],
        thang: data[1],
        nam  : data[2],
        ngay1 : current.getDate(),
thang1 : current.getMonth()+1,
nam1: current.getFullYear(),
colorSinhnhat : colorSinhnhat,
colorCuochop: colorCuochop,
colorNhacnho: colorNhacnho
    });


    db.close();
  });
});
 
    });

    app.post("/save", function(req,res){
   
    dataclient = req.body.data;
    datarev = dataclient.split("/");
    title = datarev[0];
    describle = datarev[1];
    time = datarev[2].split("-");
    time_start = time[0];
    time_end   = time[1];
    full = datarev[3].split("-");
    day = full[0];
    month = full[1];
    year = full[2];
    colorSinhnhat = datarev[4];
    colorCuochop = datarev[5];
    colorNhacnho = datarev[6];
    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Calendar");
  var myobj = { account: result1[0].account, time_start: time_start, time_end: time_end, day: day, month: month, year: year, describle: describle };
  dbo.collection("EventCalendar").insertOne(myobj, function(err, res) {
    if (err) throw err;
  });
  dbo.collection("EventCalendar").find().toArray(function(err,kq){
    res.render("lich1",{
        user: result1,
        work: kq,
        ngay : day,
        thang : month,
        nam : year,
        title: title,
        describle: describle,
        time: time_start+'-'+time_end,
        colorSinhnhat : colorSinhnhat,
        colorCuochop: colorCuochop,
        colorNhacnho: colorNhacnho
    });

    db.close();
  })
});
  
    })
         app.post("/login",function(req,res){
             var user_name = req.body.user_name;
             var password = req.body.user_password; 
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db("Calendar");
              var query = {account: user_name, password: password};
              dbo.collection("User ").find(query).toArray( function(err, result) {
                if (err) throw err;
                result1 = result;
                dbo.collection("EventCalendar").find({}).toArray(function(err1, event ){
                    if(result.length==1){
                        var current = new Date();
                        console.log(event);
    res.render("lich",{
        user: result,
        work: event,
    ngay : current.getDate(),
    thang : current.getMonth()+1,
    nam: current.getFullYear()})
                    }else{
                        res.render('login');
                    }


                })
 
                db.close();
              });
            });

         })