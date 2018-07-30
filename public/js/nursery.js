angular.module('nurseryApp', [])
  .controller('NurseryController', function($scope,$http,$interval) {
	var getTemperature = ()=>{
		$http.get('/api/environment')
		.then(
		(success)=>{
			$scope.temperature = Number(success.data.temperature).toFixed(1)
			if($scope.colours){
				if($scope.temperature<$scope.colours[0].from){
					$scope.temperatureClass='light-blue'
				} else if ($scope.temperature<$scope.colours[1].from){
					$scope.temperatureClass='green'
				} else {
					$scope.temperatureClass='red'
				}
			}
		},
		(failure)=>{
			$scope.error = failure
		})
	}

	var startColourSlider = (slider)=>{
		$http.get('/api/colours')
		.then(
		(success)=>{
			$scope.colours = success.data
			makeSlider(slider,success.data[0].from,success.data[1].from)
			slider.noUiSlider.on('set',setColourSlider)
		},
		(error)=>{
			$scope.error = error
		})
	}

	var setColourSlider = (event)=>{
		$scope.colours[0].from = parseInt(event[0])
		$scope.colours[1].from = parseInt(event[1])
		$http.post('/api/colours',$scope.colours)
		.then(
		(success)=>{
		},
		(failure)=>{
		})
	}

	var startBrightnessSlider = (slider)=>{
		$http.get('/api/brightness')
		.then(
		(success)=>{
			$scope.brightness = 100*success.data
		},
		(failure)=>{
			$scope.error = error
		})
	}

	$scope.setBrightnessSlider = ()=>{
		$http.post('/api/brightness',{
				brightness:$scope.brightness/100
			})
		.then(
		(success)=>{
		},
		(failure)=>{
		})
	}

	var startMode = ()=>{
		$http.get('/api/mode')
		.then(
		(success)=>{
			$scope.mode = success.data
		},
		(error)=>{
			$scope.error = error
		})
	}

	$scope.setMode = (mode)=>{
		$http.post('/api/mode',{mode:mode})
		.then(
		(success)=>{
			$scope.mode=mode
		},
		(error)=>{
		})
	}

	var startAuto = ()=>{
		$http.get('/api/auto')
		.then(
		(success)=>{
			$scope.auto = success.data
			console.log($scope.auto)
		},
		(error)=>{
			$scope.error = error
		})
	}

	$scope.setAuto = ()=>{
		$http.post('/api/auto',{auto:$scope.auto})
		.then(
		(success)=>{
		},
		(error)=>{
			$scope.error = error
		})
	}

        var colourSlider = document.getElementById('colour');
	var brightnessSlider = document.getElementById('brightness');
	startColourSlider(colourSlider);
	startBrightnessSlider(brightnessSlider);
	startMode()
	startAuto()
	getTemperature();
	$interval(getTemperature,2000);

  });

const makeSlider = (slider,startMin,startMax)=>{
  noUiSlider.create(slider, {
   start: [startMin, startMax],
   connect: true,
   step: 1,
   orientation: 'horizontal', // 'horizontal' or 'vertical'
   range: {
     'min': 10,
     'max': 40
   },
   format: wNumb({
     decimals: 1
   })
  });
}
