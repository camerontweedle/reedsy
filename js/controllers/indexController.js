(function() {
  "use strict";

  angular.module('reedsyApp')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'BookDataService', '$routeParams'];

  function IndexController($scope, BookDataService, $routeParams) {
    var vm = this;
    vm.books = [];
    vm.categories = [];
    vm.genres = [];
    vm.categoryFilter = $routeParams.category ? $routeParams.category : "";
    vm.genreFilter = $routeParams.genre ? $routeParams.genre : "";
    vm.bookSearch = "";
    vm.filterCategory = filterCategory;
    vm.bookSearchFilter = bookSearchFilter;

    activate();

    function activate() {
      BookDataService.loadBooks()
        .then(function(data) {
          vm.books = data;
          vm.categories = BookDataService.getCategories();
          vm.genres = BookDataService.getGenres();
        });
    }

    function filterCategory(book) {
      // add books when category matches or no category is selected
      return (book.genre.category === vm.categoryFilter || vm.categoryFilter === "");
    }

    function bookSearchFilter(book) {
      // add books when the search text is found in the book or author name, or when no search has been entered
      return (book.name.toLowerCase().indexOf(vm.bookSearch.toLowerCase()) > -1) || (book.author.name.toLowerCase().indexOf(vm.bookSearch.toLowerCase()) > -1) || vm.bookSearch === "";
    }
  }

})();
