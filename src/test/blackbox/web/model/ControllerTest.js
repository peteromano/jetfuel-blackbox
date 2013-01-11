require(['Backbone', 'model/Controller'], function(Backbone, Controller) {
    'use strict';

    describe('blackbox.web.model.Controller', function(){

        describe('#createRouter()', function(){
            it('should create a new Backbone.Router instance', function(){
                expect(Controller.createRouter() instanceof Backbone.Router).to.equal(true);
            });
        });

        describe('#start()', function(){
            it('should start a Backbone.History session', function(){
                expect(Backbone.history instanceof Backbone.History).to.equal(true);
            });
        });

    });

});