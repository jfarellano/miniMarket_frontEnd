(function () {
    'use strict';

    angular.module('app').controller('adminCtlr', ['$scope', '$state', 'categories', 'products', '$mdDialog',adminCtlr])

    function adminCtlr ($scope, $state, categories, products, dialog) {

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
        }

        $scope.cancel = function(){
            $scope.edit = false
            $scope.cat = {}
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

    }
})(); 