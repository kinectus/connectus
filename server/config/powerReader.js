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

setInterval(shell.exec, 10000, "hacklet read -n 0x2777 -s 0 > data.txt | cat");

setInterval(function(){
  fs.readFile('data.txt', 'utf-8', function(err, data){
    if (err){
      console.log('err', err);
    } else {
      // console.log('data',data);
      var arr = data.split('\n');
      getWatts(arr[arr.length-3]);
      console.log('split', arr[arr.length-3]);
    }
  })
}, 10000);

// split I, [2015-07-13T20:06:15.137579 #84220]  INFO -- : 45w at 2015-07-13 20:06:01 -0700
var total = 0;
var getWatts = function(string){
  var start = string.indexOf(': ')+2;
  var end = string.indexOf('w');
  var watts = string.slice(start, end);
  watts = parseInt(watts);
  if (end > 0){
    total += watts;
  }
  console.log('total: ', total, 'start: ', start, 'end: ', end);
}