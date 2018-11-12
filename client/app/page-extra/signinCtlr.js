(function () {
    'use strict';

    angular.module('app').controller('signinCtlr', ['$scope', '$state',signinCtlr])

    function signinCtlr ($scope, $state) {
        $scope.valid = {}
        $scope.notAuth = false;
        $scope.login = function(){
            if($scope.valid.user == 'admin' && $scope.valid.pass == 'admin'){
                $state.go('admin')
            }else{
                $scope.notAuth = true
            }
        }
    }
})(); 