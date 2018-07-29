const AWS = require('aws-sdk')
AWS.config.loadFromPath('./cloudwatch/config.json');
const cloudWatch =  new AWS.CloudWatch();

const cloudWatchPut = (reading)=>{
    return new Promise((resolve,reject)=>{
        let params = {
            MetricData: [{
                MetricName: 'temperature',
                StorageResolution: 60,
                Timestamp: new Date(),
                Value: reading.temperature
            }],
            Namespace: 'lighthouse'
        };
        cloudWatch.putMetricData(params, function(err, data) {
          if (err) return reject(err) // an error occurred
          return resolve(data)         // successful response
        });
    })
}

module.exports =  {
	record : cloudWatchPut
}
