var React = require('react');
var Availability = require('./availability');

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

module.exports = Viewer;
