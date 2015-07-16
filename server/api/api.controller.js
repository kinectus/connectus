var db = require('../config/db/config');
var Outlets = require('../outlets/outlets.collection');
var Outlet = require('../outlets/outlet.model')

module.exports = {

  getAllOutlets: function(req, res) {
    Outlets.reset().fetch().then(function(outlets) {
      res.send(outlets)
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },

  addOutlet: function(req, res) {
    console.log('IN API.CONTROLLER, req', req);
    var data = req.body;
    console.log('IN API.CONTROLLER, ADDOUTLET', data);
    new Outlet({
      name: data.name,
      priceEnergy: data.charge,
      // priceHourly: data.priceHourly,
      // lat: data.lat,
      // long: data.long,
      description: data.description,
      // priceSuggest: data.priceSuggest,
      address: data.address,
      voltage: data.voltage
    }).fetch().then(function(found) {
      if (found) {
        res.send(200, found.attributes);
      } else {
        var outlet = new Outlet({
          name: data.name,
          priceEnergy: data.charge,
          // priceHourly: data.priceHourly,
          // lat: data.lat,
          // long: data.long,
          description: data.description,
          // priceSuggest: data.priceSuggest,
          address: address,
          voltage: data.voltage
        });

        outlet.save().then(function(newOutlet){
          Outlets.add(newOutlet);
          res.send(200, newOutlet);
        });
      }
    });
  }

};

/*
app.post('/links', util.checkUser, function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  new Link({ url: uri }).fetch().then(function(found) {
    if (found) {
      res.send(200, found.attributes);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }

        var link = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin
        });

        link.save().then(function(newLink) {
          Links.add(newLink);
          res.send(200, newLink);
        });
      });
    }
  });
  */