var mobilecheck = function(){
  var mobile = false;
  console.log('in mobile check.')
  if($(window)) {
    console.log('found a windowww')
    if ($(window).width()<800) {
      console.log('setting mobile to true')
      var mobile = true;
    }
  } else {
    mobile = true;
  }
  return mobile;
}

module.exports = mobilecheck;