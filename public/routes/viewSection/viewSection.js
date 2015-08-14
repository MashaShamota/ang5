/**
 * Created by user on 05.08.2015.
 */
app.controller("ViewSectionController",
    function ($scope,$http,$routeParams) {
        $scope.section = $routeParams.name;
        var params = {params:{section:$routeParams.name}};
        $http.get("/notes",params)
            .success(function (notes) {
                $scope.notes = notes;

            });
    })