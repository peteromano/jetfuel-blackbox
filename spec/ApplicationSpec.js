describe("Application", function() {
  var app;

  beforeEach(function() {
    app = new Application;
  });

  it("should be in the context of `window`", function() {
    expect(app.getInstance()).toEqual(app);
    expect(app.getContext()).toEqual(window);
  });

});