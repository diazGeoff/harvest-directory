var harvestDirectory = function harvestDirectory(directory, harvester) {
    arrayOfFiles = traverseDirectory(directory);
    arrayOfTestFiles = [];
    arrayOfFiles.forEach(function (files) {
        if(harvester(files)){
            arrayOfTestFiles.push(files);
        }
    });
    return arrayOfTestFiles;
}

var traverseDirectory = require("../traverse-directory/traverse-directory");
var arrayOfFiles, arrayOfTestFiles;

( module || {} ).exports.harvestDirectory = harvestDirectory;
