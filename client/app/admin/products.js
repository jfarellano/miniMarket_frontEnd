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
    },
    update: function(prod){
        if (typeof prod.image  == 'object') {
            return Upload.upload({method: 'PUT', url: URL.back+'/products/'+prod.id, data: prod})
        }else{
            prod = {id: prod.id, name: prod.name, description: prod.description, price: prod.price, category_id: prod.category.id}
            return $http.put(URL.back+'/products/'+prod.id, prod)
        }
    }
  }
}]);