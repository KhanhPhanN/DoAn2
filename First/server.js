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
	if (name==""||email==""||password==""||password2=="") {
		res.render('register', {
			errors: [{msg: "Bạn nhập thiếu dữ liệu"}]
		});
    }else{
    if(password!=password2){
        res.render('register', {
			errors: [{msg: "Mật khẩu không khớp"}]
		});
    }
    else {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("Calendar");
          var query = {account: name, password: password, gmail: email,colorSinhNhat: "blue",colorCuocHop: "green",colorNhacNho:"yellow"};
          dbo.collection("User ").findOne({account: name},function(err, result) {
            if (err) throw err;
            if(result){

                res.render('register', {
                    errors: [{msg: "Tài khoản đã tồn tại"}]
                });

            }else{

                dbo.collection("User ").insertOne(query,function(err, result) {
                    if (err) throw err;
                  })

                  res.render("login")
            }
          })
        })
	}
}
});
var result1=0;
app.get("/", function(req,res){ 
    var current = new Date();
    resultcolorstart = [{colorSinhNhat:"blue",colorCuocHop: "green", colorNhacNho: "yellow"}];
    result1=0
res.render("lich",{
    user1: resultcolorstart,
    user : result1,
ngay : current.getDate(),
thang : current.getMonth()+1,
nam: current.getFullYear(),
colorSinhnhat: "blue",
colorCuochop: "green",
colorNhacnho: "yellow"
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

var userN ="";

app.get("/:id", function(req,res){
    var url = req.params.id;
    var MongoClient = require('mongodb').MongoClient;
var urldata = "mongodb://localhost:27017/";
var data = url.split("-");
MongoClient.connect(urldata, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Calendar");
  dbo.collection("EventCalendar").find({account: userN,day: data[0], month: data[1], year: data[2]}).toArray(function(err, event) {
    if (err) throw err;
    var current = new Date();
    for(var i=0;i<event.length;i++)
    {
        for(var j=i+1;j<event.length;j++)
        {
            if(event[i].time_start>event[j].time_start)
               {

                var temp;
               temp=event[i];
               event[i]=event[j];
               event[j]=temp;
               }
        }
    }
    if(!result1){
        res.render("ChiTiet",{
            user: result1,
            work : event,
            ngay : data[0],
            thang: data[1],
            nam  : data[2],
            ngay1 : current.getDate(),
    thang1 : current.getMonth()+1,
    nam1: current.getFullYear(),
    colorSinhnhat : colorSinhnhat,
    colorCuochop: colorCuochop,
    colorNhacnho: colorNhacnho, 
        });

    }else{

dbo.collection("User ").find({account: userN}).toArray(function(err, resultName){

if(err) throw err;

db.close();
res.render("ChiTiet",{
    user: resultName,
    work : event,
    ngay : data[0],
    thang: data[1],
    nam  : data[2],
    ngay1 : current.getDate(),
thang1 : current.getMonth()+1,
nam1: current.getFullYear(),
colorSinhnhat : resultName[0].colorSinhNhat,
colorCuochop: resultName[0].colorCuocHop,
colorNhacnho: resultName[0].colorNhacNho, 
});

})


    }
  


  });
});
 
    });

    app.post("/save", function(req,res2){
    dataclient = req.body.data;
    datarev = dataclient.split("/");
    title = datarev[0];
    describle = datarev[1];
    time = datarev[2].split("-");
    time_start =parseInt(time[0]);
    time_end   = parseInt(time[1]);
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
  var acc = {account: result1[0].account};
  var color = {$set: {colorSinhNhat: colorSinhnhat,colorCuocHop: colorCuochop, colorNhacNho: colorNhacnho}};
  dbo.collection("User ").updateOne(acc,color,function(err,res){
      if(err) throw err;
  })
  var myobj  = { account: result1[0].account, title: title, time_start: time_start, time_end: time_end, day: day, month: month, year: year, describle: describle };
  var myobj1 = {$set: {title: title,describle: describle }};
  var where  = { account: result1[0].account, time_start: time_start, time_end: time_end, day: day, month: month, year: year}
  dbo.collection("EventCalendar").findOne(where,function(err ,result){
if(err) throw err;
dbo.collection("User ").find({account: userN}).toArray(function (err,res1) {
    if(!result){
        dbo.collection("EventCalendar").insertOne(myobj, function(err, res) {
            if (err) throw err;
            dbo.collection("EventCalendar").find({account: userN,day: day, month: month, year: year}).toArray(function(err,event){
                for(var i=0;i<event.length;i++)
                {
                    for(var j=i+1;j<event.length;j++)
                    {
                        if(event[i].time_start>event[j].time_start)
                           {

                            var temp;
                           temp=event[i];
                           event[i]=event[j];
                           event[j]=temp;
                           }
                    }
                }
               
                res2.render("lich1",{
                    user: res1,
                    work: event,
                    ngay : day,
                    thang : month,
                    nam : year,
                    colorSinhnhat: res1[0].colorSinhNhat,
                    colorCuochop: res1[0].colorCuocHop,
                    colorNhacnho: res1[0].colorNhacNho,
                });
                db.close();
              })
          });
  
    
    
    }else{
        
        dbo.collection("EventCalendar").updateOne(where,myobj1, function(err, res) {
            if (err) throw err;
            dbo.collection("EventCalendar").find({account: userN,day: day, month: month, year: year}).toArray(function(err,event){
                for(var i=0;i<event.length;i++)
                {
                    for(var j=i+1;j<event.length;j++)
                    {
                        if(event[i].time_start>event[j].time_start)
                           {

                            var temp;
                           temp=event[i];
                           event[i]=event[j];
                           event[j]=temp;
                           }
                    }
                }

                res2.render("lich1",{
                    user: res1,
                    work: event,
                    ngay : day,
                    thang : month,
                    nam : year,
                    colorSinhnhat : res1[0].colorSinhNhat,
                    colorCuochop: res1[0].colorCuocHop,
                    colorNhacnho: res1[0].colorNhacNho,
                });
                db.close();
              })
          });
    
        
    }


})




  })
 
});
  
    })
app.post("/delete",function(req,res){
   var dataclientd = req.body.data1;
   var datarevd = dataclientd.split("/");
   var titled = datarevd[0];
   var describled = datarevd[1];
   var timed = datarevd[2].split("-");
   var time_startd =parseInt(timed[0]);
   var time_endd   = parseInt(timed[1]);
   var fulld = datarevd[3].split("-");
   var dayd = fulld[0];
   var monthd = fulld[1];
   var yeard = fulld[2];
   var colorSinhnhatd = datarevd[4];
   var colorCuochopd = datarevd[5];
   var colorNhacnhod = datarevd[6];

   var MongoClient = require('mongodb').MongoClient;
   var url = "mongodb://localhost:27017/";
   
   MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     var dbo = db.db("Calendar");
     var myquery = { account: userN,day: dayd,month: monthd, year: yeard, time_start: time_startd,time_end: time_endd };
     dbo.collection("EventCalendar").deleteOne(myquery, function(err, obj) {
       if (err) throw err;
       console.log("1 document deleted");

     });
     dbo.collection("User ").find({account: userN}).toArray(function(err, info){

        dbo.collection("EventCalendar").find({account: userN,day: dayd, month: monthd, year: yeard}).toArray(function(err,event){
            for(var i=0;i<event.length;i++)
            {
                for(var j=i+1;j<event.length;j++)
                {
                    if(event[i].time_start>event[j].time_start)
                       {

                        var temp;
                       temp=event[i];
                       event[i]=event[j];
                       event[j]=temp;
                       }
                }
            }
            res.render("lich1",{
                user: info,
                work: event,
                ngay : dayd,
                thang : monthd,
                nam : yeard,
                title: titled,
                describle: describled,
                time: time_start+'-'+time_endd,
                colorSinhnhat : info[0].colorSinhNhat,
                colorCuochop: info[0].colorCuocHop,
                colorNhacnho: info[0].colorNhacNho,
            });
        
            db.close();
          })


     })

   });


})

         app.post("/login",function(req,res){
             var user_name = req.body.user_name;
             var password = req.body.user_password; 
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            var current = new Date();
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db("Calendar");
              var query = {account: user_name, password: password};
              var dk={account: user_name,day: String(current.getDate()), month: String(current.getMonth()+1), year: String(current.getFullYear())}
              dbo.collection("User ").find(query).toArray( function(err, result) {
                if (err) throw err;
                userN = user_name;
                result1 = result;
                dbo.collection("EventCalendar").find(dk).toArray(function(err1, event ){
                    if(result.length==1){
                        var color = [{colorSinhNhat: result[0].colorSinhNhat,colorCuocHop: result[0].colorCuocHop,colorNhacNho: result[0].colorNhacNho}]
                        for(var i=0;i<event.length;i++)
                        {
                            for(var j=i+1;j<event.length;j++)
                            {
                                if(event[i].time_start>event[j].time_start)
                                   {

                                    var temp;
                                   temp=event[i];
                                   event[i]=event[j];
                                   event[j]=temp;
                                   }
                            }
                        }
                        console.log(event)
    res.render("lich",{
        user: result,
        user1: color,
        work: event,
    ngay : current.getDate(),
    thang : current.getMonth()+1,
    nam: current.getFullYear(),
    colorSinhnhat : result[0].colorSinhNhat,
    colorCuochop: result[0].colorCuocHop,
    colorNhacnho: result[0].colorNhacNho,
    })
                    }else{
                        res.render('login');
                    }


                })
 
                db.close();
              });
            });

         })