//
//
//  Written By Ryan Dick<noxinoobin@gmail.com>
//  No part of this software may be duplicated, modified, retransmitted
//  Or in any way modified without the express consent of the original author
//  Most rights reserved
//
//
//  @MODULE global/config-loader
//  @DESC Provides application wide config values by parsing files and from commandline
//
//
//  @DEPENDS
//  @DEPEND_MODULE optimist | used for access to command line parameters
var optimist = require('optimist'),
  argv = optimist.argv;

// optimist provides these, we don't want them.
delete argv['_'];
delete argv['$0'];
//
//
//  @FUCTION getfil
//  @DESC deserialises config from json file
var getFile = function(filename) {
    var file;
    try {
      file = require(filename);
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new Error("Config: Syntax error in file '" + filename + "': " + e.message);
      } else if (e.message.match(/^Cannot find module/)) {
        throw new Error("Config: Can't find file '" + filename + "'");
      } else {
        throw e;
      }
    }
    return file;
  };
//
//
//  @FUCTION getfile
//  @DESC Get the enviroment
//  env will be "local" unless `env` is passed as a command
//  line argument, or the NODE_ENV environment variable is set.
var getEnvironment = function() {
    var env;
    if (argv.hasOwnProperty('env')) {
      env = argv.env;
    } else if (typeof process.env.NODE_ENV === 'string') {
      env = process.env.NODE_ENV;
    } else {
      env = 'local';
    }
    return env;
  };
//
//
//  @FUCTION mergeConfig
//  @DESC Merge two objects together.
//  The second object wins if the both have
//  the same property.
var mergeConfig = function(configA, configB) {
    var merged = {},
      hop = Object.prototype.hasOwnProperty;
    for (var i in configA) {
      if (hop.call(configA, i)) {
        merged[i] = configA[i];
      }
    }
    for (var ii in configB) {
      if (hop.call(configB, ii)) {
        merged[ii] = configB[ii];
      }
    }
    return merged;
  };
//
//
//  @OBJECT fig
//  @DESC The magic we export.
//  This funcion combines everything into one object.
//  It is the essence of awesomeness.
//  @RETURNS global configuration
//  @PARAM defaults | defaults to overide existing config
//  @PARAM filename | path where configuration is stored
//  @PARAM args | command line arguments
//  @PARAM env | enviromentals
var fig = function() {
    var args = Array.prototype.slice.call(arguments);
    var config = {};
    config.env = getEnvironment();
    for (var i = 0; i < args.length; ++i) {
      if (typeof args[i] === "string") {
        if (args[i] === "ENV") {
          config = mergeConfig(config, process.env);
        } else if (args[i] === "ARGV") {
          config = mergeConfig(config, argv);
        } else {
          config = mergeConfig(config, getFile(args[i]));
        }
      } else if (typeof args[i] === "object") {
        config = mergeConfig(config, args[i]);
      }
    }
    return config;
  };

// attach env to config
fig.env = getEnvironment();

// set NODE_ENV, in case we got it from somwhere else
process.env['NODE_ENV'] = fig.env;

module.exports = fig;