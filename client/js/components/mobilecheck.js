var mobilecheck = function(){
  var mobile = false;
  if($(window)) {
    if ($(window).width()<800) {
      var mobile = true;
    }
  } else {
    mobile = true;
  }
  return mobile;
}

module.exports = mobilecheck;