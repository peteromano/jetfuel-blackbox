describe('site.services.Router', function(){
  var router;

  before(function(){
      router = site.services.Router.getInstance();
  });

  describe('#Router()', function(){
    it('should return a single static instance', function(){
      expect(new site.services.Router()).to.equal(router);
    });
  });
});