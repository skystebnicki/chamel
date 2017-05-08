import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Paper from '../Paper/Paper';
import Draggable from 'react-draggable2';

class Slider extends Component {

  /**
   * Class constructor takes properties and passes them to the parent/super
   */
  constructor(props) {
    super(props);
    let value = this.props.value;
    if (value == null) value = this.props.defaultValue;
    let percent = (value - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;
    this.state = {
      value: value,
      percent: percent
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != null) {
      this.setValue(nextProps.value);
    }
  }

  render() {
    const classes = this.getClasses('chamel-input', {
      'chamel-error': this.props.error != null
    });

    const sliderClasses = this.getClasses('chamel-slider', {
      'chamel-slider-zero': this.state.percent == 0,
      'chamel-disabled': this.props.disabled
    });

    const percent = this.state.percent;
    if (percent > 1) percent = 1; else if (percent < 0) percent = 0;

    return (
      <div className={classes} style={this.props.style}>
        <span className="chamel-input-highlight"></span>
        <span className="chamel-input-bar"></span>
        <span className="chamel-input-description">{this.props.description}</span>
        <span className="chamel-input-error">{this.props.error}</span>
        <div className={sliderClasses} onClick={this._onClick}>
          <div ref="track" className="chamel-slider-track">
            <Draggable axis="x" bound="point"
                       cancel={this.props.disabled ? '*' : null}
                       start={{x: (percent * 100) + '%'}}
                       onStart={this._onDragStart}
                       onStop={this._onDragStop}
                       onDrag={this._onDragUpdate}>
              <div className="chamel-slider-handle" tabIndex={0}></div>
            </Draggable>
            <div className="chamel-slider-selection chamel-slider-selection-low"
                 style={{width: (percent * 100) + '%'}}>
              <div className="chamel-slider-selection-fill"></div>
            </div>
            <div className="chamel-slider-selection chamel-slider-selection-high"
                 style={{width: ((1 - percent) * 100) + '%'}}>
              <div className="chamel-slider-selection-fill"></div>
            </div>
          </div>
        </div>
        <input ref="input" type="hidden"
               name={this.props.name}
               value={this.state.value}
               required={this.props.required}
               min={this.props.min}
               max={this.props.max}
               step={this.props.step}/>
      </div>
    );
  }

  getValue = () => {
    return this.state.value;
  };

  setValue = (i) => {
    // calculate percentage
    let percent = (i - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;
    // update state
    this.setState({
      value: i,
      percent: percent
    });
  };

  getPercent = () => {
    return this.state.percent;
  };

  setPercent = (percent) => {
    const value = this._percentToValue(percent);
    this.setState({value: value, percent: percent});
  };

  clearValue = () => {
    this.setValue(0);
  };

  _onClick = (e) => {
    // let draggable handle the slider
    if (this.state.dragging || this.props.disabled) return;
    const value = this.state.value;
    const node = ReactDOM.findDOMNode(this.refs.track);
    const boundingClientRect = node.getBoundingClientRect();
    const offset = e.clientX - boundingClientRect.left;
    this._updateWithChangeEvent(e, offset / node.clientWidth);
  };

  _onDragStart = (e, ui) => {
    this.setState({
      dragging: true
    });
    if (this.props.onDragStart) this.props.onDragStart(e, ui);
  };

  _onDragStop = (e, ui) => {
    this.setState({
      dragging: false
    });
    if (this.props.onDragStop) this.props.onDragStop(e, ui);
  };

  _onDragUpdate = (e, ui) => {
    if (!this.state.dragging) return;
    if (!this.props.disabled) this._dragX(e, ui.position.left);
  };

  _dragX = (e, pos) => {
    const max = ReactDOM.findDOMNode(this.refs.track).clientWidth;
    if (pos < 0) pos = 0; else if (pos > max) pos = max;
    this._updateWithChangeEvent(e, pos / max);
  };

  _updateWithChangeEvent = (e, percent) => {
    if (this.state.percent === percent) return;
    this.setPercent(percent);
    const value = this._percentToValue(percent);
    if (this.props.onChange) this.props.onChange(e, value);
  };

  _percentToValue = (percent) => {
    return percent * (this.props.max - this.props.min) + this.props.min;
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


RadioButtonGroup.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  error: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragStop: PropTypes.func
};

RadioButtonGroup.defaultProps = {
  required: true,
  disabled: false,
  defaultValue: 0,
  min: 0,
  max: 1,
  dragging: false
};

export default Slider;
