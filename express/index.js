const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

let Environment
let Lights

const setup = (environment,lights) => {
	Environment = environment;
	Lights = lights;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

const port = 8080

const router = express.Router();

router.get('/environment', function(req, res) {
    res.json(Environment.getReading());
});

app.use('/api', router);

app.listen(port);
console.log('API is up');




module.exports = setup
