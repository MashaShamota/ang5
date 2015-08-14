/**
 * Created by user on 05.08.2015.
 */
app.controller("LoginController", function($scope, UserService) {

    $scope.loggedIn = UserService.loggedIn;

    $scope.login = function() {
        UserService.login($scope.username, $scope.password);
    }

});
