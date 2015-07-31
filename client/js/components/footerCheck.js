var footerCheck = {

  checker: function() {
    console.log('checking footer');
    if ( ( $('body').height() ) < window.innerHeight - 100) {
      console.log('body height is less than window inner height')
      $('.footer-banner').css('position', 'absolute');
      $('.footer-banner').css('top', (window.innerHeight) - 160);
    } else {
      console.log('footer is going position relative')
      $('.footer-banner').css('position', 'relative');
      $('.footer-banner').css('top', 0);
    }
  }
}

module.exports = footerCheck;