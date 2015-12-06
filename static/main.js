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
      controller: 'SecretCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.tpl.html',
      controller: 'LoginSignupCtrl'
    });

  $urlRouterProvider.otherwise('/home');

});


app.controller('LoginSignupCtrl', function ($scope, $auth, $state) {

  $scope.signUp = function () {
    $auth
      .signup({email: $scope.email, password: $scope.password})
      .then(function (response) {
        $auth.setToken(response);
        $state.go('secret');
      })
      .catch(function (response) {
        console.log("error response", response);
      })
  };

  $scope.login = function () {
    $auth
      .login({email: $scope.email, password: $scope.password})
      .then(function (response) {
        $auth.setToken(response);
        $state.go('secret');
      })
      .catch(function (response) {
        console.log("error response", response);
      })
  };
});

app.controller('SecretCtrl', function ($scope, $state, $auth) {
  $scope.logout = function () {
    $auth.logout();
    $state.go("home");
  };
});