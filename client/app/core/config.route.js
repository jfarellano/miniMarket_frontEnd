
angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',

        function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
            $urlRouterProvider
                .otherwise('/app/dashboard');

            $stateProvider
                // Overall
                .state('app', {
                    url: '/app',
                    templateUrl: "app/app.html"
                })

                // Home
                .state('app.dashboard', {
                    url: '/dashboard',
                    templateUrl: "app/dashboard/dashboard.html"
                })

                .state('signin', {
                    url: '/signin',
                    templateUrl: 'app/page-extra/signin.html',
                    controller: 'signinCtlr'
                })

                .state('admin', {
                    url:'/admin',
                    templateUrl: 'app/admin/admin.html',
                    controller: 'adminCtlr'
                })
            ;
        }
    ]);