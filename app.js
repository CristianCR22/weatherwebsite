const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded());

app.get("/", function(req, res) {
      res.sendFile(__dirname + "/index.html");
    })

app.post("/", function(req,res) {
  const query = req.body.cityName;
  const appId = "808824324fdd46d0956d306ffd09821c";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + appId;

  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const iconWeather = weatherData.weather[0].icon;
      const imgSrc = "http://openweathermap.org/img/wn/" + iconWeather + "@2x.png";
      res.write("<h1>" + "The temperature in " + query + " is " + temp + " degrees Celsius." + "</h1>");
      res.write("<p>The weather is currently " + description + ".</p>");
      res.write("<img src=" + imgSrc + ">");
      res.send();
  })
  })
})



// const query = "Salou";
// const appId = "808824324fdd46d0956d306ffd09821c";
// const units = "metric";
// const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + appId;
//
// https.get(url, function(response) {
//   console.log(response.statusCode);
//
//   response.on("data", function(data) {
//     const weatherData = JSON.parse(data);
//     const temp = weatherData.main.temp;
//     const description = weatherData.weather[0].description;
//     const iconWeather = weatherData.weather[0].icon;
//     const imgSrc = "http://openweathermap.org/img/wn/" + iconWeather + "@2x.png";
//     console.log(imgSrc);
//     res.write("<h1>" + "The temperature in Salou is " + temp + " degrees Celsius." + "</h1>");
//     res.write("<p>The weather is currently " + description + ".</p>");
//     res.write("<img src=" + imgSrc + ">");
// })
// })






app.listen(3000, function(){
  console.log("Server active on port 3000.")
})
