const run = require('../run');
const SOLID = "scripts/solid_colour.py"
const EventEmitter = require('events')
let instance = false;

class Lights extends EventEmitter {
	constructor(){
		super()
		this._triple = [128,128,128];
		this._brightness =  0.5;
		this.on('change',()=>{
			run(SOLID,this.state);
		});

	}

	set colour(triple){
		if(JSON.stringify(triple) !== JSON.stringify(this._triple)){
			this._triple = triple
			this.emit('change')
		}
	}

	set brightness(brightness){
		if(brightness != this._brightness){
			this._brightness = brightness
			this.emit('change')
		}
	}

	get state() {
		return [... this._triple, this._brightness]
	}
}


module.exports = new Lights()
