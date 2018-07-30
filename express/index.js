const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const port = 80


let Environment
let Lights
let Colours

const setup = (environment,lights,colours) => {
	Environment = environment;
	Lights = lights;
	Colours = colours
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))


const router = express.Router();

router.get('/environment', function(req, res) {
    res.json(Environment.getReading());
});

router.get('/colours', function(req, res) {
    res.json(Colours.getColours());
});

router.post('/colours', function(req, res) {
    Colours.setColours(req.body)
    res.status(201).end()
});

router.get('/brightness', function(req, res) {
    res.json(Lights.state[3]);
});

router.post('/brightness', function(req, res) {
    Lights.brightness = req.body.brightness
    res.status(201).end()
});

router.post('/nightlight', function(req, res) {
   Colours.setMode('nightlight')
   res.status(201).end()
});

router.post('/thermometer', function(req, res) {
   Colours.setMode('thermometer')
   res.status(201).end()
});

app.use('/api', router);

app.listen(port);

module.exports = setup
