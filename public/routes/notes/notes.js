
/**
 * Created by user on 03.08.2015.
 */
app.controller('NotesController', function ($scope, $http, $routeParams,$location) {
    $scope.notes = [];
    var update = function() {
        $scope.activeSection = $routeParams.section;
        var params = {params:{section:$scope.activeSection}};
        $http.get("/notes",params)
            .success(function (notes) {
                $scope.notes = notes;

            });
    }
    $scope.update = update;
    update();
    $scope.add = function(){
        if( $scope.text.length == 0) return;
        var note = {
            text : $scope.text,
            date : new Date().getTime(),
            section:  $scope.activeSection,
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

    var readSections = function(){
        $http.get("/sections")
            .success(function(sections){
                $scope.sections = sections;
                if ($scope.sections.length>0) {
                    $scope.activeSection =
                        $scope.sections[0].title;
                }

                update();
            });
    }
    readSections();

    $scope.showSection = function(section){
        $scope.activeSection = section.title;
        $location.path(section.title);
        update();
    }

    $scope.addSection = function() {
        if ($scope.newSection.length==0) return;

        // check for duplicates
        for (var i=0;i<$scope.sections.length;i++) {
            if ($scope.sections[i].title==$scope.newSection) {
                return;
            }
        }

        var section = {title: $scope.newSection};
        if(!$scope.sections){
            $scope.sections = [];
        }
        $scope.sections.unshift(section);
        $scope.activeSection = $scope.newSection;
        $scope.newSection = "";
        $scope.writeSections();
        update();
    }
    $scope.writeSections = function() {
        // replace sections after dragging to reflect the new order
        if ($scope.sections && $scope.sections.length>0) {
            $http.post("/sections/replace", $scope.sections);
        }
    };
});

