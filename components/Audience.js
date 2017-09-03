var React = require('react');
var Display = require('./parts/Display');
var Join = require('./parts/Join');
var Ask = require('./parts/Ask');

var Audience = React.createClass({
	   render() {
		    return (
			     <div>
      			    <Display if={this.props.status === 'connected'}>

      					    <Display if={this.props.member.name}>

      						        <Display if={!this.props.currentQuestion}>
                              <h2>Dobro došao {this.props.member.name}</h2>
                              <p>{this.props.audience.length} gledatelja trenutno prisutno </p>
                              <p>Pitanjeće se pojaviti ovdje</p>
                          </Display>
                          <Display if={this.props.currentQuestion}>
							                 <Ask question={this.props.currentQuestion} emit={this.props.emit} />
						              </Display>

                     </Display>
                      <Display if={!this.props.member.name}>
                          <h1>Pridružili ste se grupi (Sessiji)</h1>
                          <Join emit={this.props.emit} />
                      </Display>

            </Display>
        </div>
      );
    }
});

module.exports = Audience;
