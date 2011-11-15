/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var engine = null;

    module( 'core/Event', {
        setup: function () {
            stop();

            gladius.create( { debug: true }, function( instance ) {       
                engine = instance;
                start();
            });
        },

        teardown: function () {
            engine = null;
        }
    });

    test( 'Bound handlers are called with data', function () {
        expect( 1 );

        var event = new engine.Event();
        var data = {
                value: 'Hello world!'
            }
        var handler = function( options ) {        
            same(
                data,
                options,
                'Handler is called with correct data'
            );
        };
        event.bind( handler );
        event( data );
    });

    test( 'Multiple bound handlers are called', function() {
        expect( 3 );

        var event = new engine.Event();
        var handler1 = function( options ) {
            ok(
                true,
                'First handler is called'
            );
        };
        var handler2 = function( options ) {
            ok(
                true,
                'Second handler is called'
            );
        };
        event.bind( handler1 );
        event.bind( handler2 );
        event();

        event.unbind( handler2 );
        event();
    });

}());
