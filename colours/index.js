const storage = require('node-persist');

let thermometer = true;

const defaultColours = [
	{from:18, rgb:[0,0,255]},
	{from:28, rgb:[0,255,0]},
	{from:-1, rgb:[255,0,0]}
]

const nightlight = [255, 147, 41]

let colours = defaultColours;

const setup = async ()=>{
	await storage.init()
	let storedColours = await storage.getItem('colours');
	if(!storedColours || storedColours[0] === null) {
		await storage.setItem('colours',defaultColours)
		storedColours = defaultColours
	}
	colours = storedColours
}

const temperatureToColour = (temperature)=>{
	if(!thermometer) return nightlight
	for(var i = 0; i<colours.length; i++){
		if(temperature<=colours[i].from){return colours[i].rgb}
	}
	return colours[colours.length-1].rgb;
}

const setMode = (mode)=>{
	if(mode==='thermometer'){
		thermometer = true;
	} else {
		thermometer = false;
	}
}

const getColours = ()=>{
	return colours
}

const setColours = (newColours)=>{
	newColours.map(colour=>colour.from=parseInt(colour.from))
	colours = newColours
	storage.setItem('colours',colours)
}

setup();

module.exports = {
	setMode : setMode,
	getColours:getColours,
	setColours:setColours,
	temperatureToColour: temperatureToColour
}
