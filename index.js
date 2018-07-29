const Environment = require('./environment')
const Lights = require('./lights')
const Helpers = require('./helpers')
const Interface = require('./express')

const setColour = (reading) => Lights.colour = Helpers.temperatureToColour(reading.temperature)
const updateLighthouse = () => Environment.newReading().then(setColour)


Interface(Environment,Lights)

setInterval(updateLighthouse,1000)
