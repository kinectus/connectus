// var CronJob = require('cron').CronJob;
// // creates a job that will be executed on the terminal
// module.exports = new CronJob('*/10 * * * * *', function() {
//   console.log('You will see this message every 10 seconds');
// }, null, true, 'America/Los_Angeles');

// //perhaps
// // set up the cron job on the terminal
// // set up another cronjob to write the information to a file in this directory?
// //0xc528100000584f80 on network 0x2777

var shell = require('shelljs');
var make = require('shelljs/make');
var fs = require('fs');
var watch = require('node-watch');

// Total wattage since start
var total = 0;
// Grab wattage information from string
var getWatts = function(string){
  var start = string.indexOf(': ')+2;
  var end = string.indexOf('w');
  var watts = string.slice(start, end);
  watts = parseInt(watts);
  if (end > 0){
    total += watts;
  }
  // console.log('string: ', string, ' total: ', total, ' start: ', start, ' end: ', end, ' watts: ', watts);
  console.log('total: ', total);
  cbDone = true;
}

var cbDone = false;
var input;

// Executes hardware query on CL > writes result to data.txt > initiates readLines
var execute = function(command){
  shell.exec.apply(null, [command]);
  input = fs.createReadStream('data.txt', 'utf8');
  readLines(input, getWatts);
};

// Runs execute every 10s
setInterval(execute, 10000, "hacklet read -n 0x2777 -s 0 >> data.txt | cat");

// Executes callback with data.txt and then erases data.txt when done
var readLines = function(input, cb) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      var length = line.length;
      if (length > 74){
        cb(line);
      }
      last = index + 1;
      index = remaining.indexOf('\n', last);
    }
    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      cb(remaining);
    }
    fs.writeFile('data.txt', '', function(){console.log('ERASED DATA.TXT')});
  });
};

// Commented code contains parts of previous strategy without data erase
// // COMMENTS ON GRABBING LAST 7 LINES
// var readFile = function(cb){
//   fs.readFile('data.txt', 'utf-8', function(err, data){
//     if (err){
//       console.log('err', err);
//     } else {
//       // console.log('data',data);
//       // Grab last 7 lines
//       // var section = 
//       var arr = data.split('\n');
//       line = arr[arr.length-3];
//       cb(line);
//       console.log('split', arr[arr.length-3]);
//     }
//   })
// };

//fs.writeFile('/path/to/file', '', function(){console.log('done')})
//{ recursive: false },

// watch('data.txt', { recursive: false }, function(){ readFile(getWatts); });


// split I, [2015-07-13T20:06:15.137579 #84220]  INFO -- : 45w at 2015-07-13 20:06:01 -0700
