const PythonShell = require('python-shell');

const run = (script,args,resolver) => new Promise((resolve,reject)=>{
        PythonShell.run(script,{args:args},function(err,data){
                if(err) return reject(err)
                else {
			try {
				let fn = (resolver && typeof resolver === 'function') ? resolver : (x)=>x
				let answer = fn(data);
				resolve(answer);
			} catch(error) {
				reject(error);
			}
                }
        });
});

module.exports = run
