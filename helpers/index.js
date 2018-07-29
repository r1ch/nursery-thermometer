const colours = [
	{from:18, rgb:[0,0,255]},
	{from:28, rgb:[0,255,0]},
	{from:-1, rgb:[255,0,0]}
]


const temperatureToColour = (temperature)=>{
	for(var i = 0; i<colours.length; i++){
		if(temperature<=colours[i].from){return colours[i].rgb}
	}
	return colours[colours.length-1].rgb;
}

module.exports = {
	temperatureToColour: temperatureToColour
}
