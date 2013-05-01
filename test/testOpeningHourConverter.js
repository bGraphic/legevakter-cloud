/**
 * testOpeningConverter.js
 *
 * Node.js (mocha, expect.js) tests for OpeningHourConverter module
 * 
 * Copyright: Tom Erik Støwer 2013
 * E-mail: testower@gmail.com
 *
 */

var OpeningHoursModule = require('../lib/model/opening-hours.js');
var OpeningHourRange = OpeningHoursModule.OpeningHourRange;
var OpeningHourTime = OpeningHoursModule.OpeningHourTime;
var OpeningHours = OpeningHoursModule.OpeningHours;

var OpeningHourConverter = require('../lib/util/OpeningHourConverter.js').OpeningHourConverter;
var converter = new OpeningHourConverter();

var expect = require('expect.js');

describe('OpeningHourConvert', function () {
	describe('convertOpeningHours', function () {

		var data = "480-945,1920-2385,3360-3825,4800-5265,6240-6705";
		var output = converter.convertToOpeningHours(data);

		it('returns an object of type OpeningHours', function (done) {
			done();
			expect(output).to.be.an(OpeningHours);
		});

		it('returns OpeningHours with 5 ranges', function (done) {
			done();
			expect(output.ranges.length).to.be(5);
		});

		it('returns OpeningHours that is open on the appropriate date', function (done) {
			done();
			var date = new Date(2013,3,30,14,00);
			var secondDate = new Date(2013,3,30,22,00);
			expect(output.isOpen(date)).to.be.ok();
			expect(output.isOpen(secondDate)).not.to.be.ok();
		});
	});

	describe('_convertIntervalToRange', function () {
		var interval = "930-1920";
		var output = converter._convertIntervalToRange(interval);

		it('returns an object of type OpeningHourRange', function (done) {
			done();
			expect(output).to.be.an(OpeningHourRange);
		});

		it('returns OpeningHourRange with correct times', function (done) {
			done();
			var start = output.start;
			var end = output.end;

			expect(start.day).to.be(0);
			expect(start.hour).to.be(15);
			expect(start.minute).to.be(30);

			expect(end.day).to.be(1);
			expect(end.hour).to.be(8);
			expect(end.minute).to.be(0);
		});	
	});

	describe('_convertMinuteStampToOurTime', function () {
		var minuteStamp = 930;
		var output = converter._convertMinuteStampToOurTime(minuteStamp);

		it('returns an object of type OpeningHourTime', function (done) {
			done();
			expect(output).to.be.an(OpeningHourTime);
		});

		it('returns OpeningHourTime with correct day, hour and minute', function (done) {
			done();
			expect(output.day).to.be(0);
			expect(output.hour).to.be(15);
			expect(output.minute).to.be(30);
		});
	});
});


