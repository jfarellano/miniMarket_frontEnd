angular.module('app')
.factory('URL', ['$http', function AnnexesFactory($http) {
  return {
    back: 'http://localhost:2000'
  }
}]);
