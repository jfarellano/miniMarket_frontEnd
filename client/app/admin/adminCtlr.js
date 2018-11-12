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

        $scope.createCat = function(ev){
            dialog.show({
                templateUrl: '/app/admin/createCat.html',
                scope: $scope,
                preserveScope: true,
                targetEvent: ev,
                escapeToClose: false
            }).then(function() {
                categories.create($scope.cat).then(function(response){
                    $scope.update()
                },function(response){
                    console.log(response.data)
                    $scope.cancel()
                    aletify.error('Hubo un error creando la categoria')
                })
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

        $scope.showProd = function(ev){
            dialog.show({
                templateUrl: '/app/admin/createProd.html',
                scope: $scope,
                preserveScope: true,
                targetEvent: ev,
                escapeToClose: false
            }).then(function() {
                console.log($scope.prod)
                products.create($scope.prod).then(function(response){
                    $scope.update()
                },function(response){
                    console.log(response.data)
                    $scope.cancel()
                    aletify.error('Hubo un error creando el producto')
                })
            }, function() {
                $scope.cancel()
            });
        }

    }
})(); 