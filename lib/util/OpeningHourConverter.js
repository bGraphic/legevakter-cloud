/**
 * OpeningHourConverter.js
 *
 * Converts OpeningHours from data.helsenorge.no (health services) format to our format
 * 
 * Copyright: Tom Erik Støwer 2013
 * E-mail: testower@gmail.com
 *
 */

var OpeningHoursModule = require('../model/OpeningHours.js');
var OpeningHourRange = OpeningHoursModule.OpeningHourRange;
var OpeningHourTime = OpeningHoursModule.OpeningHourTime;
var OpeningHours = OpeningHoursModule.OpeningHours;

function OpeningHourConverter () {
	// handle options here - typically, start day of week etc.
}

OpeningHourConverter.prototype.convertToOpeningHours = function (input) {
	var intervals = input.split(",");
	var ranges = [];
	for ( i=0; i<intervals.length; i++ ) {
		var range = this._convertIntervalToRange(intervals[i]);
		ranges.push(range);
	}
	var openingHours = new OpeningHours(ranges);
	return openingHours;
}

OpeningHourConverter.prototype._convertIntervalToRange = function (interval) {
	var components = interval.split("-");
	var openingHourRange = new OpeningHourRange({
		start: this._convertMinuteStampToOurTime(components[0]),
		end: this._convertMinuteStampToOurTime(components[1])
	});
	return openingHourRange;
}

OpeningHourConverter.prototype._convertMinuteStampToOurTime = function (minuteStamp) {
	var openingHourTime = new OpeningHourTime({
		day: Math.floor(minuteStamp / 1440),
		hour: Math.floor((minuteStamp % 1440) / 60),
		minute: (minuteStamp % 1440) % 60
	});
	return openingHourTime;
}
exports.OpeningHourConverter = OpeningHourConverter;