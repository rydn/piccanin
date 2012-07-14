//
//
//	Written By Ryan Dick<noxinoobin@gmail.com>
//	No part of this software may be duplicated, modified, retransmitted
//	Or in any way modified without the express consent of the original author
//	Most rights reserved
//
//
//	@DEPENDS
//	@NATIVE_DEPEND | file system access
var fs = require('fs');
//	@DEPEND_NPM_MOD | MomentJs for formating date written to build config
var moment = require('moment');
//	@MODULE
//	@OBJECT buildnum
//	@DESC handles accessing and incrementing build numbers
module.exports = {
	//
	//
	//  @FUCTION global/buildnum/get
	//  @DESC reads the build config file and returns its current build number
	get: function() {
		//	read in string from json file
		var buildObj = fs.readFileSync('./config/buildnum.json');
		//	deserialize and return
		return JSON.parse(buildObj);
	},
	//
	//
	//  @FUCTION global/buildnum/get
	//  @DESC reads the build config and increases by supplied param
	//	or by 1 by default
	//	@PARAM ammount to increment the build number by
	//	@RETURNS new build object
	inc: function(incBy) {
		incBy = (incBy) || 1;
		//	read in string from json file
		var buildObj = fs.readFileSync('./config/buildnum.json');
		//	deserialize
		buildObj = JSON.parse(buildObj);
		//	increment
		buildObj.build = buildObj.build + incBy;
		//	set build date
		buildObj.builtOn = moment().format("DD/MM/YYYY, h:mm:ss");
		//	write the modified object to file then return
		fs.writeFileSync('./config/buildnum.json', JSON.stringify(buildObj));
		//	read in string from json file
		var buildObjRefresh = fs.readFileSync('./config/buildnum.json');
		//	deserialize and return
		return JSON.parse(buildObjRefresh);
	}
};