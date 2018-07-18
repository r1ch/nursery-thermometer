const Environment = require('./environment')
const Button = require('./button')
var reading = Environment()
var button = new Button()

reading.then(console.log)
button.on('press',console.log)
