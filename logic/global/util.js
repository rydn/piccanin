//
//
//  Written By Ryan Dick<noxinoobin@gmail.com>
//  No part of this software may be duplicated, modified, retransmitted
//  Or in any way modified without the express consent of the original author
//  Most rights reserved
//
//
//	@OBJECT util
//	@DESC some utilities required globaly, this module is exposed in the namespace index.js file
//	@EXPOSED_NAMESPACE namespace.func.util
var util = {
	//	@FUNCTION messagebus.busOp.init
	//	@DESC initialise the opperator and callback with control object
	//	@RETURNS a 32 char string for use as ids
	guid: function() {
		var s = [],
			itoh = '0123456789ABCDEF';

		//	Make array of random hex digits. The UUID only has 32 digits in it, but we
		//	allocate an extra items to make room for the '-'s we'll be inserting.
		for (var i = 0; i < 36; i++) s[i] = Math.floor(Math.random() * 0x10);

		//	Conform to RFC-4122, section 4.4
		s[14] = 4; // Set 4 high bits of time_high field to version
		s[19] = (s[19] & 0x3) | 0x8; // Specify 2 high bits of clock sequence
		//	Convert to hex chars
		for (var ii = 0; ii < 36; ii++) s[ii] = itoh[s[ii]];

		//	Insert '-'s
		s[8] = s[13] = s[18] = s[23] = '-';

		return s.join('');
	}
};
//	@MODULE_EXPORT
module.exports = util;