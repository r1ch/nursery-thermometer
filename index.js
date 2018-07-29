const Environment = require('./environment')
const Lights = require('./lights')
const Colours = require('./colours')
const Interface = require('./express')

const setColour = (reading) => Lights.colour = Colours.temperatureToColour(reading.temperature)
const updateLighthouse = () => Environment.newReading().then(setColour)


Interface(Environment,Lights,Colours)

setInterval(updateLighthouse,1000)
