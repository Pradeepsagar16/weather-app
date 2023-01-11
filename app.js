const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
        });
        app.post("/", function(req, res){
           
     const query = req.body.cityName;
    const appkey = "3a1b452aa6e5e9ccf062f80ef97e94c4";
    const unit = "metric";
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit+"&appid=" + appkey ;

    https.get(weatherURL , function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";

          
            res.write("<p> The weather is currently " + weatherDescription  + "</P>");
            res.write("<h1> The temperature in "+ query +" is " + temp + " degrees Celcius.</h1>");
            res.write("<img src= "+ imageURL +">");
            res.send();
        })
    });

   
});

app.listen(3000, function(){
    console.log("Server is running on port 3000!");
});