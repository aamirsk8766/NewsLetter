const express=require('express');
const BodyParser=require('body-parser');
const bodyParser = require('body-parser');
const app=express();
const https=require("https");
const { url } = require('inspector');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.get('/',function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
  const firstname=req.body.fname
  const lastname=req.body.lname
  const email=req.body.email

  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME:lastname
        }
      }
    ]
  }

  const jasonData=JSON.stringify(data);


  const url="https://us11.api.mailchimp.com/3.0/lists/25c021f761"
  
  const Option={
    method:"POST",
    auth:"aamir2:ab9437e27750ee48fff9c963330e3566-us11"
  }

  const request=https.request(url,Option,function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html")
    }else{
      res.sendFile(__dirname+"/failure.html")
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
request.write(jasonData);
request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(3000,function(){
    console.log("port is running on 3000");
}); 

// api key
// ab9437e27750ee48fff9c963330e3566-us11
// audience id 
// 25c021f761.