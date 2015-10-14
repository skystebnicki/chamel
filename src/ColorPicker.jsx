var React = require('react');
var ReactColorPicker = require('react-colorpickr');
var FontIcon = require("./FontIcon.jsx");

var ColorPicker = React.createClass({
	propTypes: {
		onColorPick: React.PropTypes.func,
		color: React.PropTypes.object,
		value: React.PropTypes.string,
		label: React.PropTypes.string,
	},

	getDefaultProps: function () {
		return {
			value: "",
			label: "",
			color: null,
		};
	},

	componentDidMount: function componentDidMount() {
		
	},
	
	render: function render() {
		return (
				<div ref="colorPickerContainer" className="chamel-color-picker">
        			<div className="chamel-color-picker-close">
        				<FontIcon onClick={this.close} className="cfi cfi-times" />
        			</div>
        			<div>
        				<ReactColorPicker onChange={this._handleColorPick} value={this.props.value} />
        			</div>
        			<div className="chamel-color-picker-label">{this.props.label}</div>
        	</div>	
		);
	},
	
	/**
     * Displays the color picker
     *
     * @public
     */
    show: function() {
    	var cpStyle = this.refs.colorPickerContainer.getDOMNode().style.display = "block";
    },
    
    /**
     * Hides the color picker
     *
     * @public
     */
    close: function() {
    	var cpStyle = this.refs.colorPickerContainer.getDOMNode().style.display = "none";
    },
	
    /**
     * Get the latest color picked
     *
     * @public
     */
	getColor: function() {
		return this.props.color;
	},
	
	/**
     * Handles the color picking event. This will trigger when the user chooses a color
     *
     * @param {string} color	The color that was selected
     * @private
     */
    _handleColorPick: function (color) {
    	this.props.color = color;
    	if(this.props.onColorPick) this.props.onColorPick(color)
    },
});

module.exports = ColorPicker;