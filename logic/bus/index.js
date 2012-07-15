//
//
//  Written By Ryan Dick<noxinoobin@gmail.com>
//  No part of this software may be duplicated, modified, retransmitted
//  Or in any way modified without the express consent of the original author
//  Most rights reserved
//
//
//  @DEPENDS
//	@DEPEND_NPM_MOD | MomentJs for formating date written to build config
var moment = require('moment');
//  @DEPEND_NPM_MOD hookio | network fabric weaver
var _hook = require('hook.io');
//	@REFLECTIVE_DEP piccanin
var piccanin = require('../../index.js');
//
//
var busHook = {};

//	@MODULE_HEADER logic/bus/index.js
//	@DESC this file is used to provide a interface to the underlying logic in folders and files bellow it
//	The bus module provides a application wide access the applications messaging bus
//	this module contains functions for initiating a new bus hook, emitting formated event messages and acting as a delegator
//	in this module a message queing system is also implemented to allow for a transparent multilevel queue system
//	This module does not run as a service but rather supplies all the functionality for others to
var messageBus = {
    //	@SUB_OBJECT op
    //	@DESC object container for all operations pertaining to message transmision and signaling
    //	at its core it provides hooks for application messages such as logging, metrics and data access
    //	it does not provide the logic for these steps but rather provides interfaces and routing to exposed handlers
    //	@NAMESPACE <namespace>.bus.log.<command>
    //	@PUBLIC_INTERFACE log writter access
    //	@DESC accept various logger levels, they add modifiers in options then pass to proxy
    log:require('../logger/index.js'),
    //
    //
    //	@FUCTION getHooker
    //	@DESC creates a new hooker with options, takes not of it and returns the hooker in callback
    //	@CALLBACK Error, RiX-Fabric Hooker
    getHooker:function (name, options, callback) {
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
            if (!!(options && options.constructor && options.call && options.apply)) {
                callback = options;
                options = null;
            }
            //	test options if no options set default
            options = (options) || {
                loglevel:'info',
                power:1,
                exponent:3,
                debug:true
            };
        } else {
            //	if no options set default
            options = {
                loglevel:'info',
                power:1,
                exponent:3,
                debug:true
            };
        }

        //	create hooker object
        var hook = _hook.createHook({
            name:name,
            debug:options.debug
        });
        //	attempt to search for a open port
        hook.findPort(function (err, result) {
            retObj = {
                port:result,
                options:options,
                listening:false,
                ready:false,
                hook:null,
                id:genUUID()
            };
            //start hooker once a open port is found
            hook.start();
        });
        //	@SECTION hook event handlers
        //	@DESC binds to hook events, and collects metrics and logs events
        //	some events are rerouted to the op like when a hook connects or disconnects
        //	most of these hooks are for the purpose of keeping a record of hook state
        //
        //
        //	@EVENT_HANDLE hook::listening
        //	@DESC hookers first event, new hooker is ready for new connection, change retObj.listening
        hook.on('hook::listening', function () {
            retObj.listening = true;
        });
        //	@EVENT_HANDLE hook::ready
        //	@DESC on hooker connect callback as service is up and running, change retObj.ready
        hook.on('hook::ready', function () {
            retObj.ready = true;
            //	emmit a message informing other hooks of start through the system_even_log bus
            hook.emit('system_log::event', retObj);
            //	add new created hook to global hooker cache
            messageBus.hooks.push(hook);
            //	add hook to return object
            retObj.hook = hook;
            callback(null, retObj);
        });
        //	@EVENT_HANDLE hook::error
        //	@DESC occures when a message fails to transmit or a hook is unable to connect
        hook.on('hook::error', function () {
            //syslog emitt
            console.log('hooker pusher died with and error, this is WORRYSOME');
            callback('hooker failed to bind', null);
        });
    },
    hooks: []
};
function genUUID() {
            var s = [],
                itoh = '0123456789ABCDEF';

            //  Make array of random hex digits. The UUID only has 32 digits in it, but we
            //  allocate an extra items to make room for the '-'s we'll be inserting.
            for (var i = 0; i < 36; i++) s[i] = Math.floor(Math.random() * 0x10);

            //  Conform to RFC-4122, section 4.4
            s[14] = 4; // Set 4 high bits of time_high field to version
            s[19] = (s[19] & 0x3) | 0x8; // Specify 2 high bits of clock sequence
            //  Convert to hex chars
            for (var ii = 0; ii < 36; ii++) s[ii] = itoh[s[ii]];

            //  Insert '-'s
            s[8] = s[13] = s[18] = s[23] = '-';

            return s.join('');
        }
module.exports = messageBus;