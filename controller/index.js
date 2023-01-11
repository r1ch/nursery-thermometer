const EventEmitter = require('events');
const storage = require('node-persist');

const defaultColours = [
	{rgb:[0,0,255], from: 18},
	{rgb:[0,255,0], from: 25},
	{rgb:[255,0,0]}
]
//who the fuck wrote from, surely to? utterly to, not from
const nightlightColours = [
	{rgb:[255,40,0], from: 7.0},//red
	{rgb:[10,255,40], from: 9.5},//green
	{rgb:[252,237,184], from: 19},//ultrawarm
	{rgb:[255,40,0]}//red
]

//reWrite nightlight RED time - should be 0700 on Mon, Tues and  0730 other days

const nightlightChanger = setInterval(()=>{
	//Sunday:	0
	//Monday:	1
	//Tuesday:	2
	//Wednesday:	3
	//Thursday:	4
	//Friday:	5
	//Saturday:	6
	let day = (new Date).getDay()
	if([0,1,2,6].includes(day)) nightlightColours[0].from = 7.25
	else nightlightColours[0].from = 7.0
},1000*60*60)

const DARK = 300;


class Controller extends EventEmitter {

	constructor(){
		super();
		this._colours = {
			thermometer:defaultColours,
			nightlight:nightlightColours
		}
		this._mode = 'nightlight'
		this._auto = false;
		this._stored = false;
		this.load();
		this.on('save',this.save);
	}

	async load(){
		await storage.init()
		this._stored = await storage.getItem('state');
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
	}

	temperatureToColour(temperature){
		let needle = this._mode == 'thermometer' ? temperature : (new Date()).getHours() + (new Date()).getMinutes()/60
		let haystack = this._colours[this._mode];
		return haystack.find(item=>(!item.from || item.from > needle)).rgb
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
	
	get colourMap(){
		return JSON.stringify(this._colours)
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
