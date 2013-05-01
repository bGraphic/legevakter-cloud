/**
 * OpeningHours.js - Handles business hour logic and formatting
 * Designed to work in Parse.com, web and Node.js environments
 * 
 * Copyright: Tom Erik Støwer 2013
 * E-mail: testower@gmail.com
 *
 */

 // This module requires 'moment.js' => http://momentjs.com/
 // If used in browser: 
 // <script src="https://raw.github.com/timrwood/moment/2.0.0/min/moment.min.js"></script>
 if (!moment)
 	var moment = require('moment');

 (function(exports) {
 	/**
 	 * OpeningHourRange
 	 */
 	function OpeningHourRange (attributes) {
 		if (attributes && attributes.start && attributes.end) {
 			this.start = attributes.start;
 			this.end = attributes.end;	
 		}
 	}

 	OpeningHourRange.prototype.containsDate = function (date) {
 		var offsetDay = moment(date).day();
 		if (offsetDay == 0)
 			offsetDay = 6;
 		else
 			offsetDay = offsetDay - 1;

 		var timeToCheck = new OpeningHourTime({
 			day: offsetDay, // offset
 			hour: moment(date).hour(),
 			minute: moment(date).minute()
 		});

 		return timeToCheck.isAfter(this.start) && timeToCheck.isBefore(this.end);
 	}

 	/**
 	 * OpeningHourTime
 	 */
 	function OpeningHourTime (attributes) {
 		if (attributes
 			&& attributes.day != null
 			&& attributes.hour != null
 			&& attributes.minute != null) {
 			this.day = attributes.day;
 			this.hour = attributes.hour;
 			this.minute = attributes.minute;
 		}
 	}

 	OpeningHourTime.prototype.isAfter = function(time) {
 		if ( this.day > time.day )
 			return true;
 		else if ( this.day == time.day ) {
 			if ( this.hour > time.hour )
 				return true
 			else if ( this.hour == time.hour ) {
 				if ( this.minute > time.minute )
 					return true;
 				else
 					return false;
 			} else
 				return false;
 		} else
 			return false;
 	}

 	OpeningHourTime.prototype.isBefore = function(time) {
 		if ( this.day < time.day )
 			return true;
 		else if ( this.day == time.day ) {
 			if ( this.hour < time.hour )
 				return true;
 			else if ( this.hour == time.hour ) {
 				if ( this.minute < time.minute )
 					return true;
 				else
 					return false;
 			} else
 				return false;
 		} else
 			return false;
 	}

 	/**
 	 * OpeningHours
 	 */
 	function OpeningHours (ranges) {
 		this.ranges = [];
 		if (Object.prototype.toString.call( ranges ) === '[object Array]' )
 			this.ranges = ranges;
 		else {
 			// build object from JSON
 			for (var i=0;i<ranges.ranges.length;i++) {
 				var openingHourRange = new OpeningHourRange(ranges.ranges[i]);
 				this.ranges.push(openingHourRange);
 			}
 		}

 		this.__type = "OpeningHours";
 	}



 	OpeningHours.prototype.isOpen = function (date) {
 		if (!date)
 			date = new Date();
 		for(i=0;i<this.ranges.length;i++) {
 			if ( this.ranges[i].containsDate(date) )
 				return true;
 		}
 		return false;
 	}

	exports.OpeningHourRange = OpeningHourRange;
 	exports.OpeningHourTime = OpeningHourTime;
 	exports.OpeningHours = OpeningHours;		

 })(typeof exports === 'undefined' ? this['OpeningHoursModule']={}: exports);
