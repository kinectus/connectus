// TODO: validate data, possibly change format of date, allow only one click on reserve outlet.

var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var GoogleMap = require('google-map-react');
// var GoogleMapsAPI = window.google.maps;
var outletStore = require('../stores/outletStore');
var ReactAddons = require('react/addons');
var Marker = require('../../assets/markers/reserveOutlet/marker.jsx');

var DateTimePicker = require('react-widgets').DateTimePicker;
var moment = require('moment');
var Router = require('react-router'); //need this for redirection

// http://jquense.github.io/react-widgets/docs/#/datetime-picker
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

var DateTime = React.createClass({
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
    var startMonth = start.getMonth() < 10 ? "0"+(start.getMonth()+1) : start.getMonth() +1;
    var endMonth = end.getMonth() < 10 ? "0"+(end.getMonth()+1) : end.getMonth() + 1;
    var startDateString = start.getFullYear() + "-" + startMonth + "-" + start.getDate();
    var endDateString = end.getFullYear() + "-" + endMonth + "-" + end.getDate();
    var startTimeString = timeConvert(start.getHours())+":"+timeConvert(start.getMinutes());
    var endTimeString = timeConvert(end.getHours())+":"+timeConvert(end.getMinutes());
    console.log(startTimeString, endTimeString);

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
    console.log(newReservation);
    outletStore.submitReservation(newReservation).then(function(res){
      console.log('submitReservation, response', res)
    });
  },

  render: function() {
    var that = this;
    return (
      <div>
        <DateTimePicker  ref="startTime" defaultValue={new Date()} />
        <DateTimePicker  ref="endTime" defaultValue={null} />
        <div className="btn btn-default" onClick={that.handleSubmit}>Reserve Outlet</div>
      </div>
    )
  }
});

var OutletInfo = React.createClass({
  render: function() {
    // do something with the photo
    var outletPhoto = <div className="outletPhoto"></div>
    console.log('outletinfo',this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3 col-xs-12">
            <h2 className="ui center aligned header"> 
                { this.props.outletData.name }
            </h2>
          </div>
          <div className="col-md-7 col-sm-4 col-xs-12">
            <h4>{ this.props.outletData.description }</h4>
          </div>
        </div>
        <div className="row">
        </div>
        <div className="row">
          <div className="col-sm-4 col-xs-6">
            <h4>Seller:</h4>
          </div>
          <div className="col-sm-4 col-xs-6">
            <h4>Voltage: { this.props.outletData.voltage }</h4> 
          </div>
          <div className="col-sm-4 col-xs-6">
            <h4>Price by hour: { this.props.outletData.priceHourly }</h4>
          </div>
          <div className="col-sm-8"></div>
          <div className="col-sm-4 col-xs-6">
            <h4>Price by kWh: { this.props.outletData.priceEnergy }</h4>
          </div>
        </div>      
      </div>
    )
  }
});
          // <div>
          //   <p className="description-text"><div className="ui star rating" data-rating={ this.props.outletData.rating } data-max-rating={ this.props.outletData.rating }></div></p>
          // </div>

