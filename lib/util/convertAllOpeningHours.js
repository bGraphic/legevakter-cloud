var OpeningHourConverter = require("./OpeningHourConverter.js").OpeningHourConverter;
var converter = new OpeningHourConverter();

var Parse = require('parse').Parse;
Parse.initialize("4DECQGbsZc1JkVLi02vuTlRdCaqmB49RC4EDaSIV", "kj3nbsej35OJXCIX1AlV1ILZH8rx8DIqLa1W6g4y");

var query = new Parse.Query("HealthService");
query.limit(270);

query.find({
	success:function(healthServices) {
		console.log("Count: " + healthServices.length);

		convertedHealthServices = [];

		for(var j=0;j<healthServices.length;j++) {
			console.log("Converting health service: " + j);
			var healthService = healthServices[j];
			var openingHours = healthService.get("OpeningHours");
			var convertedOpeningHours = converter.convertToOpeningHours(openingHours);
			healthService.set("SmartOpeningHours", convertedOpeningHours);
			convertedHealthServices.push(healthService);
		}

		console.log("Converted before saving: " + convertedHealthServices.length);

		Parse.Object.saveAll(convertedHealthServices, {
					success: function(healthServices) {
						console.log("Converted opening hours for " 
							+ healthServices.length + " health services!");
					},
					error: function(error) {
						console.log("Failed with error " + JSON.stringify(error));
					}
				});

	},
	error:function(error) {
		console.log("Failed with error " + JSON.stringify(error));
	}
})