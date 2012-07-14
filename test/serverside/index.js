//
//
//  Written By Ryan Dick<noxinoobin@gmail.com>
//  No part of this software may be duplicated, modified, retransmitted
//  Or in any way modified without the express consent of the original author
//  Most rights reserved
//
//
//  @UNIT_TEST_MAIN
//  @DESC import the piccanin object that wraps all functionality
//  this file is only used as a wrapper and boot loader for the test suite
//  note: data must be initialised through the data layer as the wrappers init
//  may mess with these unit tests
var piccanin = require('../../index.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/
//
//  @TEST_SUITE namespace.configSuite
//  @DESC Test ability to load configuration from json file
var configSuite = {
    setUp: function(done) {
        done();
    },
    'no args': function(test) {
        test.expect(2);
        //
        //
        //  @TEST_UNIT_SECTION config access
        //  @TEST test if config can be loaded from file
        //  @EXPECT success
        test.ok(piccanin.config, 'config loads');
        //  @TEST access namespace.config.app.name, test if equal
        //  @EXPECT default app name
        test.equal(piccanin.config.app.name, 'piccanin', 'name is either null or not matchin the one supplied');

        test.done();
    }
};
//
//  @TEST_SUITE namespace.buildnumSuite
//  @DESC Tests functionality to read build number from file and to save increments to file
var buildnumSuite = {
    setUp: function(done) {
        done();
    },
    'no args': function(test) {
        test.expect(2);
        //
        //
        //  @TEST_UNIT_SECTION build number access
        //  @TEST load build number from json and deserialise
        //  @EXPECT to be a number larger than 0/null/false/etc
        test.notEqual(piccanin.build.number, null, 'build number is null or 0');
        //  @TEST increment build by one compare once saved
        //  @EXPECT build number to be more than originaly observed
        var originalBuild = piccanin.build.number;
        //increment the build number
        test.ok(piccanin.build.number, originalBuild, 'build number cant increment');
        test.done();
    }
};
//
//
//  @TEST_SUITE namespace.bus.getHooker
//  @DESC Multi-Test Suite for message queue and messaging services
var bus_getHooker = {
    setUp: function(done) {
        done();
    },
    'no args': function(test) {
        test.expect(3);
        //
        //
        //  @TEST_UNIT_SECTION create new bus
        //  @TEST attempt to create a new hooker
        //  @EXPECT to be a number larger than 0/null/false/etc
        var busControl = require('../../logic/bus/index.js');
        busControl.getHooker('test-suite', function(err, result) {
            test.notEqual(err, true, 'hooker did throw err when getting got');
            test.equal(result.ready, true, 'hooker was not returned');
            test.ok((result.port > 3000), 'bus asigned too low port');
            test.done();
        });

    }
};
//  top level access tests
exports['Top Level Access | Configuration init, values from file and commandline'] = configSuite;
exports['Top Level Access | Increment build number, read build number from file'] = buildnumSuite;
//  bus export object constructor
var busEx = {
    getHooker: bus_getHooker
};
//  message bus tests
exports['Comms Bus Hooker | Initiate a new hooker'] = busEx;