var Availability = React.createClass({
  getInitialState: function(){
   return {
      reservations: [],
      timeSlots: [],
      scrolling: null
    }
  },

  componentDidMount: function() {
    var that = this;

    outletStore.getOutletReservations(this.props.outletID).then(function(reservations){
      that.setState({reservations: reservations});
    });

    outletStore.getTimeSlotInfo().then(function(slots){
      that.setState({timeSlots: slots, start: 0, end: 25});
    });
  },

  // Check for button events
  componentDidUpdate: function(){
    // Move forward event
    if (this.props.mouseDown && this.props.forward && this.props.move && this.hasHappened === false){
      this.hasHappened = true;
      this.goForward();
      this.interval = setInterval(this.goForward, 10);
    // Move backward event  
    } else if (this.props.mouseDown && !this.props.forward && this.props.move && this.hasHappened === false) {
      this.hasHappened = true;
      this.goBack();
      this.interval = setInterval(this.goBack, 10);
    // Stop event  
    } else if (!this.props.mouseDown && !this.props.move && this.hasHappened === false){
      this.hasHappened = true;
      this.stop();
    }
  },

  componentWillReceiveProps: function(){
    var that = this;
    this.hasHappened = false;
  },

  goForward: function() {
    var that = this;
    console.log('forward');
    if (this.state.end < this.state.reservations.length-1){
      this.setState({ start: this.state.start+1, end: this.state.end+1 });
    }
  },

  goBack: function() {
    var that = this;
    console.log('back');
    if (this.state.start > 0){
      this.setState({ start: this.state.start-1, end: this.state.end-1 });
    }
  },

  stop: function() {
    console.log('ENDING INTERVAL');
    clearInterval(this.interval);
  },

  render: function() {
    var date;

    // If reservations API call has completed
    if (this.state.reservations.length > 0 && this.state.timeSlots.length>0 ){

      // Current subset of reservation information
      var start = this.state.start;
      var end = this.state.end;
      var subset = subset || this.state.reservations.slice(this.state.start, this.state.end);
      var slotProps = slotProps || this.state.timeSlots;

      // Track center time slot
      var centerCount = centerCount ? centerCount > 24 ? 0 : centerCount : 0;

      // Create custom availability viewer using subset
      var outerHTML = subset.map(function(reservation){
        var goOrNoGo = reservation.available ? "on" : "off";

        // Label slot properties based on subset location
        var blockClass = (centerCount===12) ? "centerSlot ".concat(goOrNoGo) : "sideSlot ".concat(goOrNoGo);
        centerCount++;
        var begin, end;

        // Specially label center slot to display its information
        if (centerCount===13){
          date = moment(reservation.date).format('MMMM Do YYYY');
          for (var j=0; j<slotProps.length; j++){
            if (slotProps[j].id === reservation.slot_id){
              begin = slotProps[j].start;
              end = slotProps[j].end;
            }
          }
          return(
            <div className={blockClass} key={reservation.id}><p>{begin}-{end}</p></div>
          )
        // Regularly label all slots but center
        } else {
          return(
            <div className={blockClass} key={reservation.id}></div>
          )
        }
      });
    // Fallback before API call is complete
    } else { var outerHTML = <div className="slot"></div> }

    // Render availability viewer
    return (
      <div className = "holder">
        <p className="date">{date}</p>
        <div className = "viewBox centering">{outerHTML}</div>
      </div>
    )
  }

});

// Contains buttons, passes their events to Availability
var Viewer = React.createClass({
  getInitialState: function(){
    return { 
      mouseDown: false,
      forward: false,
      move: false
    }
  },

  // On forward mouse hold
  mouseDownForward: function(){
    console.log('DOWN')
    this.setState({mouseDown: true});
    this.setState({forward: true});
    this.setState({move: true});
  },

  // On forward mouse hold
  mouseDownBack: function(){
    console.log('DOWN')
    this.setState({mouseDown: true});
    this.setState({forward: false});
    this.setState({move: true});
  },

  // On forward mouse release
  mouseUp: function(){
    console.log('UP')
    this.setState({mouseDown: false});
    this.setState({move: false});
  },

  // Render buttons, pass states to Availability
  render: function(){
    return (
      <div className="timeblock holder">
        <div className="centering">
          <Availability move={this.state.move} mouseDown={this.state.mouseDown} forward={this.state.forward} outletID = {this.props.outletID}/>
        </div>
        <div className="centering pad-top">
          <button className="toggle glyphicon glyphicon-chevron-left" onMouseDown={this.mouseDownBack} onMouseUp={this.mouseUp}></button>
          <button className="toggle glyphicon glyphicon-chevron-right" onMouseDown={this.mouseDownForward} onMouseUp={this.mouseUp}></button>
        </div>
      </div>
    )
  }
});

var reserveOutlet = React.createClass({
  getInitialState: function(){
   return {
      data: [],
    }
  },
  mixins: [Router.Navigation],
  
  // is onchange necessary?????
  // _onChange: function() {
  //   this.setState(this.getInitialState());
  // },
  componentDidMount: function() {
    var that = this;
    var outletID = this.props.params.id
    outletStore.getOutletById(outletID).then(function(outlet){
      // setState automatically forces a re-render
      // console.log('outlet',outlet);
      that.setState({data: outlet});
    });
  },

  render: function() {
    // is user authenticate
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }
    return (
      <div className='container'>
        <div>
          <Map outletData={this.state.data} />
        </div>
        <div>
          <OutletInfo outletData = {this.state.data}/>
        </div>
        <div>
          <Viewer outletID = {this.props.params.id}/>
        </div>
        <div>
           <DateTime outletData = {this.state.data}/>
        </div>
      </div>
    )
  }

});

module.exports = reserveOutlet;
