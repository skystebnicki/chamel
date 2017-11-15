import React from 'react';
import PropTypes from 'prop-types';
import TextFieldRich from '../TextFieldRich/TextFieldRich';

const ContentRte = props => {
  return (
    <TextFieldRich
      ref="textFieldRich"
      onFocus={_handleFocus}
      onBlur={_handleBlur}
      onChange={_handleChange}
      value={props.value}
    />
  );

  /**
	 * Sends a command to the TextFieldRich component which executes an editor command
	 *
	 * @param {string} command 	The name of the RTE command to execute
	 * @param {string} option 	The option when executing a certain command. e.g. changing the font/background colors
	 * @public
	 */
  sendCommand = (command, option) => {
    this.refs.textFieldRich.sendCommand(command, option);
  };

  /**
	 * Sends a command to the TextFieldRich to change the font/background color
	 *
	 * @param {string} type		Type of command to be executed. Either forecolor or backcolor
	 * @param {string} color	The color that was selected
	 * @public
	 */
  setColor = (type, color) => {
    this.refs.textFieldRich.setColor(type, color);
  };

  /**
	 * Calls a function in the TextFieldRich which insert the a href link
	 *
	 * @param {string} path		The url path to be linked on text
	 * @public
	 */
  insertLink = path => {
    this.refs.textFieldRich.insertLink('createlink', path);
  };

  /**
	 * Calls a function in the TextFieldRich which insert the html string to the editor
	 *
	 * @param {string} html		The string that will be inserted
	 * @public
	 */
  insertHtml = html => {
    this.refs.textFieldRich.insertHtml(html);
  };

  /**
	 * Clears the value of the textFieldRich
	 *
	 * @public
	 */
  clearValue = () => {
    this.refs.textFieldRich.clearValue();
  };

  /**
	 * Gets the value of the textFieldRich
	 *
	 * @public
	 */
  getValue = () => {
    return this.refs.textFieldRich.getValue();
  };

  /**
	 * Sets the value of the textFieldRich
	 *
	 * @param {string} newValue		The value to be saved in the editor
	 * @public
	 */
  setValue = newValue => {
    this.refs.textFieldRich.setValu(neValue);
  };

  /**
	 * Callback used to handle onblur
	 *
	 * @param {DOMEvent} e 		Reference to the DOM event being sent
	 * @private
	 */
  _handleBlur = e => {
    if (props.onBlur) props.onBlur(e);
  };

  /**
	 * Callback used to handle onfocus
	 *
	 * @param {DOMEvent} e 		Reference to the DOM event being sent
	 * @private
	 */
  _handleFocus = e => {
    if (props.onFocus) props.onFocus(e);
  };

  /**
	 * Callback used to handle onchange
	 *
	 * @param {DOMEvent} e 		Reference to the DOM event being sent
	 * @private
	 */
  _handleChange = e => {
    if (props.onChange) props.onChange(e);
  };
};

ContentRte.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
};

ContentRte.defaultProps = {
  value: '',
};

export default ContentRte;
