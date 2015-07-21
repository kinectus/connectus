var mobilecheck = function(){
  var mobile = false;
  if ($(window).width()<800) {
    var mobile = true;
  }
  return mobile;
}

module.exports = mobilecheck;