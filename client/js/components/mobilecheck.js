var mobilecheck = function(){
  var mobile = false;
  // if($(window)) {
  //   if ($(window).width()<800) {
  //     var mobile = true;
  //   }
  // } else {
  //   mobile = true;
  // }
  if( navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
   ){
      mobile = true;
    }

  return mobile;


}

module.exports = mobilecheck;