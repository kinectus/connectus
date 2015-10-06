var React = require('react');
var outletStore = require('../../../stores/outletStore');
var moment = require('moment');

// Differentiates available and unavailable slots by color, updates with user scroll

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
    if (this.props.mouseDown && this.props.forward && this.props.move && this.propertiesReceived === false){
      this.propertiesReceived = true;
      this.goForward();
      this.interval = setInterval(this.goForward, 30);
    // Move backward event  
    } else if (this.props.mouseDown && !this.props.forward && this.props.move && this.propertiesReceived === false) {
      this.propertiesReceived = true;
      this.goBack();
      this.interval = setInterval(this.goBack, 30);
    // Stop event  
    } else if (!this.props.mouseDown && !this.props.move && this.propertiesReceived === false){
      this.propertiesReceived = true;
      this.stop();
    }
  },

  componentWillReceiveProps: function(){
    this.propertiesReceived = false;
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

            if (slotProps[j].customID === reservation.slot_customID){
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
            if (slotProps[j].customID === reservation.slot_customID) {
              hoverStart = slotProps[j].start
            }
          }

          var indicator = reservation.available ? "indicator barView" : "noIndicator barView";
          // If on the hour
          if ( hoverStart.slice(3) === '00'){
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

module.exports = Availability;
