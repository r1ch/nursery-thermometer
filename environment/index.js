const Shell = require('python-shell');
const SCRIPT = "script.py";
const FACTOR = 10;
const pi = require('node-raspi');

class Environment {

	constructor(){
		this._reading = {}
		this.ID = Date.now()+Math.random();
		this.shell = false;
		this.start();
	}

	start(){
		console.log("Staring Env")
		this.shell = new Shell(SCRIPT, {scriptPath: __dirname});
		this.shell.on('message',(message)=>{
			console.log("Message")
			console.log(message)
			const parsed =JSON.parse(message.replace(/'/g,'"'));
			this._reading = {
				temperature : calibrate(parsed.temperature),
				pressure : parsed.pressure,
				light: parsed.light
			}
		})
	        this.shell.on('error',error=>console.error)
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
