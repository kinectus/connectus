var React = require('react');
var outletStore = require('../../stores/outletStore');
var moment = require('moment');
var DateTimePicker = require('react-widgets').DateTimePicker;
var Alert = require('react-bootstrap').Alert;
var Link = require('react-router').Link;

// Handle user scroll and reservation choice and submit validation.

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

module.exports = DateTime;
