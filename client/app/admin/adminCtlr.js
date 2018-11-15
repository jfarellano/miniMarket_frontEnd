(function () {
    'use strict';

    angular.module('app').controller('adminCtlr', ['$scope', '$state', 'categories', 'products', 'orders','$mdDialog', 'URL',adminCtlr])

    function adminCtlr ($scope, $state, categories, products, orders, dialog, URL) {
        $scope.url = URL.back
        $scope.update = function(){
            categories.list().then(function(response){
                $scope.categories = response.data
            }, function(response){
                console.log(response.data)
            })
            products.list().then(function(response){
                $scope.products = response.data
            }, function(response){
                console.log(response.data)
            })
            orders.list().then(function(response){
                $scope.orders = response.data
            }, function(response){
                console.log(response.data)
            })
        }

        $scope.states = [
            {name: 'pagada'},
            {name: 'empacada'},
            {name: 'enviada'},
            {name: 'recibida'}
        ]

        $scope.cancel = function(){
            $scope.edit = false
            $scope.cat = {}
            $scope.order = {}
            $scope.prod = {}
            dialog.cancel()
        }
        $scope.save = function(){
            dialog.hide()
        }

        $scope.update()

        $scope.deleteCat = function(id){
            categories.delete(id).then(function(response){
                $scope.update()
            }, function(response){
                console.log(response.data)
                $scope.cancel()
                aletify.error('Hubo un error eliminando la categoria')
            })
        }

        $scope.showCat = function(cat, evt){
            dialog.show(
                dialog.alert()
                    .title(cat.name)
                    .content('Tiene ' + cat.products.length + ' productos.')
                    .ariaLabel('Ver categoria')
                    .ok('Ok')
                    .targetEvent(evt)
            ) 
        }

        $scope.editCat = function(cat, ev){
            $scope.cat = cat
            $scope.edit = true
            $scope.createCat(ev)
        }

        $scope.createCat = function(ev){
            dialog.show({
                templateUrl: '/app/admin/createCat.html',
                scope: $scope,
                preserveScope: true,
                targetEvent: ev,
                escapeToClose: false
            }).then(function() {
                if($scope.edit){
                    categories.update($scope.cat).then(function(response){
                        $scope.update()
                        $scope.cancel()
                        aletify.success('Exito actualizando la categoria')
                    },function(response){
                        console.log(response.data)
                        $scope.cancel()
                        aletify.error('Hubo un error editando la categoria')
                    })
                }else{
                    categories.create($scope.cat).then(function(response){
                        $scope.update()
                        $scope.cancel()
                    },function(response){
                        console.log(response.data)
                        $scope.cancel()
                        aletify.error('Hubo un error creando la categoria')
                    })
                }
            }, function() {
                $scope.cancel()
            });
        }

        $scope.deleteProd = function(id){
            products.delete(id).then(function(response){
                $scope.update()
            }, function(response){
                console.log(response.data)
                $scope.cancel()
                aletify.error('Hubo un error eliminando el producto')
            })
        }

        $scope.editProd = function(prod, ev){
            $scope.prod = prod
            prod.category_id = prod.category.id
            $scope.edit = true
            $scope.showProd(ev)
        }

        $scope.showProd = function(ev){
            dialog.show({
                templateUrl: '/app/admin/createProd.html',
                scope: $scope,
                preserveScope: true,
                targetEvent: ev,
                escapeToClose: false
            }).then(function() {
                console.log(typeof $scope.prod.image  == 'object')
                if($scope.edit){
                    products.update($scope.prod).then(function(response){
                        $scope.update()
                        $scope.cancel()
                        aletify.success('Exito actualizando el producto')
                    },function(response){
                        console.log(response.data)
                        $scope.cancel()
                        aletify.error('Hubo un error editando el producto')
                    })
                }else{
                    products.create($scope.prod).then(function(response){
                        $scope.update()
                        $scope.cancel()
                    },function(response){
                        console.log(response.data)
                        $scope.cancel()
                        aletify.error('Hubo un error creando el producto')
                    })
                }
            }, function() {
                $scope.cancel()
            });
        }

        $scope.showOrder = function(ev, order){
            $scope.order = order
            dialog.show({
                templateUrl: '/app/admin/showOrder.html',
                scope: $scope,
                preserveScope: true,
                targetEvent: ev,
                escapeToClose: false
            }).then(function() {
                orders.update($scope.order).then(function(response){
                    $scope.update()
                    $scope.cancel()
                    console.log('Entro')
                    aletify.success('Exito actualizando el producto')
                },function(response){
                    console.log(response.data)
                    $scope.cancel()
                    aletify.error('Hubo un error editando el producto')
                })
            }, function() {
                $scope.cancel()
            });
        }

        $scope.deleteOrder = function(id){
            orders.delete(id).then(function(response){
                $scope.update()
            }, function(response){
                console.log(response.data)
                $scope.cancel()
                aletify.error('Hubo un error eliminando la orden')
            })
        }

        $scope.getProd = function(id){
            return $scope.products.filter(prod => prod.id == id)[0]
        }

    }
})(); 