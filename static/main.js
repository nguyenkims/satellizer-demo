var app = angular.module('DemoApp', ['ui.router', 'satellizer', 'toastr']);

app.config(function ($stateProvider, $urlRouterProvider, $authProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'partials/home.tpl.html'
    })
    .state('secret', {
      url: '/secret',
      templateUrl: 'partials/secret.tpl.html',
      controller: 'SecretCtrl',
      data: {requiredLogin: true}
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.tpl.html',
      controller: 'LoginSignupCtrl'
    });

  $urlRouterProvider.otherwise('/home');

  $authProvider.facebook({
    clientId: '413108255566242',
    // by default, the redirect URI is http://localhost:5000
    redirectUri: location.origin + location.pathname
  });

});

app.run(function ($rootScope, $state, $auth) {
  $rootScope.$on('$stateChangeStart',
    function (event, toState) {
      var requiredLogin = false;
      if (toState.data && toState.data.requiredLogin)
        requiredLogin = true;

      if (requiredLogin && !$auth.isAuthenticated()) {
        event.preventDefault();
        $state.go('login');
      }
    });
});


app.controller('LoginSignupCtrl', function ($scope, $auth, $state, toastr) {

  $scope.signUp = function () {
    $auth
      .signup({email: $scope.email, password: $scope.password})
      .then(function (response) {
        $auth.setToken(response);
        $state.go('secret');
      })
      .catch(function (response) {
        toastr.error(
          'Error!',
          {closeButton: true}
        );
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
        toastr.error(
          'Email or password not correct!',
          {closeButton: true}
        );
      })
  };

  $scope.auth = function (provider) {
    $auth.authenticate(provider)
      .then(function (response) {
        console.debug("success", response);
        $state.go('secret');
      })
      .catch(function (response) {
        console.debug("catch", response);
      })
  }
});

app.controller('SecretCtrl', function ($scope, $state, $auth, $http) {
  $scope.logout = function () {
    $auth.logout();
    $state.go("home");
  };

  getUserInfo();

  function getUserInfo() {
    $http.get('/user')
      .then(function (response) {
        $scope.user = response.data;
      })
      .catch(function (response) {
        console.log("getUserInfo error", response);
      })
  }
});