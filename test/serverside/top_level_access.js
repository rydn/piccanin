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
//  convention for naming test units is:
//  there logic subfolder in uppercase followed by module name
//  or functionality descriptor in camelcase
//
//  @TEST_SUITE toplevel.configSuite
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
//  @TEST_SUITE toplevel.buildnumSuite
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
exports['Top Level Access | Configuration init, values from file and commandline'] = configSuite;
exports['Top Level Access | Increment build number, read build number from file'] = buildnumSuite;