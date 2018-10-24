const Environment = require('./environment')
const Lights = require('./lights')
const Controller = require('./controller')
const Interface = require('./express')
const CloudWatch = require('./cloudwatch')

const updateLighthouse = () => Lights.colour = Controller.temperatureToColour(Environment.temperature)
const updateCloudWatch = () => CloudWatch.record(Environment).catch(console.error)
const updateBrightness = () => Lights.working = Controller.workingFor(Environment.light)

Interface(Environment,Lights,Controller)

setInterval(updateLighthouse,1000)
setInterval(updateBrightness,5000)
setInterval(updateCloudWatch,60000)
