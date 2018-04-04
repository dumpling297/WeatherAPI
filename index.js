const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const remote = require('remote-json');
app.use(bodyParser.json())
//Temperature.
var globalVariableTemp;
//Scale of the temperature. Could be Celsius or Fahrenheit.
var globalVariableScale;

//Default page.
app.get('/', (req, res, next) => {
  res.send('WeatherAPI is up and running');
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
    var mydata = JSON.parse(body);
    globalVariableTemp = (mydata.main.temp);
  });
  //Hard-coded asynchronous operation.
  setTimeout(function()
  {
    //Respond 200 status code.
    res.status(200);
    //Respond weather JSON file.
    res.send(JSON.stringify({ temperature: globalVariableTemp, scale: globalVariableScale }));
  }, 600);
})

//Application port.
app.set('port', 8080)
//Show port information on console.
const server = app.listen(app.get('port'), () => {
  console.log(`Http server listener : PORT ${server.address().port}`)
})
