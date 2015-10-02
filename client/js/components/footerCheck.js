var footerCheck = {

  checker: function() {
    if ( ( $('body').height() ) < window.innerHeight - 100) {
      $('.footer-banner').css('position', 'absolute');
      $('.footer-banner').css('top', (window.innerHeight) - 100);
    } else {
      $('.footer-banner').css('position', 'relative');
      $('.footer-banner').css('top', 0);
    }
  }
}

module.exports = footerCheck;
