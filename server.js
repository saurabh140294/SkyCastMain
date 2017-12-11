var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var api = require('./api');
var express = require('express');



const server = express();

server.use(sassMiddleware({
	src: path.join(__dirname, 'sass'),
	dest: path.join(__dirname, 'public')
}));

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
  res.render('index', {
  })
});

server.get('/getweather', (req, res) => {
  //console.log("/getweather called");
  
  var lat = req.query.latitude;
  var lng  = req.query.longitude;
  
  api.getCurrentWeather(lat,lng)
  .then((resp)=>{
  		//console.log("/getweather resp=" + JSON.stringify(resp.currently));
  		return res.json(resp);
  		//resp.currently;
  	});

  //console.log("/getweather resp= " + JSON.stringify(api.getCurrentWeather(lat,lng)));
  //res.json(api.getCurrentWeather(lat,lng));
});

server.get('/getweatherhist', (req, res) => {
  //console.log("/getweather called");
  
  var lat = req.query.latitude;
  var lng  = req.query.longitude;
  var oldtime = req.query.time;

  api.getCurrentWeatherHist(lat,lng,oldtime)
  .then((resp)=>{
      //console.log("/getweather resp=" + JSON.stringify(resp.currently));
      return res.json(resp);
      //resp.currently;
    });

  //console.log("/getweather resp= " + JSON.stringify(api.getCurrentWeather(lat,lng)));
  //res.json(api.getCurrentWeather(lat,lng));
});

//server.use('/api', darkapi);

server.use(express.static("public"));

server.listen(process.env.PORT || 8080, () => {
  console.info('Express listening on port');
});
