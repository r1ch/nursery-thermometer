const EventEmitter = require('events');
const storage = require('node-persist');

const defaultColours = [
	{from:18, rgb:[0,0,255]},
	{from:28, rgb:[0,255,0]},
	{rgb:[255,0,0]}
]

const nightlightColours = [
	{rgb:[255,214,170]}
]

const DARK = 500;


class Controller extends EventEmitter {

	constructor(){
		super();
		this._colours = {
			thermometer:defaultColours,
			nightlight:nightlightColours
		}
		this._mode = 'thermometer'
		this._auto = false;
		this._stored = false;
		this.load();
		this.on('save',this.save);
	}

	async load(){
		await storage.init()
		this._stored = await storage.getItem('state');
		console.log(this._stored)
		if(!this._stored || !this._stored.colours) {
			await storage.setItem('state',{
				auto: false,
				colours: defaultColours
			})
		} else {
			this._colours.thermometer = this._stored.colours
			this._auto = this._stored.auto
		}
	}

	async save(){
		this._stored.colours = this._colours.thermometer
		this._stored.auto = this._auto
		await storage.setItem('state',this._stored)
		console.log(this._stored)
	}

	temperatureToColour(temperature){
		for(var i = 0; i < this._colours[this._mode].length && this._colours[this._mode][i].from ; i++){
			if(temperature<=this._colours[this._mode][i].from){return this._colours[this._mode][i].rgb}
		}
		return this._colours[this._mode][this._colours[this._mode].length-1].rgb;
	}

	workingFor(light){
		return !this._auto || light < DARK;
	}

	set mode(mode){
		if(this._colours[mode]) this._mode = mode;
	}

	get mode(){
		return this._mode
	}

	get colours(){
		return this._colours.thermometer
	}

	set colours(colours){
		colours.map(colour=>colour.from=(colour.from?parseInt(colour.from):false))
		this._colours.thermometer = colours
		storage.setItem('colours',colours)
		this.emit('save')
	}

	get auto(){
		return this._auto
	}

	set auto(auto){
		this._auto = auto
		this.emit('save');
	}
}

module.exports = new Controller()
