var ctrl = angular.module('test', []);

ctrl.controller('PostsCtrlAjax', function($scope, $http, $timeout){
  $scope.posts = [];
  var rID = "";
  $scope.showloader = function() {
      $scope.state = "LOADING";
  }

  $scope.getData = function(){
    $http({method: 'GET', url: '../flickr/mostRecent'}).success(function(data) {
      $scope.posts = data.photo; // response data 
      rID = data._id;
      });
   
  };
$scope.getColor = function(){
    console.log(rID);
    $http({method: 'GET', url: '/flickr/' + rID}).success(function(report){
        $scope.posts = report.photo;
        $scope.colors = [];
        $scope.state = "SUCCESS";
        console.log($scope.colortest);
        angular.forEach(report.photo, function(value, dominantColor){
        if($scope.colors.indexOf(value.dominantColor) == -1 && value.dominantColor !== ''){
           $scope.colors.push(value.dominantColor);
        }
        // console.log($scope.colors);
        });
        updateGraph(report);
    });
};
$scope.intervalFunction = function(){
  setInterval(function() {
    console.log("STARTING GETCOLOR");
    $scope.getColor();
  }, 10000);
};
  //'javascripts/testapi.json'
  //'../flickr/mostRecent'
  // Kick off the interval 
$scope.showloader();
$scope.getData();
// $scope.getColor();
$scope.intervalFunction();
 // setInterval($scope.getData,5000);

  
});
