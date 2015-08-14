
/**
 * Created by user on 03.08.2015.
 */
var app = angular.module('Task3', []);


app.controller('NotesController', function ($scope, $http) {
    $scope.notes = [];
    var update = function() {
        $http.get("/notes")
            .success(function (notes) {
                $scope.notes = notes;
            });
    }
    $scope.update = update;
    update();
    $scope.add = function(){
        var note = {
            text : $scope.text,
            date : new Date().getTime(),
        };
        $http.post("/notes",note)
            .success(function(){
                $scope.text = '';
                update();
            });

    }
    $scope.remove = function(id) {
        $http.delete("/notes", {params: {id: id}})
            .success(function () {
                update();
            });
    }

    $scope.sendToTop = function(){
        var note = {
            text : $scope.text,
            date : new Date().getTime(),
            order: -1
        };
        $http.post("/notes",note)
            .success(function(){
                $scope.text = '';
                update();
            });

    }
});

