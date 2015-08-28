/**
 * Created by user on 05.08.2015.
 */
app.controller("LoginController", function($scope, UserService, $location, $timeout, $route) {

    $scope.loggedIn = UserService.loggedIn;

    $scope.login = function() {
        UserService.login($scope.username, $scope.password)
            .then(
                function() {
                    $scope.loggedIn = true;
                    $scope.userName = UserService.userName;
                    $location.path("/");
                    $route.reload();
                },
            function() {
                $scope.wrongPassword = true;
                $timeout(function() {
                    $scope.wrongPassword = false;
                }, 1000);
            }
            );
    }

});
