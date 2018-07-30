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
		this._working = true;
	}

	set colour(triple){
		if(JSON.stringify(triple) !== JSON.stringify(this._triple)){
			this._triple = triple
			this.emit('change')
		}
	}

	get colour(){
		return this._triple
	}

	set brightness(brightness){
		if(brightness != this._brightness){
			this._brightness = brightness
			this.emit('change')
		}
	}

	get brightness(){
		return this._brightness
	}

	set state(state){
		let brightness = state.pop();
		let triple = state;
		if(brightness != this._brightness || triple != this._triple){
			this._brightness = brightness
			this._triple = triple
			this.emit('change')
		}
	}

	get state() {
		return [... this._triple, this._brightness*this._working]
	}

	set working(working){
		this._working = working;
		this.emit('change')
	}

	get working(){
		return this._working;
	}

}


module.exports = new Lights()
