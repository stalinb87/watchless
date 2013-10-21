#!/usr/bin/env node
var watch = require('watch');
var argv = require('optimist').argv;
var fs = require('fs');
var less = require('less');
var path = require('path');

var output = argv.o;
var file = argv.f;
var folder = argv.d;

//
if(argv.h) {
  console.log('Watch for a entire directory and only compile a specific file');
  console.log('')
  console.log('Usage: watchless [Options]');
  console.log('');
  console.log(' --- Options ---');
  console.log("");
  console.log("   '-o' the output folder");
  console.log("   '-d' the directory to watch");
  console.log("   '-f' the file to compile when there is a change in the directory");
  console.log("   '-h' show the help");
  console.log();
  console.log("All the options are required (for now) later i will make some error checking");
  console.log();
  console.log(" --- Example ---");
  console.log();
  console.log("   watchless -o cssfolder -d lessfolder -f lessfolder/file.less");
  console.log();
  console.log();
  process.exit();
} 
console.log('Waiting for changes in folder '+folder);
var compile = function(f, stat, prev) {
  fs.readFile(file, function(err, content){
    if(err){
      console.log("an error happend while trying to read the file "+file);
      console.log(err);
      process.exit();
    } else {      
      var parser = new (less.Parser)({
        paths:[path.dirname(file)],
        filename:path.basename(file)
      });
      parser.parse(content.toString(), function (err, tree){
        if(err) {
          console.log("an error happend while trying to compile the less file");
          console.log(err);
        }  else {                  
          fileToWrite = path.basename(file, '.less');
          fileToWrite+= ".css";
          outputFile = path.join(output, fileToWrite);
          var css = tree.toCSS({compress:true});
          fs.writeFile(outputFile, css, function (err){
            if(err) {
              trow(err);
              console.log("an error happend while trying to save the file to the output "+ output);
              console.log(err);
            } else {
              console.log('compiled file '+file +' on '+outputFile);
            }
          });
        }
      });
    }
  });
}
compile();
watch.createMonitor(argv.d, function(monitor){
  monitor.on("created", compile);
  monitor.on("changed", compile);
  monitor.on("removed", compile);
}); 
