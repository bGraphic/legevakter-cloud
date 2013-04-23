var SSRImporter = require("./SSRImporter.js").SSRImporter;
var importer = new SSRImporter();

var optionFlag = process.argv[2];

if (optionFlag === "--file") {
	var fileName = process.argv[3];
	if (fileName) {
		importer.importFromFile(fileName, {
			success: function(message) {
				console.log("Succeeded with message: " + message);
			},
			error: function(error) {
				console.log("Error importing file: " + error);
			}
		});
	}
} else if (optionFlag === "--folder") {
	var folderName = process.argv[3];
	if (folderName) {
		var fs = require("fs");
		fs.readdir(folderName, function(err, files) {
			files.forEach(function(file) {
				file = folderName + file;
				importer.importFromFile(file, {
					success: function(message) {
						console.log("Imported file " + file + " " + message);
					},
					error: function(error) {
						console.log("Error importing file: " + error);
					}
				});
			});
		});
	}
} else {
	console.log("Usage: --file <file path> or --folder <folder path>");
}

