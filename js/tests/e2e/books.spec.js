describe("Book Page features: ", function() {
  var page = require('../pages/reedsyapp.page.js');

  beforeEach(function() {
    browser.get("http://localhost:8000/#/book/b841267346");
  });

  it("should contain the book information", function() {
    var header = element(by.css(".book-header"));
    expect(header.getText()).toContain("The Lord of the Rings");
    expect(header.getText()).toContain("JRR Tolkein");
    expect(header.getText()).toContain("816");
  });

  it("should display the book introduction", function() {
    var intro = element(by.css(".book-intro"));
    expect(intro.all(by.css('p')).count()).toEqual(5);
  });

  it("should display the author avatar", function() {
    var author = element(by.css('.book-author'));
    expect(author.all(by.css('img')).first().getAttribute('alt')).toEqual("JRR Tolkein avatar");
    expect(author.getText()).toContain("Written by JRR Tolkein");
  });

  it("should display 3 recommended books", function() {
    var books = element.all(by.css('book-listing')).all(by.css('.book-listing-title'));
    expect(books.count()).toEqual(3);
    expect(books.getText()).toContain("The Catcher in the Rye");
  });
});
