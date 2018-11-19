angular.module('app')
.factory('URL', ['$http', function AnnexesFactory($http) {
  return {
    back: 'http://ec2-3-16-26-6.us-east-2.compute.amazonaws.com:3000'
  }
}]);
