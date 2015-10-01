var React = require('react');
var outletStore = require('../stores/outletStore');
var userStore = require('../stores/userStore');
var GoogleMap = require('google-map-react');
var Marker = require('../../assets/markers/reserveOutlet/marker.jsx');
var DateTimePicker = require('react-widgets').DateTimePicker;
var Alert = require('react-bootstrap').Alert;
var moment = require('moment');
var Router = require('react-router'); //need this for redirection
var Link = require('react-router').Link;
var FooterCheck = require('./footerCheck');
var Availability = require('./availability/availability');
var Viewer = require('./availability/viewer');
// http://jquense.github.io/react-widgets/docs/#/datetime-picker

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
  //MAP
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

var Map = React.createClass({

  render: function() {
    return (
      <div className='reservationMap'>
        <GoogleMap
          zoom={15}
          center={[this.props.outletData.lat,this.props.outletData.long]}
        >
          <Marker lat={this.props.outletData.lat} lng={this.props.outletData.long} />
        </GoogleMap>
      </div>
    )
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
  //DATETIME
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

var DateTime = React.createClass({
  getInitialState: function(){
   return {
      message: null,
      alert: false,
      success: false,
      error: false
    }
  },

  show: function(e){
    if (e){
      e.preventDefault();
      this.setState({alert: true});
    }
  },

  hideMe: function(e){
    this.setState({alert: false});
  },

  success: function(e){
    if (e){
      e.preventDefault();
      this.setState({success: true});
    }    
  },

  closeMe: function(e){
    if (e){
      e.preventDefault();
      this.setState({success: false, error: false});
      location.reload();
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var timeConvert = function(time){
      if(time < 10){
        return "0" + time;
      }
      return time;
    };
    var start = this.refs.startTime.state.value;
    var end = this.refs.endTime.state.value;
    var startDate = start.getDate() < 10 ? "0"+start.getDate() : start.getDate();
    var endDate = end.getDate() < 10 ? "0"+end.getDate() : end.getDate();
    var startMonth = start.getMonth() < 10 ? "0"+(start.getMonth()+1) : start.getMonth() +1;
    var endMonth = end.getMonth() < 10 ? "0"+(end.getMonth()+1) : end.getMonth() + 1;
    var startDateString = start.getFullYear() + "-" + startMonth + "-" + startDate;
    var endDateString = end.getFullYear() + "-" + endMonth + "-" + endDate;
    var startTimeString = timeConvert(start.getHours())+":"+timeConvert(start.getMinutes());
    var endTimeString = timeConvert(end.getHours())+":"+timeConvert(end.getMinutes());

    var that = this;

    var newReservation = {
      outletID: this.props.outletData.id,
      start: {
        date: startDateString,
        time: startTimeString
      },
      end: {
        date: endDateString,
        time: endTimeString
      }
    }
    // Validate input dates
    if (moment().diff(moment(start)) > 0 ){
      var message = 'Please choose reservation after '+moment().format('MMMM Do YYYY hh:mma');
      this.setState({'message': message, 'alert': true});
    } else if (moment().diff(moment(start)) < 0 && moment(start).diff(moment(end)) > 0 ) {
      message = 'Please schedule the end of your reservation after the start';
      this.setState({'message': message, 'alert': true});
    } else if (moment().diff(moment(start)) < 0 && moment(start).diff(moment(end)) < 0 ) {
      var that = this;
      outletStore.submitReservation(newReservation).then(function(res){
        console.log('hello');
        if(res.errorMessage){
          message = 'One or more of your selected time slots are not available';
          that.setState({message: message, error: true});
        }else{
          message = 'Reservation complete';
          that.setState({message: message, success: true});
        }
      });
    }
  },

  render: function() {
    var that = this;
    var hidden = !this.state.alert ? "hidden" : "notHidden centering";
    var successful = !this.state.success ? "hidden" : "notHidden centering reserveConfirm";
    var buttonHide = !this.state.success ? "notHidden centering btn btn-default" : "hidden";
    var erroring = !this.state.error ? "hidden" : "notHidden centering reserveConfirm";

    // Format default date to be closest upcoming time at 30-minute interval
    var firstDate = new Date();
    var remainder1 = (30 - firstDate.getMinutes()) % 30;
    var remainder2 = (60 - firstDate.getMinutes()) % 60;
    if (remainder1 > 0){
      firstDate = new Date(firstDate.getTime() + remainder1*60000)
    } else if (remainder2 > 0){
      firstDate = new Date(firstDate.getTime() + remainder2*60000)
    }
    return (
      <div className="holder">
        <Alert bsStyle='warning' className={hidden} onDismiss={this.hideMe} dismissAfter={2000}>
            <strong>{this.state.message}</strong>
        </Alert>
        <Alert bsStyle='success' className={successful}>
            <strong>{this.state.message}</strong><br></br>
            <button className="alertButton btn btn-default" onClick={this.closeMe}>Add another reservation</button>
            <button className="alertButton btn btn-default"><Link to="/outlets">Return to browsing</Link></button>
        </Alert>
        <Alert bsStyle='warning' className={erroring}>
            <strong>{this.state.message}</strong><br></br>
            <button className="alertButton" onClick={this.closeMe}>Try again</button>
            <button className="alertButton"><Link to="/outlets">Choose another outlet</Link></button>
        </Alert>
        <DateTimePicker  ref="startTime" defaultValue={firstDate} />
        <DateTimePicker  ref="endTime" defaultValue={null} />
        <div className={buttonHide} onClick={that.handleSubmit}>Reserve Outlet</div>
      </div>
    )
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
  // OUTLETINFO
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

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
          // <div>
          //   <p className="description-text"><div className="ui star rating" data-rating={ this.props.outletData.rating } data-max-rating={ this.props.outletData.rating }></div></p>
          // </div>

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
  //RESERVE OUTLET
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

var reserveOutlet = React.createClass({
  getInitialState: function(){
   return {
      data: []
    }
  },

  mixins: [Router.Navigation],

  componentDidMount: function() {
    var that = this;
    var outletID = this.props.params.id
    outletStore.getOutletById(outletID).then(function(outlet){
      userStore.getUsernameById(outlet.seller_id).then(function(user){
          outlet['seller'] = user.fullname;
          that.setState({data: outlet});
        });
    });
    FooterCheck.checker();
  },

  render: function() {
    var that = this;
    // is user authenticated
    if(!document.cookie){
      this.transitionTo('about');
      return <h1></h1>;
    }
    return (
      <div className='container'>
        <div>
          <Map outletData={this.state.data} />
        </div>
        <div>
          <Viewer outletID = {this.props.params.id} />
        </div>
        <div className="row">
          <div className="outlet-data col-md-8">
            <OutletInfo outletData = {this.state.data} />
          </div>
          <div className="date-time col-md-4">
            <h3>Reserve this outlet:</h3>
            <DateTime outletData = {this.state.data} />
          </div>
        </div>
      </div>
    )
  }

});

module.exports = reserveOutlet;
