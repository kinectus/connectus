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

// setInterval(function(){
//   fs.readFile('../data.txt', function(err, data){
//     if (err){
//       console.log('err', err);
//     } else {
//       console.log('data',data);
//     }
//   })
// }, 10000);


// setInterval(shell.exec, 10000, "OUTPUT=$(hacklet read -n 0x2777 -s 0)");


/* 
target.docs = function(){
  cd __dirname
  mkdir 'docs'
  cd 'lib'
  for file in ls '*.js'
    text = grep '//@', file     # extract special comments 
    text.replace '//@', ''      # remove comment tags 
    text.to 'docs/my_docs.md'
}
*/
