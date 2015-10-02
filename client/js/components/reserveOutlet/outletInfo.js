var React = require('react');

// Display outlet information

var OutletInfo = React.createClass({
  render: function() {
    // do something with the photo
    var outletPhoto = <div className="outletPhoto"></div>
    return (
      <div>
        <h2>{ this.props.outletData.name }</h2>
        <h4 className="light">{ this.props.outletData.description }</h4>
        <h4>Seller: <span className="light">{ this.props.outletData.seller }</span></h4>
        <h4>Voltage: <span className="light">{ this.props.outletData.voltage }</span></h4> 
        <h4>$<span className="light">{ this.props.outletData.priceHourly }</span>/hour</h4>
        <h4>$<span className="light">{ this.props.outletData.priceEnergy }</span>/kWh</h4>
      </div>
    )
  }
});

module.exports = OutletInfo;
