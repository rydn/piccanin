//	@TEST_MODULE_INTERFACE
//	@DESC provides a cli interface and bootloader
//	runs both client and serverside unit tests and provides access to fabric
//
//
//	@MODULE_DEPENDENCY optimist
//	@DESC command line argument parser
//	@PARAM usage | describes to the user how the cli program is opperated
//	@PARAM argv | parses the process.argv object and returns it
var argv = require('optimist').usage('Usage: $0 <test suite, frontside or serverside>').argv;

//	@OBJECT unitsuite
//	@DESC wrapper object for handling individual test suites
var unitsuite = {
	serverside: function(options) {
		//	@MODULE_DEPENDENCY nodeunit_reporter
		//	@DESC test runner for nodeunit
		var reporter = require('nodeunit').reporters['default'];
		//	options or default
		options = (options || {
			tests: 'all'
		});
		return reporter.run(['test/serverside/top_level_access.js']);
	},
	clientside: function(options, callback) {
		//	return vars
		var err, result;
		//	options or default
		options = (options || {
			mode: debug,
			publish: false
		});
		callback(err, result);
	}
};
//	@SECTION cli logic
//	@DESC makes actions based on passed parameters
//
//
//	@GLOBAL_VAR testAction
//	@DESC check if a test suite was supplied if not assume serverside
var testAction = (argv._[0]) || 'serverside';
console.log('---> RIX Fabric Test Runner');
//	main switch
switch (testAction.toLowerCase()) {
case 'serverside':
	console.log('---> serverside tests about to begin...');
	unitsuite.serverside(argv);
	break;
case 'clientside':
	console.log('---> clientside tests about to begin...');
	//TODO
	break;
default:
	unitsuite.serverside(argv);
	break;
}