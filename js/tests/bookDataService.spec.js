describe('Book Data Service', function() {
  var serviceObj, httpBackend, scope, bookData;

  beforeEach(angular.mock.module('reedsyApp'));
  beforeEach(inject(function(BookDataService, $httpBackend) {
    serviceObj = BookDataService;
    httpBackend = $httpBackend;

    jasmine.getJSONFixtures().fixturesPath='base/js/tests/mock';
    bookData = getJSONFixture("book.json");
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it("should load the book data from an external data source", function() {
    httpBackend.expectGET('js/book.json').respond(bookData);
    serviceObj.loadBooks().then(function (data) {
      expect(data.length).toBe(100);
      expect(data[0].name).toBe("The Lord of the Rings");
    });
    httpBackend.flush();
  });

  it("should return an array of all the books", function() {
    httpBackend.expectGET('js/book.json').respond(bookData);
    serviceObj.loadBooks().then(function (data) {
      var books = serviceObj.getBooks();
      expect(books.length).toBe(100);
      expect(books[1].name).toBe("To Kill a Mockingbird");
    });
    httpBackend.flush();
  });

  it("should lookup a single book", function() {
    httpBackend.expectGET('js/book.json').respond(bookData);
    serviceObj.loadBooks().then(function (data) {
      var book = serviceObj.getBook('b283256024');
      expect(book.name).toBe("The Home and the World");
    });
    httpBackend.flush();
  });

  it("should return recommended books, from the same category and genre", function() {
    httpBackend.expectGET('js/book.json').respond(bookData);
    serviceObj.loadBooks().then(function (data) {
      var book = serviceObj.getBook('b21269727');
      var similar = serviceObj.getRecommendedBooks(book);
      expect(similar[0].genre.category).toBe("Fiction");
      expect(similar[0].genre.name).toBe("Fantasy");
    });
    httpBackend.flush();
  });

  it("should get additional recommendations from the same category, different genre", function() {
    httpBackend.expectGET('js/book.json').respond(bookData);
    serviceObj.loadBooks().then(function (data) {
      var book = serviceObj.getBook('b508538873');
      var additional = serviceObj.getAdditionalRecommendedBooks(book);
      expect(additional[0].genre.category).toBe("Non-Fiction");
      expect(additional[0].genre.name).not.toBe("Technology");
    });
    httpBackend.flush();
  });

  it("should return an array of categories", function() {
    httpBackend.expectGET('js/book.json').respond(bookData);
    serviceObj.loadBooks().then(function (data) {
      var categories = serviceObj.getCategories();
      expect(categories.length).toBe(2);
      expect(categories).toContain("Fiction");
      expect(categories).toContain("Non-Fiction");
    });
    httpBackend.flush();
  });

  it("should return an array of genres", function() {
    httpBackend.expectGET('js/book.json').respond(bookData);
    serviceObj.loadBooks().then(function (data) {
      var genres = serviceObj.getGenres();
      expect(genres.length).toBe(33);
      expect(genres).toContain("History");
      expect(genres).toContain("Fantasy");
    });
    httpBackend.flush();
  });

});
