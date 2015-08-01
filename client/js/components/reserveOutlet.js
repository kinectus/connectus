var React = require('react');
var outletStore = require('../stores/outletStore');
var GoogleMap = require('google-map-react');
var Marker = require('../../assets/markers/reserveOutlet/marker.jsx');
var DateTimePicker = require('react-widgets').DateTimePicker;
var Alert = require('react-bootstrap').Alert;
var moment = require('moment');
var Router = require('react-router'); //need this for redirection
var Link = require('react-router').Link;
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
      // location.reload();
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
    if ( moment().diff(moment(start)) > 0 ){
      var message = 'Please choose reservation after '+moment().format('MMMM Do YYYY hh:mma');
      this.setState({'message': message, 'alert': true});
    } else if ( moment().diff(moment(start)) < 0 && moment(start).diff(moment(end)) > 0 ) {
      message = 'Please schedule the end of your reservation after the start';
      this.setState({'message': message, 'alert': true});
    } else if ( moment().diff(moment(start)) < 0 && moment(start).diff(moment(end)) < 0 ) {
      var that = this;
      outletStore.submitReservation(newReservation).then(function(res){
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
            <button className="alertButton" onClick={this.closeMe}>Add another reservation</button>
            <button className="alertButton"><Link to="/outlets">Return to browsing</Link></button>
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
        <h4>Seller:</h4>
        <h4>Voltage: <span className="light">{ this.props.outletData.voltage }</span></h4> 
        <h4>Price by hour: <span className="light">{ this.props.outletData.priceHourly }</span></h4>
        <h4>Price by kWh: <span className="light">{ this.props.outletData.priceEnergy }</span></h4>
      </div>
    )
  }
});
          // <div>
          //   <p className="description-text"><div className="ui star rating" data-rating={ this.props.outletData.rating } data-max-rating={ this.props.outletData.rating }></div></p>
          // </div>


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
  //AVAILABILITY
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

