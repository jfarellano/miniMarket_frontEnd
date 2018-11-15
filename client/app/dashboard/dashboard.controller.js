    angular.module('app').controller('DashboardCtrl', ['$scope', 'products', 'orders','URL', 'categories', '$localStorage',DashboardCtrl])

    function DashboardCtrl($scope, products, orders,URL, categories, storage) {
    	$scope.URL = URL.back
        $scope.searching = false
        if(storage.cart == null){
            storage.cart = {list:[]}
        }
        $scope.storage = storage.cart
    	$scope.update = function(){
            if($scope.searching){
                products.search($scope.info).then(function(response){
                    $scope.products = response.data
                }, function(response){
                    $scope.products = {}
                    console.log(response.data)
                })
            }else{
        		products.list().then(function(response){
        			$scope.products = response.data
        		})
            }   

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

        $scope.placeOrder = function(){
            var list = storage.cart.list
            list.forEach(function(prod){
                for (var i = 0; i < prod.qty; i++) {
                    $scope.order.products.push[prod.id]
                }
            })
            orders.create($scope.order).then(function(response){
                alertify.success('Tu orden ha sido exitosa, Gracias!')
                storage.cart = {}
            },function(response){
                alertify.error('Hubo un problema con tu orden intenta de nuevo')
            })
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
        $scope.getIcon = function(){
            if($scope.searching) return 'cancel'
            else return 'search'
        }

        $scope.search = function(){
            if($scope.searching){
                $scope.searching = false
                $scope.info = {}
            }else{
                $scope.searching = true
            }
            $scope.update()
        }
    }
