/**
 * Created by user on 05.08.2015.
 */
app.factory("UserService", function($http, $q) {
    var service = {};
    service.userName = "";
    service.loggedIn = false;

    service.login = function(login, password) {
        var deferred = $q.defer();
        $http.post("/login", {login:login, password:password})
            .success(function(res) {
                if (res) {
                    service.userName = login;
                    deferred.resolve("Logged in");

                } else {
                    deferred.reject("wrong user/password!");
                }

            });
        return deferred.promise;
    }

    return service;
});
