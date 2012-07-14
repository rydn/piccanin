//
//
//  Written By Ryan Dick<noxinoobin@gmail.com>
//  No part of this software may be duplicated, modified, retransmitted
//  Or in any way modified without the express consent of the original author
//  Most rights reserved
//
//  @DEPENDS
//  @DEPEND_NPM_MOD hookio | network fabric weaver
var hookio = require('hook.io');
//
//	@MODULE_HEADER logic/bus/index.js
//	@DESC this file is used to provide a interface to the underlying logic in folders and files bellow it
//	The bus module provides a application wide access the applications messaging bus
//	this module contains functions for initiating a new bus hook, emitting formated event messages and acting as a delegator
//	in this module a message queing system is also implemented to allow for a transparent multilevel queue system
//	This module does not run as a service but rather supplies all the functionality for others to
var messageBus = {
	//	@FUCTION getHooker
	//	@DESC creates a new hooker with options, takes not of it and returns the hooker in callback
	//	@CALLBACK Error, RiX-Fabric Hooker
	getHooker: function(name, options, callback) {
		//	if no name callback with error
		if (!name) callback('no name supplied!', null);
		//if no options passed assign defaults 
		options = (options.typeOf(object))|| {loglevel:info, power:1, exponent:3};

	}
};
