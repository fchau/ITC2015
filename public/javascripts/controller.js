var ctrl = angular.module('test', []);

ctrl.controller('PostsCtrlAjax', function($scope, $http, $timeout){
  $scope.posts = [];
  
  $scope.getData = function(){
    $http({method: 'GET', url: 'javascripts/testapi.json'}).success(function(data)
      {
      $scope.posts = data; // response data 
      $scope.colors = [];
      angular.forEach(data, function(value, dominant){
        if($scope.colors.indexOf(value.dominant) == -1){
          $scope.colors.push(value.dominant);
        }
        })
      });
    console.log($scope.posts);
  };

$scope.getData();
 
  

  // Kick off the interval
  
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