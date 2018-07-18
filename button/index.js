const EventEmitter = require('events');
const Gpio = require('onoff').Gpio;
const PIN = 22;

class Button extends EventEmitter {
	constructor(){
		super();
		this.button=new Gpio(PIN, 'in', 'both', {debounceTimeout: 100});
		this.button.watch((err,value)=>{
			if(err) throw err;
			else {
				this.emit('press',value===1);
			}
		});
	}
}

module.exports = Button