var Availability = React.createClass({
  getInitialState: function(){
   return {
      reservations: [],
      timeSlots: []
    }
  },

  handleResize: function(e) {
    if (window.innerWidth<497){
      this.setState({end: 7, middle: 3, windowView: 3});
    } else if (window.innerWidth<674){
      this.setState({end: 11, middle: 5, windowView: 5});
    } else if (window.innerWidth<994){
      this.setState({end: 15, middle: 7, windowView: 7});
    } else if (window.innerWidth<1202){
      this.setState({end: 17, middle: 8, windowView: 8});
    } else {
      this.setState({end: 25, middle: 12, windowView: 12});
    }
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    var that = this;

    outletStore.getOutletReservations(this.props.outletID).then(function(reservations){
      that.setState({reservations: reservations});
    });

    outletStore.getTimeSlotInfo().then(function(slots){
      that.setState({timeSlots: slots, start: 0});
    });
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  // Check for button events
  componentDidUpdate: function(){
    // Move forward event
    if (this.props.mouseDown && this.props.forward && this.props.move && this.hasHappened === false){
      this.hasHappened = true;
      this.goForward();
      this.interval = setInterval(this.goForward, 30);
    // Move backward event  
    } else if (this.props.mouseDown && !this.props.forward && this.props.move && this.hasHappened === false) {
      this.hasHappened = true;
      this.goBack();
      this.interval = setInterval(this.goBack, 30);
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

  // Scroll functionality
  goForward: function() {
    // Move windowView forward if not centered
    if (this.state.windowView < this.state.middle){
      this.setState({windowView: this.state.windowView+1})

    // Change rendered subset
    } else if (this.state.end < this.state.reservations.length-1){
      this.setState({ start: this.state.start+1, end: this.state.end+1});

    // Move windowView forward if reservations end is reached
    } else  if (this.state.end === this.state.reservations.length-1 && this.state.windowView < this.state.end - this.state.start -1) {
      this.setState({windowView: this.state.windowView + 1});
    }
  },

  goBack: function() {
    // Change rendered subset
    if (this.state.start > 0 && this.state.windowView === this.state.middle){
      this.setState({start: this.state.start - 1, end: this.state.end-1});

    // Move windowView backward if reservations start is reached
    } else if (this.state.start === 0 && this.state.windowView > 0) {
      this.setState({windowView: this.state.windowView - 1});

    // Move windowView backward if not centered
    } else if (this.state.windowView > this.state.middle){
      this.setState({windowView: this.state.windowView- 1 });
    }
  },

  stop: function() {
    clearInterval(this.interval);
  },

  render: function() {
    var date;
    // If reservations API call has completed
    if (this.state.reservations.length > 0 && this.state.timeSlots.length>0 && this.state.end && this.state.middle && typeof this.state.windowView === 'number'){
      // Create custom availability viewer using subset
      if (window.location.origin === 'http://localhost:3000'){
        var idSubtractor = 1;
      } else if (window.location.origin === 'https://econnectus.herokuapp.com') {
        var idSubtractor = 10;
      }
      // Current subset of reservation information
      var start = this.state.start;
      var end = this.state.end;
      var subset = subset || this.state.reservations.slice(this.state.start, this.state.end);
      var slotProps = slotProps || this.state.timeSlots;
      // Track center time slot
      var centerCount = centerCount ? centerCount > end-1 ? 0 : centerCount : 0;
      var that = this;
      var slotCount = 0;

      var outerHTML = subset.map(function(reservation){
        var goOrNoGo = reservation.available ? "on" : "off";
        // Label slot properties based on subset location
        var blockClass = (centerCount === that.state.windowView) ? "centerSlot ".concat(goOrNoGo) : "sideSlot ".concat(goOrNoGo);
        centerCount++;
        var begin, end;

        // Specially label center slot to display its information
        if (centerCount === that.state.windowView+1){
          date = moment(reservation.date).format('MMMM Do YYYY');
          // Find corresponding slotProp to reservation slot_id
          for (var j=0; j<slotProps.length; j++){
            // When match is found, create unique time labling
            if (slotProps[j].id === reservation.slot_id){
              var endSub = slotProps[j].end === '24:00' ? '00:00' : slotProps[j].end;
              begin = moment('12/25/1995 ' + slotProps[j].start, 'MM/DD/YYYY HH:mm').format('MM/DD/YYYY hhmma');
              end = moment('12/25/1995 ' + endSub, 'MM/DD/YYYY HH:mm').format('MM/DD/YYYY hhmma');
              // Format begin time
              if (begin[11] === '0'){
                begin = begin.slice(12,13).concat( ":" + begin.slice(13) );
              } else {
                begin = begin.slice(11,13).concat( ":" + begin.slice(13) );
              }
              // Format end time
              if (end[11] === '0'){
                end = end.slice(12,13).concat( ":" + end.slice(13) );
              } else {
                end = end.slice(11,13).concat( ":" + end.slice(13) );
              }
            }
          }
          slotCount++;
          return(
            <div className={blockClass} key={reservation.id}>{begin}-{end}</div>
          )

        // Regularly label all slots but center
        } else {

          // Determine if reservation is on the hour
          var hoverStart;
          for (var j=0; j<slotProps.length; j++){
            if (slotProps[j].id === reservation.slot_id) {
              hoverStart = slotProps[j].start
            }
          }

          // If on the hour
          if ( hoverStart.slice(3) === '00'){
            var indicator = reservation.available ? "indicator barView" : "noIndicator barView";
            blockClass = blockClass + " splitHour";

            hoverStart = moment('12/25/1995 '+ hoverStart, 'MM/DD/YYYY HH:mm').format('MM/DD/YYYY ha');
            if (hoverStart[12] === '0'){
              hoverStart = hoverStart.slice(12);
              if (hoverStart = '0am'){
                hoverStart = '10am';
              }
            } else {
              hoverStart = hoverStart.slice(11);
            }
            slotCount++;
            return(
              <div className="timeblock" key={reservation.id}>
              <div className={indicator}><p className="barViewText">{hoverStart}</p></div>
              <div className={blockClass}></div>
              </div>
            )
          // If starts on half hour
          } else {
            indicator = reservation.available ? "indicator barViewBack" : "noIndicator barViewBack";
            slotCount++;
            return(
              <div className="timeblock" key={reservation.id}>
              <div className={indicator}></div>
              <div className={blockClass}></div>
              </div>
            )
          }
        }
      });
    // Fallback before API call is complete
    } else {
      var outerHTML = <div><p className="date">Retrieving outlet information...</p></div> 
    }
    // Render availability viewer
    return (
      <div className = "holder">
        <p className = "date">{date}</p>
        <div className = "viewBox centering">{outerHTML}</div>
      </div>
    )
  }

});

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
  //VIEWER
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

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
    this.setState({mouseDown: true});
    this.setState({forward: true});
    this.setState({move: true});
  },

  // On forward mouse hold
  mouseDownBack: function(){
    this.setState({mouseDown: true});
    this.setState({forward: false});
    this.setState({move: true});
  },

  // On forward mouse release
  mouseUp: function(){
    this.setState({mouseDown: false});
    this.setState({move: false});
  },

  // Render buttons, pass states to Availability
  render: function(){
    return (
      <div className="timeblock holder centering">
        <div className="centering">
          <Availability move={this.state.move} mouseDown={this.state.mouseDown} forward={this.state.forward} outletID = {this.props.outletID}/>
        </div>
        <div className="centering pad-top">
          <button className="btn btn-default toggle glyphicon glyphicon-chevron-left" onMouseDown={this.mouseDownBack} onMouseUp={this.mouseUp} onMouseLeave={this.mouseUp}></button>
          <button className="btn btn-default toggle glyphicon glyphicon-chevron-right" onMouseDown={this.mouseDownForward} onMouseUp={this.mouseUp} onMouseLeave={this.mouseUp}></button>
        </div>
      </div>
    )
  }

});

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
      that.setState({data: outlet});
    });
  },

  render: function() {
    var that = this;
    // is user authenticated
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
