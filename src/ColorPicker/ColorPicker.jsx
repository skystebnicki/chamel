import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// TODO: need to install
// "react-colorpickr": "3.*",
//var ReactColorPicker = require('react-colorpickr');
import FontIcon from '../FontIcon/FontIcon';

const ColorPicker = props => {
  // <ReactColorPicker onChange={this._handleColorPick} value={this.props.value} />
  return (
    <div ref="colorPickerContainer" className="chamel-color-picker">
      <div className="chamel-color-picker-close">
        <FontIcon onClick={close} className="cfi cfi-times" />
      </div>
      <div>
        <div>TODO: add here</div>
      </div>
      <div className="chamel-color-picker-label">{props.label}</div>
    </div>
  );

  /**
   * Displays the color picker
   *
   * @public
   */
  show = () => {
    const cpStyle = (ReactDOM.findDOMNode(this.refs.colorPickerContainer).style.display = 'block');
  };

  /**
	 * Hides the color picker
	 *
	 * @public
	 */
  close = () => {
    const cpStyle = (ReactDOM.findDOMNode(this.refs.colorPickerContainer).style.display = 'none');
  };

  /**
	* Get the latest color picked
	*
	* @public
	*/
  getColor = () => {
    return props.color;
  };

  /**
	 * Handles the color picking event. This will trigger when the user chooses a color
	 *
	 * @param {string} color	The color that was selected
	 * @private
	 */
  _handleColorPick = color => {
    props.color = color;
    if (props.onColorPick) props.onColorPick(color);
  };
};

ColorPicker.propTypes = {
  onColorPick: PropTypes.func,
  color: PropTypes.object,
  value: PropTypes.string,
  label: PropTypes.string,
};

ColorPicker.defaultProps = {
  value: '',
  label: '',
  color: null,
};

export default ColorPicker;
