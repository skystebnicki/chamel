import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Classable from '../mixins/classable';

class EnhancedTextarea extends Component {

  // mixins: [Classable],

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      height: this.props.rows * 24
    };
  }

  componentDidMount() {
    this._syncHeightWithShadow();
  }

  render() {

    let {
      className,
      onChange,
      onHeightChange,
      textareaClassName,
      rows,
      valueLink,
      ...other
    } = this.props;

    const classes = this.getClasses('chamel-enhanced-textarea');
    const textareaClassName = 'chamel-enhanced-textarea-input';
    const style = {
      height: this.state.height + 'px'
    };

    if (this.props.textareaClassName) {
      textareaClassName += ' ' + this.props.textareaClassName;
    }

    if(other.hasOwnProperty("value")){

      /**
       * If we have a value property in the object, we need to remove that
       * We are gonna use the defaultValue instead. https://facebook.github.io/react/docs/forms.html
       */
      delete other.value;

      // Set the default value
      other.defaultValue = this.props.value;
    } else if (this.props.hasOwnProperty('valueLink')) {

      // Set the default value
      other.defaultValue = this.props.valueLink.value;
    }

    /*
     * We need to use the defaultValue instead of value because we cannot switch the uncontrolled component to a controlled component or vice versa.
     * If we set value in the text area, then the user cannot input a value since the component is already controlled
     * https://facebook.github.io/react/docs/forms.html
     */
    return (
      <div className={classes}>
        <textarea
          ref="shadow"
          className="chamel-enhanced-textarea-shadow"
          tabIndex="-1"
          rows={this.props.rows}
          readOnly={true}
          defaultValue={other.defaultValue} />
        <textarea
          ref="input"
          className={textareaClassName}
          rows={this.props.rows}
          style={style}
          onChange={this._handleChange} />
      </div>
    );
  }

  getInputNode = () => {
    return ReactDOM.findDOMNode(this.refs.input);
  };

  _syncHeightWithShadow = (newValue, e) => {
    var shadow = ReactDOM.findDOMNode(this.refs.shadow);
    var currentHeight = this.state.height;
    var newHeight;

    if (newValue !== undefined) shadow.value = newValue;
    newHeight = shadow.scrollHeight;

    if (currentHeight !== newHeight) {
      this.setState({height: newHeight});
      if (this.props.onHeightChange) this.props.onHeightChange(e, newHeight);
    }
  };

  _handleChange = (e) => {
    this._syncHeightWithShadow(e.target.value);

    if (this.props.hasOwnProperty('valueLink')) {
      this.props.valueLink.requestChange(e.target.value);
    }

    if (this.props.onChange) this.props.onChange(e);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.value != this.props.value) {
      this._syncHeightWithShadow(nextProps.value);
    }
  };
}

EnhancedTextarea.propTypes = {
  onChange: PropTypes.func,
  onHeightChange: PropTypes.func,
  textareaClassName: PropTypes.string,
  rows: PropTypes.number
};

EnhancedTextarea.defaultProps = {
  rows: 1
};

// Check for commonjs
if (module) {
  module.exports = EnhancedTextarea;
}

export default EnhancedTextarea;
