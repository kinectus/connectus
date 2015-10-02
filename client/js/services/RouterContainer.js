var _router = null;

var Router = {
  set: function(router){
    return _router = router;
  },
  get: function(){
    return _router;
  }
};

module.exports = Router;
