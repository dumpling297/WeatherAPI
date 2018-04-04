const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const remote = require('remote-json');
app.use(bodyParser.json())
//Scale of the temperature. Could be Celsius or Fahrenheit.
var globalVariableScale;
//JSON received.
var globalData;
//Default page.
app.get('/', (req, res, next) => {
  res.send('WeatherAPI is up and running!');
  next();
})

//Handling parameters.
app.get('/locations/*', (req, res, next) => {
  var zip = 'zip=' + req.params[0];
  //Gets the parameter scale.
  scale = req.query.scale;
  var units;
  if (scale == 'Celsius')
  {
    //Sets corresponding scale for requesting.
    units = '&units=metric';
    //Sets display scale for responding.
    globalVariableScale = 'Celsius';
  }
  else {
    //Sets corresponding scale for requesting.
    units = '&units=imperial'
    //Sets display scale for responding.
    globalVariableScale = 'Fahrenheit';
  }
  var api = 'http://api.openweathermap.org/data/2.5/weather?';
  var apiKey = '&APPID=33617275531e7a92cdd343cf8beccb6a';
  var request = api + zip + units + apiKey;
  //Gets remote JSON file.
  remote(request)
  .get(function (err, res, body) {
    globalData = JSON.parse(body);
  });
  //Hard-coded asynchronous operation.
  setTimeout(function()
  {
    if (globalData.cod == 200)
    {
      //Respond 200 success status code.
      res.status(200);
      //Respond weather JSON file.
      res.send(JSON.stringify({ temperature: globalData.main.temp, scale: globalVariableScale }));
    } else {
      //Respond 400 error status code.
      res.status(400);
      //Respond error message.
      res.send('WeatherAPI cannot process your query. (Invalid Zip code?)');
    }}, 600);
  })

  //Application port.
  app.set('port', 8080)
  //Show port information on console.
  const server = app.listen(app.get('port'), () => {
    console.log(`Http server listener : PORT ${server.address().port}`)
  })
