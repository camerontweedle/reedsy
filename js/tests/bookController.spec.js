describe('Book Controller', function() {
  var controller, scope, httpBackend, bookData, location;

  beforeEach(module('reedsyApp'));
  beforeEach(inject(function($controller, $rootScope, $httpBackend, $routeParams, $location) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    location = $location;

    jasmine.getJSONFixtures().fixturesPath='base/js/tests/mock';
    bookData = getJSONFixture("book.json");
    httpBackend.whenGET('js/book.json').respond(bookData);

    controller = $controller('BookController', {
      $scope: scope,
      $routeParams: {book_id: "b687861548"}
    });


  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it("should have a book object, recommended and additional books", function(){
    location.path('/book/b687861548');
    scope.$broadcast('$routeChangeSuccess');
    // expect(controller.book).toExist();
    // expect(controller.recommended_books).toExist();
    // expect(controller.additional_books).toExist();
    // console.log(controller);

    httpBackend.flush();
  });
});
