angular.module('app')
.factory('products', ['$http', 'URL', 'Upload',function AnnexesFactory($http, URL, Upload) {
  return {
    list: function(){
     	return $http.get(URL.back+'/products')
    },
    create: function(prod){
    	return Upload.upload({ url: URL.back+'/products', data: prod})
    },
    delete: function(id){
     	return $http.delete(URL.back+'/products/'+id)      
    },
    get: function(id){
     	return $http.get(URL.back+'/products/'+id) 
    }
  }
}]);