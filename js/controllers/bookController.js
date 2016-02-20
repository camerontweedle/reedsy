(function() {
  "use strict";

  angular.module('reedsyApp')
    .controller('BookController', BookController);

  BookController.$inject = ['$scope', 'BookDataService', '$routeParams'];

  function BookController($scope, BookDataService, $routeParams) {
    var vm = this;
    vm.book_id = null;
    vm.book = {};
    vm.recommended_books = [];
    vm.additional_books = [];

    activate();

    function activate() {
      BookDataService.loadBooks()
        .then(function(data) {
          vm.book_id = $routeParams.book_id;
          vm.book = BookDataService.getBook(vm.book_id);
          vm.recommended_books = BookDataService.getRecommendedBooks(vm.book);
          if (vm.recommended_books.length < 3)
            vm.additional_books = BookDataService.getAdditionalRecommendedBooks(vm.book);
        });
    }
  }

})();
