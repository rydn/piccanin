//
//
//	Written By Ryan Dick<noxinoobin@gmail.com>
//	No part of this software may be duplicated, modified, retransmitted
//	Or in any way modified without the express consent of the original author
//	Most rights reserved
//
//
//	@APPLICATION piccanin
//	@DESC wraps application startup and exposes globals to submodules
//	connects all components to common RiX Fabric
//
//
//  @DEPENDS
//  @DEPEND_MODULE config-loader | loads configuration from file, commandline and enviromentals
var configloader = require('./logic/global/configloader.js');

//	@STATIC defaults
//	@DESC defualt configuration parameters
var defaults = {
	build: 3,
	name: "piccanin"
};
//
//
//	@STATIC globalConfigFile
//	@DESC location of global config file
var globalConfigFile = __dirname + '/config/global.json';
//
//
//	@OBJECT piccanin
//	@DESC Exposes global namespace on the serverside
//	@CALLBACK returnState | a object describing the application at startup
//	@RETURNS NULL, false on error
var piccanin = {
	//	@IMPORT config
	//	@DESC Import Configuration
	//	@RETURNS global configuration values
	//	@TYPE var_import
	config: configloader(defaults, globalConfigFile, "ARGV", "ENV")
};