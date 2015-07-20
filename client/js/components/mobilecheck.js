var mobilecheck = function(){
  console.log('in mobile check function...')
  var mobile = false;
  if ($(window).width()<800) {
    var mobile = true;
  }
  return mobile;
}

module.exports = mobilecheck;