(function() {
  "use strict";

  angular.module('reedsyApp', [
    'ngRoute',
    'ngResource',
    'angularUtils.directives.dirPagination'
  ])

  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/templates/index.html',
        controller: 'IndexController',
        controllerAs: 'vm'
      })
      .when('/book/:book_id', {
        templateUrl: 'js/templates/book.html',
        controller: 'BookController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

})();
