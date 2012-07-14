//
//
//  Written By Ryan Dick<noxinoobin@gmail.com>
//  No part of this software may be duplicated, modified, retransmitted
//  Or in any way modified without the express consent of the original author
//  Most rights reserved
//
//  @DEPENDS
//	@DEPEND_NPM_MOD | MomentJs for formating date written to build config
var moment = require('moment');
//  @DEPEND_NPM_MOD hookio | network fabric weaver
var _hook = require('hook.io');
//
//	@MODULE_HEADER logic/bus/index.js
//	@DESC this file is used to provide a interface to the underlying logic in folders and files bellow it
//	The bus module provides a application wide access the applications messaging bus
//	this module contains functions for initiating a new bus hook, emitting formated event messages and acting as a delegator
//	in this module a message queing system is also implemented to allow for a transparent multilevel queue system
//	This module does not run as a service but rather supplies all the functionality for others to
var messageBus = {
	//	@SUB_OBJECT busOp
	//	@DESC object container for all operations pertaining to message transmision and signaling
	//	at its core it provides hooks for application messages such as logging, metrics and data access
	//	it does not provide the logic for these steps but rather provides interfaces and routing to exposed handlers
	busOp: {
		//	@FUNCTION messagebus.busOp.init
		//	@DESC initialise the opperator and callback with control object
		//	@CALLBACK error and/or hook object
		init: function(options, callback) {
			//	test if is function(callback passed instead of options)
			//	if so make options null so it is caught by the parent if and make callback options
			if ( !! (options && options.constructor && options.call && options.apply)) {
				callback = options;
				options = null;
			}
			options = (options) || {
				name: 'busOp',
				debug: true,
				eventLog: true,
				loglevel: 'debug'
			};

		}
	},
	//
	//
	//	@FUCTION getHooker
	//	@DESC creates a new hooker with options, takes not of it and returns the hooker in callback
	//	@CALLBACK Error, RiX-Fabric Hooker
	getHooker: function(name, options, callback) {
		//	will contain the information we will use in the callback
		var retObj = {};
		//	if no name callback with error
		if (!name) {
			callback('no name supplied!', null);
		}
		//	test if options have been passed
		if (options) {
			//	test if is function(callback passed instead of options)
			//	if so make options null so it is caught by the parent if and make callback options
			if ( !! (options && options.constructor && options.call && options.apply)) {
				callback = options;
				options = null;
			}
			//	test options if no options set default
			options = (options) || {
				loglevel: 'info',
				power: 1,
				exponent: 3,
				debug: true
			};
		} else {
			//	if no options set default
			options = {
				loglevel: 'info',
				power: 1,
				exponent: 3,
				debug: true
			};
		}

		//	create hooker object
		var hook = _hook.createHook({
			name: name,
			debug: options.debug
		});
		//	attempt to search for a open port
		hook.findPort(function(err, result) {
			retObj = {
				port: result,
				options: options,
				listening: false,
				started: false,
				ready:false
			};
			//start hooker once a open port is found
			hook.start();
		});
		//	@SECTION hook event handlers
		//
		//
		//	@EVENT_HANDLE hook::listening
		//	@DESC hookers first event, new hooker is ready for new connection, change retObj.listening
		hook.on('hook::listening', function() {
			retObj.listening = true;
		});
		//	@EVENT_HANDLE hook::started
		//	@DESC hooker is attempting to bind to port and find other fabric threads, change retObj.started
		hook.on('hook::listening', function() {
			retObj.started = true;
		});
		//	@EVENT_HANDLE hook::ready
		//	@DESC on hooker connect callback as service is up and running, change retObj.ready
		hook.on('hook::ready', function() {
			retObj.ready = true;
			callback(null, retObj);
		});
	}
};
module.exports = messageBus;