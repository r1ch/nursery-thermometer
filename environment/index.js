const run=require('../run')
const SCRIPT = "scripts/all.py";
const EVERY = 1000;
const FACTOR = 1.1;
const pi = require('node-raspi');

class Environment {

	constructor(){
		this._reading = null
		this.ID = Date.now()+Math.random();
		this.read();
		this.interval = setInterval(()=>this.read(),EVERY)
	}

	read(){
		run(SCRIPT,{},(data)=>{
			let parsed = JSON.parse(data[0])
			this._reading = {
				temperature : calibrate(parsed.temperature),
				pressure : parsed.pressure,
				light: parsed.light
			}
		});
	}

	get reading(){
		return this._reading
	}

	get temperature(){
		return this._reading.temperature
	}

	get light(){
		return this._reading.light
	}

}

const calibrate = (temp)=>{
	return temp - ((pi.getThrm() - temp) / FACTOR);
}

const instance = new Environment();

module.exports = instance
