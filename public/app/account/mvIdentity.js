angular.module('app').factory('mvIdentity', function ($window, mvUser) {
	var currentUser;
	if (!!$window.bootstrappedUserObject) {
		currentUser = $window.bootstrappedUserObject;
		angular.extend(currentUser, $window.bootstrappedUserObject);
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function () {
			return !!this.currentUser;
		}
	}
});