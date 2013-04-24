/**
 * OpeningHours.js - Parse Cloud Module for "Legevakter"
 *
 * 
 * Copyright: Tom Erik Støwer 2013
 * E-mail: testower@gmail.com
 *
 */

 var moment = require('moment');
 var twix = require('cloud/twix.min.js');
 
 var OpeningHours = Parse.Object.extend("OpeningHours", {
 	hello: function() {
 		console.log("Hello");
 	}
 	// instance
 }, {
 
 	// class
 });
 exports.OpeningHours = OpeningHours;