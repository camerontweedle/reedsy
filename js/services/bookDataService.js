(function() {
  "use strict";

  angular.module('reedsyApp')
    .factory('BookDataService', BookDataService);

  BookDataService.$inject = ['$http', '$q', '$filter'];

  function BookDataService($http, $q, $filter) {
    var _books = [], _categories = [], _genres = [];
    var service = {
      getBooks: getBooks,
      loadBooks: loadBooks,
      getBook: getBook,
      getRecommendedBooks: getRecommendedBooks,
      getAdditionalRecommendedBooks: getAdditionalRecommendedBooks,
      getCategories: getCategories,
      getGenres: getGenres
    };
    return service;

    function getBooks() {
      return _books;
    }

    function loadBooks() {
      // load book data from external source and populate dynamic category and genre arrays
      _books = [];
      _categories = [];
      _genres = [];
      return $http.get('js/book.json')
        .then(function(response) {
          angular.forEach(response.data, function(value, key) {
            _books.push(value);
            if (_categories.indexOf(value.genre.category) === -1)
              _categories.push(value.genre.category);
            if (_genres.indexOf(value.genre.name) === -1)
              _genres.push(value.genre.name);
          });

          return _books;
        }, function(errorResponse) {
          return $q.reject(errorResponse);
        });
    }

    function getBook(bookId) {
      var book = $filter('filter')(_books, function(b) { return b.id == bookId; })[0];
      return book;
    }

    function getRecommendedBooks(book) {
      // match books with the same category and genre
      var similar = $filter('filter')(_books, function(b) { return b.genre.category == book.genre.category && b.genre.name == book.genre.name && b.id != book.id; });
      return similar;
    }

    function getAdditionalRecommendedBooks(book) {
      // match books with the same category but different genre
      var additional = $filter('filter')(_books, function(b) { return b.genre.category == book.genre.category && b.genre.name != book.genre.name && b.id != book.id; });
      return additional;
    }

    function getCategories() {
      return _categories;
    }

    function getGenres() {
      return _genres;
    }
  }

})();
