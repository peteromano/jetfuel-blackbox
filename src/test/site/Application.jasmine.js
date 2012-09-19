describe("Application", function() {
  var app;

  beforeEach(function() {
    app = new Application;
  });

  it("should be a singleton", function() {
    expect(Application.getInstance()).toEqual(app);
  });

});