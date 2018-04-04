const express = require('express');
const bodyParser = require('body-parser');
const $ = require("jquery");
const app = express()
const remote = require('remote-json');
app.use(bodyParser.json())

var globalVariableScale;
var globalData;
//send a response once 'home' page is first loaded 
app.get('/', (req, res, next) => {
  res.send('WeatherAPI is up and running!');
  next();
})

//handle event of loading page 'locations'
app.get('/locations/*', (req, res, next) => {
 
  //grab the request message, which will include the form of degree (weather) 
  var zip = 'zip=' + req.params[0];
  scale = req.query.scale;
  var units;

  if (scale == 'Celsius')
  {
     units = '&units=metric';
     globalVariableScale = 'Celsius';
  }
  else {
     units = '&units=imperial'
     globalVariableScale = 'Fahrenheit';
  }
  var api = 'http://api.openweathermap.org/data/2.5/weather?';
  var apiKey = '&APPID=33617275531e7a92cdd343cf8beccb6a';
  var request = api + zip + units + apiKey;

  remote(request)
  .get(function (err, res, body) {
    //grab the temperature value
    globalData = JSON.parse(body);
  });
  setTimeout(function()
  {
    if (globalData.cod == 200)
    {
      //respond with the two values in loop of the given interval 
      res.status(200);
      res.send(JSON.stringify({ temperature: globalData.main.temp, scale: globalVariableScale }));
    } else {
      //respond with error messages.
      res.status(400);
      res.send('WeatherAPI cannot process your query. (Invalid Zip code?)');
    }}, 600);
  })

//setting the port of the application
  app.set('port', 8080)
  const server = app.listen(app.get('port'), () => {
    console.log(`Http server listener : PORT ${server.address().port}`)
  })
