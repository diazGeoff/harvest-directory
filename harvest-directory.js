var traverseDirectory = function traverseDirectory(dir, filelist) {
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory() && file.charAt(0) != '.') {
            filelist = traverseDirectory(dir + file + '/', filelist);
        }
        else if(file.charAt(0) != '.'){
            filelist.push(dir + file);
        }
    });
    return filelist;
};

var configurationParser = function configurationParser(dataToParse){
    dataToParse = dataToParse.replace(/\n/gm, '');
    var commands = dataToParse.match(/\/\*:.+\*\//m);
    var moduleObject = (commands ? commands[0] : "").match(/@module-configuration:(.+)@end-module-configuration/m);
    var parsedData = JSON.parse(moduleObject ? moduleObject[1] : "{}");
    if(parsedData){
        return parsedData;
    }
    return false;
}

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

var fs = require("fs");
var arrayOfFiles, arrayOfTestFiles;

( module || {} ).exports.harvestDirectory = harvestDirectory;
( module || {} ).exports.configurationParser = configurationParser;
