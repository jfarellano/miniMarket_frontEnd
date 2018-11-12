angular.module('app')
.factory('categories', ['$http', 'URL', function AnnexesFactory($http, URL) {
  return {
    list: function(){
      return $http.get(URL.back+'/categories')
    },
    create: function(cat){
      return $http.post(URL.back+'/categories', cat)
    },
    delete: function(id){
      return $http.delete(URL.back+'/categories/'+id)      
    },
    get: function(id){
      return $http.get(URL.back+'/categories/'+id) 
    }
  }
}]);
