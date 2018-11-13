(function () {
    'use strict';

    angular.module('app').controller('DashboardCtrl', ['$scope', 'products', 'URL', 'categories', '$localStorage',DashboardCtrl])

    function DashboardCtrl($scope, products, URL, categories, storage) {
    	$scope.URL = URL.back
        if(storage.cart == null){
            storage.cart = {list:[]}
        }
        $scope.storage = storage.cart
    	$scope.update = function(){
    		products.list().then(function(response){
    			$scope.products = response.data
    		})

    		categories.list().then(function(response){
    			$scope.categories = response.data
    		})
    	}

    	$scope.update()

        $scope.addCart = function(prod){
            if (inCart(prod.id).exist) {
                storage.cart.list[inCart(prod.id).index].qty = storage.cart.list[inCart(prod.id).index].qty + 1
            }else{
                prod.qty = 1
                storage.cart.list.push(prod)
            }
            alertify.success(prod.name + ' agregado al carrito')
        }

        $scope.removeCart = function(id){
            alertify.error(storage.cart.list[id].name + ' eliminado del carrito')
            if (storage.cart.list[id].qty == 1) {
                storage.cart.list.splice(id,1)
            }else{
                storage.cart.list[id].qty = storage.cart.list[id].qty - 1
            }
        }

        $scope.clearGroup = function(id){
            alertify.error(storage.cart.list[id].name + ' eliminado del carrito')
            storage.cart.list.splice(id,1)
        }

        var inCart = function(id){
            var exists = {exists: false, index: -1}
            storage.cart.list.forEach(function(prod, index){
                if(id == prod.id) exists = {exist: true, index: index}
            })
            return exists
        }
    }
})(); 
