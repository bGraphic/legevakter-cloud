/**
 * OpeningHours.js - Handles business hour logic and formatting
 * Designed to work in Parse.com, backbone and Node.js environments
 * 
 * Copyright: Tom Erik Støwer 2013
 * E-mail: testower@gmail.com
 *
 */

// This module requires 'moment.js' => http://momentjs.com/
var moment = require('moment');

/**
 * OpeningHourRange
 */
function OpeningHourRange (attributes) {
	this.start = attributes.start;
	this.end = attributes.end;	
}

OpeningHourRange.prototype.containsDate = function (date) {
	
	var timeToCheck = new OpeningHourTime({
		day: moment(date).day(),
		hour: moment(date).hour(),
		minute: moment(date).minute()
	});

	return timeToCheck.isAfter(this.start) && timeToCheck.isBefore(this.end);
}

/**
 * OpeningHourTime
 */
function OpeningHourTime (attributes) {
	this.day = attributes.day;
	this.hour = attributes.hour;
	this.minute = attributes.minute;
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
	this.ranges = ranges;
}

OpeningHours.prototype.isOpen = function (date) {
	for(i=0;i<this.ranges.length;i++) {
		if ( this.ranges[i].containsDate(date) )
			return true;
	}
	return false;
}

exports.OpeningHourRange = OpeningHourRange;
exports.OpeningHourTime = OpeningHourTime;
exports.OpeningHours = OpeningHours;