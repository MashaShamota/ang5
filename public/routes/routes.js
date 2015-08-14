/**
 * Created by user on 05.08.2015.
 */
var app = angular.module('Task8', ['dndLists','ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/',{
                templateUrl: 'routes/notes/notes.html',
                controller: 'NotesController'
            }).
            when('/register', {
                templateUrl: 'routes/userForm/userForm.html',
                controller: 'UserFormController'
            }).
            when('/section/:name',{
                templateUrl: 'routes/viewSection/viewSection.html',
                controller: 'ViewSectionController'
            }).
            when('/:section?', {
                templateUrl: 'routes/notes/notes.html',
                controller: 'NotesController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);