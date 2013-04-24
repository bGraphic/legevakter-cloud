/* LegevaktaCloud */

/* 
  * Free text search
*/
Parse.Cloud.define("searchForHealthServicesWithString", function(request, response) {
	var SearchModule = require('cloud/SearchModule.js');
	var options = {
		searchString : request.params.searchString
	};
	var searchModule = new SearchModule(options);
	searchModule.search({
		success: function(results) {
			response.success(results);
		},
		error: function(error) {
			response.error(error);
		}
	});
});

/**
 * End free text search
 */