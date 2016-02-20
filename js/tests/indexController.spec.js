describe('Index Controller', function() {
  var controller, scope, httpBackend, bookData;

  beforeEach(module('reedsyApp'));
  beforeEach(inject(function($controller, $rootScope, $httpBackend, $routeParams) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    jasmine.getJSONFixtures().fixturesPath='base/js/tests/mock';
    bookData = getJSONFixture("book.json");
    httpBackend.whenGET('js/book.json').respond(bookData);

    controller = $controller('IndexController', {
      $scope: scope
    });

  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it("should filter books based on category", function(){
    controller.books = bookData;
    controller.categoryFilter = "Fiction";
    expect(controller.filterCategory(bookData[0])).toBe(false);
    expect(controller.filterCategory(bookData[3])).toBe(true);

    httpBackend.flush();
  });

  it("should filter books based on search", function(){
    controller.books = bookData;
    controller.bookSearch = "john";
    expect(controller.bookSearchFilter(bookData[0])).toBe(false);
    expect(controller.bookSearchFilter(bookData[7])).toBe(true);

    httpBackend.flush();
  });
});
