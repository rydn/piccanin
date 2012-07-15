//  @CONSTANT loglevels indexed array
var logLevels = [];
//  assign levelname indexed against level urgency
logLevels.verbose = 0;
logLevels.debug = 1;
logLevels.info = 2;
logLevels.warn = 3;
logLevels.error = 4;
logLevels.doom = 5;
//  closured bootstap
var hook = null;


var log = {
    init: function(callback) {
        require('../bus/index.js').getHooker('logger ', function(err, result) {
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
            levelS: 'info',
            message: message
        };
        if (!hook) log.init(function(hookpass) {

        });
        var logreturn = hook.emit('system_log::' + options.levelS, options);
        return logreturn;
    },
    debug: function(message, options) {
        options = (options) || {
            level: logLevels.debug,
            levelS: 'debug',
            message: message
        };
        if (!hook) log.init(function(hookpass) {

        });
        var logreturn = hook.emit('system_log::' + options.levelS, options);
        return logreturn;
    },
    verbose: function(message, options) {
        options = (options) || {
            level: logLevels.verbose,
            levelS: 'verbose',
            message: message
        };
        if (!hook) log.init(function(hookpass) {

        });
        var logreturn = hook.emit('system_log::' + options.levelS, options);
        return logreturn;
    },
    warn: function(message, options) {
        options = (options) || {
            level: logLevels.warn,
            levelS: 'warn',
            message: message
        };
        if (!hook) log.init(function(hookpass) {

        });
        var logreturn = hook.emit('system_log::' + options.levelS, options);
        return logreturn;
    },
    error: function(message, options) {
        options = (options) || {
            level: logLevels.error,
            levelS: 'error',
            message: message
        };

        if (!hook) log.init(function(hookpass) {

        });
        var logreturn = hook.emit('system_log::' + options.levelS, options);
        return logreturn;
    },
    doom: function(message, options) {
        options = (options) || {
            level: logLevels.doom,
            levelS: 'doom',
            message: message
        };
        if (!hook) log.init(function(hookpass) {
        });
        logreturn = hook.emit('system_log::' + options.levelS, options);
        return logreturn;
    },
    inspect: function(obj, options) {
        options = (options) || {
            level: logLevels.debug,
            levelS: 'debug',
            data: obj,
            inspect: require('util').inspect(obj)
        };
        if (!hook) log.init(function(hookpass) {

        });
        logreturn = hook.emit('system_log::debug',options);
        return logreturn;
    }
};
module.exports = log;