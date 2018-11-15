angular.module('app')
.factory('orders', ['$http', 'URL', function AnnexesFactory($http, URL) {
  return {
    list: function(){
      return $http.get(URL.back+'/orders')
    },
    create: function(cat){
      return $http.post(URL.back+'/orders', cat)
    },
    delete: function(id){
      return $http.delete(URL.back+'/orders/'+id)      
    },
    get: function(id){
      return $http.get(URL.back+'/orders/'+id) 
    },
    update: function(cat){
      return $http.put(URL.back+'/orders/'+cat.id, cat)
    }
  }
}]);
