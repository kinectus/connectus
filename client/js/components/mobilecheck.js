var mobilecheck = function(){
  var mobile1 = false;
  var mobile2 = false;

  if ($(window).width()<800) {
    var mobile1 = true;
  }

  if( navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
   ){
      mobile2 = true;
    }

  return (mobile1 || mobile2);


}

module.exports = mobilecheck;