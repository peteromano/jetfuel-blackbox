describe("Espresso", function() {
  var version;

  beforeEach(function() {
    version = espresso.version();
  });

  it("should be at version 0.6.x", function() {
    expect(version).toMatch(/0\.6\.\d+/);
  });

});