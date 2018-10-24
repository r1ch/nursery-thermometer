const run=require('../run')
const SCRIPT = "scripts/all.py";
const EVERY = 1000;


class Environment {

	constructor(){
		this._reading = null
		this.ID = Date.now()+Math.random();
		this.read();
		this.interval = setInterval(()=>this.read(),EVERY)
	}

	read(){
		run(SCRIPT,{},(data)=>{
			this._reading = {
				temperature : parseFloat(data[0])-1.2,
				pressure : parseFloat(data[1]),
				light: parseFloat(data[2])
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

const instance = new Environment();

module.exports = instance
