var app = angular.module('DemoApp', ['ui.router', 'satellizer']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'partials/home.tpl.html'
    })
    .state('secret', {
      url: '/secret',
      templateUrl: 'partials/secret.tpl.html',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.tpl.html'
    });

  $urlRouterProvider.otherwise('/home');

});