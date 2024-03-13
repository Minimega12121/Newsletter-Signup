const express =  require('express');
const app=express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;

    var data = {
        members : [
            {email_address : email,
            status: "subscribed",
            merge_fields:{  FNAME : fName,
                            LNAME : lName, 
                         },
            }
        ]
    };

   var jsonData =   JSON.stringify(data);
    
    var options = {
       url : "https://us8.api.mailchimp.com/3.0/lists/a9c6288fe8",
       method : "POST",
       headers: {
        "Authorization": "architdabral1234567890@gmail.com 641257ca5b8383a8dd6b75c506158ef7-us8"
       },
       body: jsonData,
    };

    request(options,function(error,response, body){
        if (error){
            res.sendFile(__dirname+"/failure.html");
        } else{
           if(res.statusCode == 200){
            res.sendFile(__dirname+"/success.html");
           } else {
            res.sendFile(__dirname+"/failure.html");
           }
        }
    });
});

app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
    console.log("Server 3000 is running");
});

//API key
//641257ca5b8383a8dd6b75c506158ef7-us8
// List key a9c6288fe8