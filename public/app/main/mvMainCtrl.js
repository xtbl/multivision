angular.module('app').controller('mvMainCtrl', function($scope, mvCachedCourses) {
	$scope.myVar = "Angular app";
	$scope.courses = mvCachedCourses.query();
});