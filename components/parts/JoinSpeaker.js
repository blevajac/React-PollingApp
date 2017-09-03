var React = require('react');

var JoinSpeaker = React.createClass({

	start() {
		var speakerName = React.findDOMNode(this.refs.name).value;
		var title = React.findDOMNode(this.refs.title).value;
		this.props.emit('start', { name: speakerName, title: title });
	},

	render() {
		return (
			<form action="javascript:void(0)" onSubmit={this.start}>

				<label>Vaše puno ime</label>
				<input ref="name"
					   className="form-control"
				       placeholder="Molimo vas unesite vaše puno ime..."
				       required />

				<label>Presentation Title</label>
				<input ref="title"
					   className="form-control"
				       placeholder="Unesite naslov za ovu Presentaciju..."
				       required />

				<button className="btn btn-primary">Pridružite se</button>

			</form>
		);
	}

});

module.exports = JoinSpeaker;
