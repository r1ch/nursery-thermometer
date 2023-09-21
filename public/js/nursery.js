angular.module('nurseryApp', [])
  .controller('NurseryController', function($scope,$http,$interval) {
	var getTemperature = ()=>{
		$http.get('/api/environment')
		.then(
		(success)=>{
			$scope.temperature = Number(success.data.temperature).toFixed(1)
			if($scope.colours){
				if($scope.mode=='nightlight'){
					$scope.temperatureClass='grey';
				} else if($scope.temperature<$scope.colours[0].from){
					$scope.temperatureClass='light-blue';
				} else if ($scope.temperature<$scope.colours[1].from){
					$scope.temperatureClass='green';
				} else {
					$scope.temperatureClass='red';
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

	var getState = ()=>{
		$http.get('/api/state')
		.then(
		(success)=>{
			$scope.state = {
				r : success.data[0],
				g : success.data[1],
				b : success.data[2],
				brightness : success.data[3]
			}
		},
		(error)=>{
			$scope.error = error
		})
	}
	
	var getColourMap = ()=>{
		$http.get('/api/colourMap')
		.then(
		(success)=>{
			$scope.colourMap = success.data
		},
		(error)=>{
			$scope.error = error
		})
	}

        var colourSlider = document.getElementById('colour');
	var brightnessSlider = document.getElementById('brightness');
	startColourSlider(colourSlider);
	startBrightnessSlider(brightnessSlider);
	startMode();
	startAuto();
	getTemperature();
	getState();
	getColourMap();
	$interval(getTemperature,2000);
	$interval(getState,1000);
	$interval(getColourMap,1000);

  });

const makeSlider = (slider,startMin,startMax)=>{
  noUiSlider.create(slider, {
   start: [startMin, startMax],
   connect: [true, true, true],
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

 var segments = slider.querySelectorAll('.noUi-connect')
 segments[0].style.background = 'rgb(32,32,200)'
 segments[1].style.background = 'rgb(32,200,32)'
 segments[2].style.background = 'rgb(200,32,32)'
}

