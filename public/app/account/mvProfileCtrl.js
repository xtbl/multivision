angular.module('app').controller('mvProfileCtrl', function ($scope, mvAuth, mvIdentity, mvNotifier) {
    $scope.email = mvIdentity.currentUser.userName;
    $scope.fname = mvIdentity.currentUser.firstName;
    $scope.lname = mvIdentity.currentUser.lastName;

    $scope.update = function () {
        var newUserData = {
            userName: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };
        if ($scope.password && $scope.password.length > 0) {
            console.log('update password');
            newUserData.password = $scope.password;
        }

        mvAuth.updateCurrentUser(newUserData).then(function () {
            mvNotifier.notify('Your user account has been updated');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }
});