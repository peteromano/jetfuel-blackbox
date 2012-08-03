describe("Application", function() {
  var app;

  beforeEach(function() {
    app = Application.getInstance();
  });

  it("should be in the context of `window`", function() {
    expect(app).toEqual(Application.getInstance());
    expect(app.getContext()).toEqual(window);
  });

});