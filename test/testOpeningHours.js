/**
 * testOpeningHours.js
 *
 * Node.js (mocha, expect.js) tests for OpeningHours module
 * 
 * Copyright: Tom Erik Støwer 2013
 * E-mail: testower@gmail.com
 *
 */

var OpeningHoursModule = require('../lib/model/opening-hours.js');
var OpeningHourRange = OpeningHoursModule.OpeningHourRange;
var OpeningHourTime = OpeningHoursModule.OpeningHourTime;
var OpeningHours = OpeningHoursModule.OpeningHours;
var OpeningHoursFormatter = OpeningHoursModule.OpeningHoursFormatter;

var expect = require('expect.js');

describe('OpeningHours', function () {

	describe('OpeningHourTime', function () {
		describe('constructor', function () {
			var mockAttributes = {
				day: 0,
				hour: 18,
				minute: 30
			};
			var mockObject = new OpeningHourTime(mockAttributes);

			it('should take day, hour and minute attributes in a json and set them properly', function (done) {
				done();
				expect(mockObject.day).to.equal(mockAttributes.day);
				expect(mockObject.hour).to.equal(mockAttributes.hour);
				expect(mockObject.minute).to.equal(mockAttributes.minute);
			});
		});

		describe('isStartOfWeek', function () {
			it('should return true of we are at the start of the week', function (done) {
				done();

				var attributes = {
					day: 0,
					hour: 0,
					minute: 0
				};
				var openingHourTime = new OpeningHourTime(attributes);

				expect(openingHourTime.isStartOfWeek()).to.be.ok();

			});

			it('should return false if we are not at the start of the week', function (done) {
				done();

				var attributes = {
					day:1,
					hour:1,
					minute:1
				};

				var openingHourTime = new OpeningHourTime(attributes);

				expect(openingHourTime.isStartOfWeek()).not.to.be.ok();
			});
		});

		describe('isEndOfWeek', function () {
			it('should return true if we are at the end of the week', function (done) {
				done();
				var attributes = {
					day:6,
					hour:23,
					minute:59
				};
				var openingHourTime = new OpeningHourTime(attributes);

				expect(openingHourTime.isEndOfWeek()).to.be.ok();
			});

			it('should return false if we are not at the end of the week', function (done) {
				done();
				var attributes = {
					day:5,
					hour:22,
					minute:49
				};
				var openingHourTime = new OpeningHourTime(attributes);

				expect(openingHourTime.isEndOfWeek()).not.to.be.ok();
			});
			
		});

		describe('isStartOfWeekend', function () {
			it('should return true of we are at the start of the weekend', function (done) {
				done();
				var attributes = {
					day:3,
					hour:22,
					minute:0
				};

				var openingHourTime = new OpeningHourTime(attributes);

				expect(openingHourTime.isStartOfWeekend()).to.be.ok();
			});
		});

		describe('isEndOfWeekend', function () {
			it('should return true of we are at the end of the weekend', function (done) {
				done();
				var attributes = {
					day:6,
					hour:23,
					minute:59
				};

				var openingHourTime = new OpeningHourTime(attributes);

				expect(openingHourTime.isEndOfWeekend()).to.be.ok();
			});
		});
	});

	describe('OpeningHourRange', function () {
		var startTime = new OpeningHourTime({
			day: 0,
			hour: 18,
			minute: 30
		});
		var endTime = new OpeningHourTime({
			day: 1,
			hour: 7,
			minute: 0
		});
		var mockObject = new OpeningHourRange({
			start: startTime,
			end: endTime
		});

		it('constructor should accept start and end time as OpeningHourTime objects in a json and set them properly', function (done) {
			done();
			
			expect(mockObject.start.day).to.equal(startTime.day);
			expect(mockObject.start.hour).to.equal(startTime.hour);
			expect(mockObject.start.minute).to.equal(startTime.minute);

			expect(mockObject.end.day).to.equal(endTime.day);
			expect(mockObject.end.hour).to.equal(endTime.hour);
			expect(mockObject.end.minute).to.equal(endTime.minute);
		});

		describe('containsDate(date)', function () {

			it('should return true if date is contained in range', function (done) {
				done();
				var date = new Date(2013,3,29,22,00);
				expect(mockObject.containsDate(date)).to.be.ok();
			});

			it('should return false if date is not contained in range', function (done) {
				done();
				var date = new Date(2013,3,30,22,00);
				expect(mockObject.containsDate(date)).not.to.be.ok();
			});
		});

		describe('isAfter(time)', function () {
			var timeToCheckAgainst = new OpeningHourTime({
				day:0,
				hour:18,
				minute:30
			});
			var firstTimeToCheck = new OpeningHourTime({
				day:0,
				hour:18,
				minute:31
			});
			var secondTimeToCheck = new OpeningHourTime({
				day:0,
				hour:19,
				minute:30
			});
			var thirdTimeToCheck = new OpeningHourTime({
				day:1,
				hour:18,
				minute:30
			});

			it('should return true if provided time is after objects time', function (done) {
				done();
				expect(firstTimeToCheck.isAfter(timeToCheckAgainst)).to.be.ok();
				expect(secondTimeToCheck.isAfter(timeToCheckAgainst)).to.be.ok();
				expect(thirdTimeToCheck.isAfter(timeToCheckAgainst)).to.be.ok();
			});

			var fourthTimeToCheck = new OpeningHourTime({
				day:0,
				hour:17,
				minute:30
			});
			var fifthTimeToCheck = new OpeningHourTime({
				day:0,
				hour:18,
				minute:29
			});
			var sixthTimeToCheck = new OpeningHourTime({
				day:0,
				hour:18,
				minute:30
			});

			it('should return false if provided time is not after objects time', function (done) {
				done();
				expect(fourthTimeToCheck.isAfter(timeToCheckAgainst)).not.to.be.ok();
				expect(fifthTimeToCheck.isAfter(timeToCheckAgainst)).not.to.be.ok();
				expect(sixthTimeToCheck.isAfter(timeToCheckAgainst)).not.to.be.ok();
			});
		});

		describe('isBefore(time)', function () {
			var timeToCheckAgainst = new OpeningHourTime({
				day:2,
				hour:19,
				minute:0
			});
			var firstTimeToCheck = new OpeningHourTime({
				day:2,
				hour:18,
				minute:59
			});
			var secondTimeToCheck = new OpeningHourTime({
				day:2,
				hour:17,
				minute:0
			});
			var thirdTimeToCheck = new OpeningHourTime({
				day:1,
				hour:17,
				minute:0
			});

			it('should return true if provided time is before objects time', function (done) {
				done();
				expect(firstTimeToCheck.isBefore(timeToCheckAgainst)).to.be.ok();
				expect(secondTimeToCheck.isBefore(timeToCheckAgainst)).to.be.ok();
				expect(thirdTimeToCheck.isBefore(timeToCheckAgainst)).to.be.ok();
			});

			var fourthTimeToCheck = new OpeningHourTime({
				day:2,
				hour:19,
				minute:0
			});
			var fifthTimeToCheck = new OpeningHourTime({
				day:2,
				hour:20,
				minute:0
			});

			var sixthTimeToCheck = new OpeningHourTime({
				day:3,
				hour:19,
				minute:0
			});

			it('should return false if provided time is not before objects time', function (done) {
				done();
				expect(fourthTimeToCheck.isBefore(timeToCheckAgainst)).not.to.be.ok();
				expect(fifthTimeToCheck.isBefore(timeToCheckAgainst)).not.to.be.ok();
				expect(sixthTimeToCheck.isBefore(timeToCheckAgainst)).not.to.be.ok();
			});
		});

		describe('coversAllWeek', function () {

			it('should return true if range covers the whole week', function (done) {
				done();
				var startTime = new OpeningHourTime({
					day: 0,
					hour: 0,
					minute: 0
				});
				var endTime = new OpeningHourTime({
					day: 6,
					hour: 23,
					minute: 59
				});
				var mockObject = new OpeningHourRange({
					start: startTime,
					end: endTime
				});

				expect(mockObject.coversAllWeek()).to.be.ok();
			});
		});

		describe('coversAllWeekend', function () {
			it('should return true if range covers the whole weekend', function (done) {
				done();
				var startTime = new OpeningHourTime({
					day: 3,
					hour: 22,
					minute: 0
				});
				var endTime = new OpeningHourTime({
					day: 6,
					hour: 23,
					minute: 59
				});
				var mockObject = new OpeningHourRange({
					start: startTime,
					end: endTime
				});

				expect(mockObject.coversAllWeekend()).to.be.ok();

			});
		});
	});

	describe('OpeningHours', function () {
		var firstRange = new OpeningHourRange({
			start: { day: 0, hour: 18, minute: 30 },
			end: { day: 1, hour: 7, minute: 0 }
		});
		var secondRange = new OpeningHourRange({
			start: { day: 1, hour: 18, minute: 30 },
			end: { day: 2, hour: 7, minute: 0 }
		});
		var thirdRange = new OpeningHourRange({
			start: { day: 2, hour: 18, minute: 30 },
			end: { day: 3, hour: 7, minute: 0 }
		});
		var mockObject = new OpeningHours([firstRange, secondRange, thirdRange]);

		it('constructor should take an array of ranges as its argument and set as its ranges attribute', function (done) {
			done();
			expect(mockObject.ranges).to.be.an(Array);
			expect(mockObject.ranges[0]).to.be.equal(firstRange);
		});

		describe('isOpen', function () {

			it('should return true if provided date is contained one of the ranges', function (done) {
				done();
				var date = new Date(2013,3,29,19,30);
				expect(mockObject.isOpen(date)).to.be.ok();
			});

			it('should return false if provided date is not contained in one of the ranges', function (done) {
				done();
				var firstDate = new Date(2013,3,29,17,0);
				var secondDate = new Date(2013,4,1,12,30);
				var thirdDate = new Date(2013,3,26,22,0);
				expect(mockObject.isOpen(firstDate)).not.to.be.ok();
				expect(mockObject.isOpen(secondDate)).not.to.be.ok();
				expect(mockObject.isOpen(thirdDate)).not.to.be.ok();
			});
		});

		describe('isAlwaysOpen', function () {

			it('should return false if we are not always open', function (done) {
				done();
				expect(mockObject.isAlwaysOpen()).not.to.be.ok();
			});

			it('should return true if we are always open', function (done) {
				done();

				var range = new OpeningHourRange({
					start: new OpeningHourTime({ day: 0, hour: 0, minute: 0 }),
					end: new OpeningHourTime({ day: 6, hour: 23, minute: 59 })
				});

				var openingHours = new OpeningHours([range]);

				expect(openingHours.isAlwaysOpen()).to.be.ok();
			});
		});

		describe('isOpenAllWeekend', function () {

			it('should return true if we are open all weekend', function (done) {
				done();
				var range = new OpeningHourRange({
					start: new OpeningHourTime({ day: 3, hour: 22, minute: 0 }),
					end: new OpeningHourTime({ day: 6, hour: 23, minute: 59 })
				});

				var openingHours = new OpeningHours([range]);

				expect(openingHours.isOpenAllWeekend()).to.be.ok();

			});
		});
	});

	describe('OpeningHoursFormatter', function () {
		var formatter = new OpeningHoursFormatter();

		describe('formattedOpeningHours', function () {

			it('should return a string', function (done) {
				done();
				expect(formatter.formattedOpeningHours()).to.be.a('string');
			});

			it('should return appropriately formatted string when always open', function (done) {

				done();

				var range = new OpeningHourRange({
					start: new OpeningHourTime({ day: 0, hour: 0, minute: 0 }),
					end: new OpeningHourTime({ day: 6, hour: 23, minute: 59 })
				});

				var openingHours = new OpeningHours([range]);

				expect(formatter.formattedOpeningHours(openingHours)).to.be("Døgnåpent alle dager.");

				var otherRange = new OpeningHourRange({
					start: new OpeningHourTime({ day: 0, hour: 0, minute: 0 }),
					end: new OpeningHourTime({ day: 5, hour: 23, minute: 59 })
				});

				var otherOpeningHours = new OpeningHours([otherRange]);

				expect(formatter.formattedOpeningHours(otherOpeningHours)).not.to.be("Døgnåpent alle dager.");

			});

			it('should return appropriately formatted string when open on weekends', function (done) {
				done();
				var range = new OpeningHourRange({
					start: new OpeningHourTime({ day: 3, hour: 22, minute: 0 }),
					end: new OpeningHourTime({ day: 6, hour: 23, minute: 59 })
				});

				var openingHours = new OpeningHours([range]);

				expect(formatter.formattedOpeningHours(openingHours)).to.be("Døgnåpent helg.");

			});

			it('should return appropriately formatted string for a set of regular opening hours', function (done) {
				done();
				var range = new OpeningHourRange({
					start: new OpeningHourTime({ day: 0, hour: 15, minute: 0 }),
					end: new OpeningHourTime({ day: 1, hour: 8, minute: 0 })
				});

				var openingHours = new OpeningHours([range]);

				expect(formatter.formattedOpeningHours(openingHours)).to.be("Mandag 15:00 - 08:00");

			});
		});
	});
});