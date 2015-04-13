var ctrl = angular.module('test', []);

ctrl.controller('PostsCtrlAjax', function($scope, $http, $timeout){
  $scope.posts = [];
  $scope.showloader = function() {
      $scope.state = "LOADING";
  }
  $scope.getData = function(){
    $http({method: 'GET', url: '../flickr/mostRecent'}).success(function(data)
      {
      $scope.posts = data.photo; // response data 
      $scope.reportId = data._id; 
      console.log($scope.posts);
      $scope.state = "SUCCESS";
      $scope.getColor();
          $scope.colors = [];

          angular.forEach(data.photo, function(value, dominantColor){
            if($scope.colors.indexOf(value.dominantColor) == -1){
              $scope.colors.push(value.dominantColor);
            }
            // console.log($scope.colors);
          })
      });
   
  };
$scope.getColor = function(){
   $http({method: 'GET', url: '../flickr/' + $scope.reportId}).success(function(report){
        $scope.posts = report.photo;
         console.log($scope.posts);

    });
}
$scope.intervalFunction = function(){
  setInterval(function() {
    $scope.getColor();
  }, 10000);
};
  //'javascripts/testapi.json'
  //'../flickr/mostRecent'
  // Kick off the interval
$scope.showloader();
$scope.getData();
//$scope.intervalFunction();
 // setInterval($scope.getData,5000);
 
 
//Contains the filter options
  /*$scope.filterOptions = {
    stores: [
      {id : 2, name : 'Show All', rating: 6 },
    {id : 3, name : 'Black', rating: 5 },
      {id : 4, name : 'White', rating: 4 },
      {id : 5, name : 'Blue', rating: 3 },
      {id : 6, name : 'Red', rating: 2 },
      {id : 7, name : 'Yellow', rating: 1 },
      {id : 8, name : 'Green', rating: 1 } ,
      {id : 9, name : 'Purple', rating: 1 } ,
      {id : 10, name : 'Orange', rating: 1 } ,
      {id : 11, name : 'Cyan', rating: 1 } ,
      {id : 12, name : 'Beige', rating: 1 } ,
      {id : 13, name : 'Brown', rating: 1 } ,
      {id : 14, name : 'Pink', rating: 1 } ,
      {id : 15, name : 'Gray', rating: 1 } 
    ]
  };*/
  
});

/*function PostsCtrlAjax($scope, $http)
{
  $http({method: 'GET', url: 'testapi.json'}).success(function(data)
  {
  $scope.posts = data; // response data 
  });
}*/