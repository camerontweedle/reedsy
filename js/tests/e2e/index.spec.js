describe("Index features: ", function() {
  var page = require('../pages/reedsyapp.page.js');

  beforeEach(function() {
    browser.get("http://localhost:8000");

    page.categoryFilterSelect = "";
    page.genreFilterSelect = "";
    page.bookSearchInput = "";
  });

  it("should display 6 books", function() {
    expect(element.all(by.css('book-listing')).isDisplayed().count()).toEqual(6);
  });

  it("should display the book details", function() {
    var first_book = element.all(by.css('book-listing')).first();
    expect(first_book.getText()).toContain("The Lord of the Rings");
    expect(first_book.getText()).toContain("JRR Tolkein");
    expect(first_book.getText()).toContain("816");

    var link = element.all(by.css('book-listing a')).first();
    expect(link.getAttribute('href')).toContain('#/book/b841267346');
  });

  it("should filter by category", function() {
    element.all(by.cssContainingText('option', 'Fiction')).first().click();
    var books = element.all(by.css('.book-listing-title'));
    expect(books.getText()).not.toContain("The Lord of the Rings");
    expect(books.getText()).toContain("On the Road");
  });

  it("should filter by genre", function() {
    element.all(by.cssContainingText('option', 'Fantasy')).first().click();
    var books = element.all(by.css('.book-listing-title'));
    expect(books.getText()).not.toContain("The Lord of the Rings");
    expect(books.getText()).toContain("Austerlitz");
  });

  it("should filter by search input", function() {
    element(by.id('bookSearch')).sendKeys("john");
    var books = element.all(by.css('.book-listing-title'));
    expect(books.getText()).not.toContain("The Lord of the Rings");
    expect(books.getText()).toContain("The Grapes of Wrath");
  });

  it("should paginate", function() {
    element.all(by.css('dir-pagination-controls')).first().all(by.tagName('a')).get(2).click();
    var books = element.all(by.css('.book-listing-title'));
    expect(books.getText()).not.toContain("The Lord of the Rings");
    expect(books.getText()).toContain("Under the Net");
  });

});
