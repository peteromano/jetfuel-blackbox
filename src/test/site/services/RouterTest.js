/*global site */
describe('site.services.Router', function(){
  'use strict';

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