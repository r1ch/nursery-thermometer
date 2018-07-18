const PythonShell = require('python-shell');
const SCRIPT = "scripts/all.py";

const read = () => new Promise((resolve,reject)=>{
	PythonShell.run(SCRIPT,{},function(err,data){
		if(err) return reject(err)
		else {
			let answer = {
				temperature : data[0],
				pressure : data[1],
				light: data[2]
			}
			return resolve(answer)
		}
	})
});

module.exports = read;

