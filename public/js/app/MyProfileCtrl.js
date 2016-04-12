(function(){
var app = angular.module('MyProfile', []);

app.controller('MyProfileController', function($scope,$http){

// $http.get('/MyProfile').success(function(data){
//             $scope.products = data;
//             console.log(data); //We need to initialize products
//         });


}  );
})();
// $scope.submitdata = function(){
// name = req.body.name;
// email = req.body.email;
// data = [name,email];
// $http.post("https://da-profsite.herokuapp.com/MyProfile", data).success(function(data, status) {
//             $scope.hello = data;
//         })
