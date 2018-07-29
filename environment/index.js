const run=require('../run')
const SCRIPT = "scripts/all.py";

let latestReading;

const newReading = () =>run(SCRIPT,{},(data)=>{
	latestReading = {
		temperature : data[0],
		pressure : data[1],
		light: data[2]
	}
	return latestReading;
})

const getReading = () => latestReading;

module.exports = {
	newReading:newReading,
	getReading:getReading
}

