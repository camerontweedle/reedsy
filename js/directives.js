(function() {
  "use strict";

  angular.module('reedsyApp')
    .directive('bookListing', bookListing);

  function bookListing() {
    var directive = {
      templateUrl: '/js/templates/bookListing.html',
      restrict: 'E',
      scope: {
        bookInfo: '=info'
      },
      controller: 'BookListingController',
      controllerAs: 'vm'
    };
    return directive;
  }

})();
