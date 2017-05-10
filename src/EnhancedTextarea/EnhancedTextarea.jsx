import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class EnhancedTextarea extends Component {

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

    let divClassName = 'chamel-enhanced-textarea-input';
    const classes = this.getClasses('chamel-enhanced-textarea');
    const style = {
      height: this.state.height + 'px'
    };

    if (this.props.textareaClassName) {
      divClassName += ' ' + this.props.textareaClassName;
    }

    if (other.hasOwnProperty("value")) {

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
      <div className={divClassName}>
        <textarea
          ref="shadow"
          className="chamel-enhanced-textarea-shadow"
          tabIndex="-1"
          rows={this.props.rows}
          readOnly={true}
          defaultValue={other.defaultValue}/>
        <textarea
          ref="input"
          className={className}
          rows={this.props.rows}
          style={style}
          onChange={this._handleChange}/>
      </div>
    );
  }

  getInputNode = () => {
    return ReactDOM.findDOMNode(this.refs.input);
  };

  _syncHeightWithShadow = (newValue, e) => {
    const shadow = ReactDOM.findDOMNode(this.refs.shadow);
    const currentHeight = this.state.height;
    let newHeight;

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


  getClasses = (initialClasses, additionalClassObj) => {
    let classString = '';

    //Initialize the classString with the classNames that were passed in
    if (this.props.className) classString += ' ' + this.props.className;

    //Add in initial classes
    if (typeof initialClasses === 'object') {
      classString += ' ' + classNames(initialClasses);
    } else {
      classString += ' ' + initialClasses;
    }

    //Add in additional classes
    if (additionalClassObj) classString += ' ' + classNames(additionalClassObj);

    //Convert the class string into an object and run it through the class set
    return classNames(this.getClassSet(classString));
  };

  getClassSet = (classString) => {
    let classObj = {};

    if (classString) {
      classString.split(' ').forEach(function (className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
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

export default EnhancedTextarea;
