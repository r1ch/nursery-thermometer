const express    = require('express');
const https 	 = require('https');
const fs 	 = require('fs');
const app        = express();
const bodyParser = require('body-parser');
const port = 80
const portSecure = 443


let key = fs.readFileSync(__dirname + '/selfsigned.key');
let cert = fs.readFileSync(__dirname + '/selfsigned.crt');
let options = {
  key: key,
  cert: cert
};

let Environment
let Lights
let Controller

const setup = (environment,lights,controller) => {
	Environment = environment;
	Lights = lights;
	Controller = controller;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))


const router = express.Router();

router.get('/environment', function(req, res) {
    res.json(Environment.reading);
});

router.get('/colours', function(req, res) {
    res.json(Controller.colours);
});

router.post('/colours', function(req, res) {
    Controller.colours = req.body
    res.status(201).end()
});

router.get('/auto', function(req, res) {
    res.json(!!Controller.auto);
});

router.post('/auto', function(req, res) {
    Controller.auto = req.body.auto
    res.status(201).end()
});

router.get('/mode', function(req, res) {
    res.json(Controller.mode);
});

router.post('/mode', function(req, res) {
   Controller.mode = req.body.mode
   res.status(201).end()
});

router.get('/brightness', function(req, res) {
    res.json(Lights.brightness);
});

router.post('/brightness', function(req, res) {
    Lights.brightness = req.body.brightness
    res.status(201).end()
});

router.get('/state', function(req, res) {
    res.json(Lights.state);
});

router.get('/colourMap', function(req, res){
	res.json(Controller.colourMap)
})

app.use('/api', router);

app.listen(port);

let server = https.createServer(options,app)

server.listen(portSecure, ()=>{})

module.exports = setup


