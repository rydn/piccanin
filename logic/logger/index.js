//	@CONSTANT loglevels indexed array
var logLevels = [];
//	assign levelname indexed against level urgency
logLevels.verbose = 0;
logLevels.debug = 1;
logLevels.info = 2;
logLevels.warn = 3;
logLevels.error = 4;
logLevels.doom = 5;
//	closured bootstap
var hook = null;


var log = {
	init: function(callback) {
		require('../bus/index.js').getHooker('logger ', function(err, result) {
			console.log(require('util').inspect(result));
			if (err) {
				throw err;
			}
			hook = result.hook;
			callback(hook);
		});
	},
	info: function(message, options) {
		options = (options) || {
			level: logLevels.info,
			levelS: 'info'
		};
		if(!hook)log.init(function(hookpass){

		});
		var logreturn = hook.emit('system_log::' + options.levelS, message);
		return logreturn;
	},
	debug: function(message, options) {
		options = (options) || {
			level: logLevels.debug,
			levelS: 'debug'
		};
		if(!hook)log.init(function(hookpass){

		});
		var logreturn = hook.emit('system_log::' + options.levelS, message);
		return logreturn;
	},
	verbose: function(message, options) {
		options = (options) || {
			level: logLevels.verbose,
			levelS: 'verbose'
		};
		if(!hook)log.init(function(hookpass){

		});
		var logreturn = hook.emit('system_log::' + options.levelS, message);
		return logreturn;
	},
	warn: function(message, options) {
		options = (options) || {
			level: logLevels.warn,
			levelS: 'warn'
		};
		if(!hook)log.init(function(hookpass){

		});
		var logreturn = hook.emit('system_log::' + options.levelS, message);
		return logreturn;
	},
	error: function(message, options) {
		options = (options) || {
			level: logLevels.error,
			levelS: 'error'
		};
		if(!hook)log.init(function(hookpass){

		});
		var logreturn = hook.emit('system_log::' + options.levelS, message);
		return logreturn;
	},
	doom: function(message, options) {
		options = (options) || {
			level: logLevels.doom,
			levelS: 'doom'
		};
		if(!hook)log.init(function(hookpass){

		});
		var logreturn = hook.emit('system_log::' + options.levelS, message);
		return logreturn;
	},
	inspect: function(obj, options) {
		options = (options) || {
			level: logLevels.debug,
			levelS: 'debug',
			data: obj
		};
		if(!hook)log.init(function(hookpass){

		});
		var logreturn = messagebus.op._log(require('util').inspect(obj), options);
		return logreturn;
	}
};