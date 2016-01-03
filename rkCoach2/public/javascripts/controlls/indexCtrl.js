angular.module('index', ['common'])



.controller('searchCtrl', ['$scope', function ($scope) {




	$scope.lessonSearch = function(){

		var sports = $('#inputSports').val();
		var locations = $('#inputLocations').val();
		var location1 = locations.split('-')[0];
		var location2 = locations.split('-')[1];

		if(sports && locations){
			window.location = '/result?sports='+sports+'&location1='+location1+'&location2='+location2;
		} else {

		}
		
	};


}]);
