angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: '/partials/main.html', 
			controller: 'mainCtrl'}
		)
});

angular.module('app').controller('mainCtrl', function($scope) {
	console.log('mainCtrl');
	$scope.myVar = "Angular app";
});