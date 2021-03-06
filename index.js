//
//
//  Written By Ryan Dick<noxinoobin@gmail.com>
//  No part of this software may be duplicated, modified, retransmitted
//  Or in any way modified without the express consent of the original author
//  Most rights reserved
//
//
//  @APPLICATION piccanin
//  @DESC wraps application startup and exposes globals to submodules
//  connects all components to common RiX Fabric
//
//
//  @DEPENDS
//  @DEPEND_MODULE config-loader | loads configuration from file, commandline and enviromentals
var configloader = require('./logic/global/configloader.js');
//
//
//  @STATIC defaults
//  @DESC defualt configuration parameters
var defaults = {
    build: 3,
    name: "piccanin"
};
//
//
//  @STATIC globalConfigFile
//  @DESC location of global config file
var globalConfigFile = __dirname + '/config/global.json';
var busHook;
//
//
//  @OBJECT piccanin
//  @DESC Exposes global namespace on the serverside
//  @CALLBACK returnState | a object describing the application at startup
//  @RETURNS NULL, false on error
var piccanin = {
    init: function(callback) {
        require('./logic/bus/index.js').getHooker('header-unit-bus', function(err, result) {
            if (err) callback(err, null);
            callback(null, result.hook);
        });
    },
    //  @SUB_OBJECT config
    //  @IMPORT config values[numerouse]
    //  @DESC Import Configuration Data From JSON, ARGV and ENV
    //  @RETURNS global configuration values from multiple sources
    config: configloader(defaults, globalConfigFile, "ARGV", "ENV"),
    //  @SUB_OBJECT build
    //  @IMPORT number buildDate
    //  @DESC Import Build Number From JSON file
    //  @RETURNS build number object
    build: {
        number: require('./logic/global/buildnum.js').get().build,
        buildDate: require('./logic/global/buildnum.js').get().builtOn
    },
    //  @SUB_OBJECT func
    //  @DESC exposes all underlying logic for access in unit tests
    //  and to enable extensions and code level api access without exposing internal workings
    func: {
        //  @SUB_OBJECT_ITEM build number utility
        build: require('./logic/global/buildnum.js'),
        //  @SUB_OBJECT_ITEM build number utility
        config: configloader,

        //  @SUB_OBJECT_ITEM misc utilities and tools
        //  @OBJECT_CHILDREN [guid]
        util: require('./logic/global/util.js'),
        bus: require('./logic/bus/index.js'),
        log: require('./logic/logger/index.js')
    },
    // @SUB_OBJECT cache
    //  @DESC a application wide store for hashes, active objects and any other persisted states
    cache: {
        //  @SUB_OBJECT_ITEM hooks
        //  @DESC container used for storing all available hooker referances
        //  @CACHE_TYPE hook.io hook objects
        hooks: []
    }
};
module.exports = piccanin;
exports.piccanin = piccanin;

//  @BOOTSTRAP
//  @DESC when called init returns a hook that we use as our message bus
piccanin.init(function(err, result) {
    busHook = result;
    piccanin.func.log.init(function(logger) {
        piccanin.func.log.inspect(logger);
    });

});