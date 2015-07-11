var _router = null;

var Router = {
  set: function(router){
    _router = router;
  },
  get: function(){
    return _router;
  }
};

module.exports = Router;