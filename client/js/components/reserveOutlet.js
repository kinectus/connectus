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
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup; //modal transitioning

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
      refresh: true
    };
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
    var startMonth = start.getMonth() < 10 ? "0"+(start.getMonth()+1) : start.getMonth() +1;
    var endMonth = end.getMonth() < 10 ? "0"+(end.getMonth()+1) : end.getMonth() + 1;
    var startDateString = start.getFullYear() + "-" + startMonth + "-" + start.getDate();
    var endDateString = end.getFullYear() + "-" + endMonth + "-" + end.getDate();
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
    console.log(newReservation.start.date, newReservation.start.time)
    // if (newReservation.start.date){

    // }
    outletStore.submitReservation(newReservation).then(function(res){
      location.reload();
      return res;
      //NEED TO CALL THIS.OPENMODAL HERE
      location.reload();
      // console.log('submitReservation, response', res)
    });
  },

  render: function() {
    var that = this;

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
      <div>
        <DateTimePicker  ref="startTime" defaultValue={firstDate} />
        <DateTimePicker  ref="endTime" defaultValue={null} />
        <div className="btn btn-default" onClick={that.handleSubmit}>Reserve Outlet</div>
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
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-xs-12">
            <h2 className="ui center aligned header"> 
                { this.props.outletData.name }
            </h2>
          </div>
          <div className="col-md-7 col-sm-8 col-xs-12">
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


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
  //AVAILABILITY
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

var Availability = React.createClass({
  getInitialState: function(){
   return {
      reservations: [],
      timeSlots: [],
      scrolling: null
    }
  },

  handleResize: function(e) {
    if (window.innerWidth<469){
      this.setState({end: 9, middle: 4});
    } else if (window.innerWidth<674){
      this.setState({end: 13, middle: 6});
    } else if (window.innerWidth<844){
      this.setState({end: 17, middle: 8});
    } else if (window.innerWidth<1031){
      this.setState({end: 25, middle: 12});
    } else {
      this.setState({end: 31, middle: 15});
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

  goForward: function() {
    var that = this;
    if (this.state.end < this.state.reservations.length-1){
      this.setState({ start: this.state.start+1, end: this.state.end+1 });
    }
  },

  goBack: function() {
    var that = this;
    if (this.state.start > 0){
      this.setState({ start: this.state.start-1, end: this.state.end-1 });
    }
  },

  stop: function() {
    clearInterval(this.interval);
  },

  render: function() {
    var date;

    // If reservations API call has completed
    if (this.state.reservations.length > 0 && this.state.timeSlots.length>0 && this.state.end && this.state.middle){
      // Current subset of reservation information
      var start = this.state.start;
      var end = this.state.end;
      var subset = subset || this.state.reservations.slice(this.state.start, this.state.end);
      var slotProps = slotProps || this.state.timeSlots;

      // Track center time slot
      var centerCount = centerCount ? centerCount > end-1 ? 0 : centerCount : 0;
      var that = this;
      // Create custom availability viewer using subset
      var outerHTML = subset.map(function(reservation){
        var goOrNoGo = reservation.available ? "on" : "off";

        // Label slot properties based on subset location
        var blockClass = (centerCount === that.state.middle) ? "centerSlot ".concat(goOrNoGo) : "sideSlot ".concat(goOrNoGo);
        centerCount++;
        var begin, end;
        // var currentTimeView = blockClass
        // Specially label center slot to display its information
        if (centerCount === that.state.middle+1){
          date = moment(reservation.date).format('MMMM Do YYYY');
          for (var j=0; j<slotProps.length; j++){
            if (slotProps[j].id === reservation.slot_id){
              var endSub = slotProps[j].end === '24:00' ? '00:00' : slotProps[j].end
              begin = moment('12-25-1995 '+slotProps[j].start).format('MM-DD-YYYY h:mma');
              end = moment('12-25-1995 '+endSub).format('MM-DD-YYYY h:mma');
              // Format begin time
              if (begin[12] === '0' && end[11]!== '1'){
                begin = begin.slice(12);
              } else {
                begin = begin.slice(11);
              }
              // Format end time
              if (end[12] === '0' && end[11]!== '1'){
                end = end.slice(12);
              } else {
                end = end.slice(11);
              }
            }
          }
          return(

            <div className={blockClass} key={reservation.id}><p>{begin}-{end}</p></div>
          )
        // Regularly label all slots but center
        } else {
          if ( parseInt(reservation.slot_id, 10) % 2 === 1 ){
            var splitHour = "timeblock splitHour";
            var hoverStart = slotProps[reservation.slot_id-1].start;
            hoverStart = moment('12-25-1995 '+hoverStart).format('MM-DD-YYYY ha');
            if (hoverStart[12] === '0'){
              hoverStart = hoverStart.slice(12);
              if (hoverStart = '0am'){
                hoverStart = '10am';
              }
            } else {
              hoverStart = hoverStart.slice(11);
            }
            return(
              <div className={splitHour} key={reservation.id}>
              <div className="barView"><p className="barViewText">{hoverStart}</p></div>
              <div className={blockClass}></div>
              </div>
            )
          } else {
            return(
              <div className="timeblock" key={reservation.id}>
              <div className="barViewBack"></div>
              <div className={blockClass}></div>
              </div>

            )
          }

        }
      });


    // Fallback before API call is complete
    } else {var outerHTML = <div className="slot"></div> }

    // Render availability viewer
    return (
      <div className = "holder">
        <p className="date">{date}</p>
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
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
  //SUCCESS MODAL
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
var Modal = React.createClass({
  render: function(){
    if(this.props.isOpen){
      return (
        <ReactCSSTransitionGroup transitionName={this.props.transitionName}>
          <div className="modal">
            <h1>this issupposed to be the modal</h1>
          </div>
        </ReactCSSTransitionGroup>
      );
    }else{
     return (<h1>at least modal is returning something</h1>);
    }
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
      data: [],
      isModalOpen: false
    }
  },
  mixins: [Router.Navigation],
  
  openModal: function(){
    this.setState({isModalOpen: true});
  },

  closeModal: function(){
    this.setState({isModalOpen: false});
    location.reload();
  },
  
  // is onchange necessary?????
  // _onChange: function() {
  //   this.setState(this.getInitialState());
  // },
  componentDidMount: function() {
    var that = this;
    var outletID = this.props.params.id
    outletStore.getOutletById(outletID).then(function(outlet){
      that.setState({data: outlet});
    });
  },

  render: function() {
    var that = this;
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
          <OutletInfo outletData = {this.state.data} />
        </div>
        <div>
          <Viewer outletID = {this.props.params.id} />
        </div>
        <div>
          <DateTime outletData = {this.state.data} />
        </div>
      </div>
    )
  }

});

module.exports = reserveOutlet;
