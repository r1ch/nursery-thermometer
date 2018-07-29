const Environment = require('./environment')
const Lights = require('./lights')
const Colours = require('./colours')
const Interface = require('./express')
const CloudWatch = require('./cloudwatch')

const setColour = (reading) => Lights.colour = Colours.temperatureToColour(reading.temperature)
const updateLighthouse = () => Environment.newReading().then(setColour)
const updateCloudWatch = () => CloudWatch.record(Environment.getReading())

Interface(Environment,Lights,Colours)

setInterval(updateLighthouse,1000)
setInterval(updateCloudWatch,60000)
