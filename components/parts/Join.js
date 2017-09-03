var React = require('react');
var Link = require('react-router').Link;

var Join = React.createClass({

	join() {
		var memberName = React.findDOMNode(this.refs.name).value;
		this.props.emit('join', { name: memberName });
	},

	render() {
		return (
			<form action="javascript:void(0)" onSubmit={this.join}>

				<label>Vaše puno ime</label>
				<input ref="name"
					   className="form-control"
				       placeholder="enter your full name..."
				       required />
				<button className="btn btn-primary">Pridružite se</button>

				<Link to="/speaker">Zapoćnite prezentaciju</Link>
				<Link to="/board">Odite na Tablicu odgovora</Link>
			</form>
		);
	}

});

module.exports = Join;
