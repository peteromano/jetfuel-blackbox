describe("Application", function() {
  var app;

  beforeEach(function() {
    app = Application.getInstance();
  });

  it("should be the same singleton app instance", function() {
    expect(app).toEqual(Application.getInstance());
  });

  it("should be in the context of `window`", function() {
    expect(app.getContext()).toEqual(window);
  });

});