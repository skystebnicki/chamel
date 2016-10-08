'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _stylePropable = require('../mixins/style-propable');

var _stylePropable2 = _interopRequireDefault(_stylePropable);

var _autoPrefix = require('../styles/auto-prefix');

var _autoPrefix2 = _interopRequireDefault(_autoPrefix);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _lightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);

var _themeManager = require('../styles/theme-manager');

var _themeManager2 = _interopRequireDefault(_themeManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CircularProgress = _react2.default.createClass({
  displayName: 'CircularProgress',


  mixins: [_stylePropable2.default],

  propTypes: {
    mode: _react2.default.PropTypes.oneOf(["determinate", "indeterminate"]),
    value: _react2.default.PropTypes.number,
    min: _react2.default.PropTypes.number,
    max: _react2.default.PropTypes.number,
    size: _react2.default.PropTypes.number,
    color: _react2.default.PropTypes.string,
    innerStyle: _react2.default.PropTypes.object
  },

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },
  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _themeManager2.default.getMuiTheme(_lightRawTheme2.default),
      componentIsMounted: false
    };
  },


  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },
  _getRelativeValue: function _getRelativeValue() {
    var value = this.props.value;
    var min = this.props.min;
    var max = this.props.max;

    var clampedValue = Math.min(Math.max(min, value), max);
    var rangeValue = max - min;
    var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
    return relValue * 100;
  },
  componentDidMount: function componentDidMount() {
    var wrapper = _reactDom2.default.findDOMNode(this.refs.wrapper);
    var path = _reactDom2.default.findDOMNode(this.refs.path);

    this.setState({ componentIsMounted: true });

    this._scalePath(path);
    this._rotateWrapper(wrapper);
  },


  componentWillUnmount: function componentWillUnmount() {
    this.setState({ componentIsMounted: false });
  },

  _scalePath: function _scalePath(path, step) {
    step = step || 0;
    step %= 3;

    setTimeout(this._scalePath.bind(this, path, step + 1), step ? 750 : 250);

    if (!this.state.componentIsMounted) return;
    if (this.props.mode !== "indeterminate") return;

    if (step === 0) {
      path.style.strokeDasharray = "1, 200";
      path.style.strokeDashoffset = 0;
      path.style.transitionDuration = "0ms";
    } else if (step === 1) {
      path.style.strokeDasharray = "89, 200";
      path.style.strokeDashoffset = -35;
      path.style.transitionDuration = "750ms";
    } else {
      path.style.strokeDasharray = "89,200";
      path.style.strokeDashoffset = -124;
      path.style.transitionDuration = "850ms";
    }
  },
  _rotateWrapper: function _rotateWrapper(wrapper) {
    setTimeout(this._rotateWrapper.bind(this, wrapper), 10050);

    if (!this.state.componentIsMounted) return;
    if (this.props.mode !== "indeterminate") return;

    wrapper.style.transform = null;
    wrapper.style.transform = "rotate(0deg)";
    wrapper.style.transitionDuration = "0ms";
    wrapper.style = _autoPrefix2.default.all(wrapper.style);

    setTimeout(function () {
      wrapper.style.transform = "rotate(1800deg)";
      wrapper.style.transitionDuration = "10s";
      wrapper.style.transitionTimingFunction = "linear";
      wrapper.style = _autoPrefix2.default.all(wrapper.style);
    }, 50);
  },
  getDefaultProps: function getDefaultProps() {
    return {
      mode: "indeterminate",
      value: 0,
      min: 0,
      max: 100,
      size: 1
    };
  },
  getTheme: function getTheme() {
    return this.state.muiTheme.rawTheme.palette;
  },
  getStyles: function getStyles(zoom) {
    zoom *= 1.4;
    var size = "50px";

    var margin = Math.round((50 * zoom - 50) / 2);

    if (margin < 0) margin = 0;

    var styles = {
      root: {
        position: "relative",
        margin: margin + "px",
        display: "inline-block",
        width: size,
        height: size
      },
      wrapper: {
        width: size,
        height: size,
        margin: "5px",
        display: "inline-block",
        transition: _transitions2.default.create("transform", "20s", null, "linear")
      },
      svg: {
        height: size,
        position: "relative",
        transform: "scale(" + zoom + ")",
        width: size
      },
      path: {
        strokeDasharray: "89,200",
        strokeDashoffset: 0,
        stroke: this.props.color || this.getTheme().primary1Color,
        strokeLinecap: "round",
        transition: _transitions2.default.create("all", "1.5s", null, "ease-in-out")
      }
    };

    _autoPrefix2.default.set(styles.wrapper, "transitionTimingFunction", "linear");

    if (this.props.mode === "determinate") {
      var relVal = this._getRelativeValue();
      styles.path.transition = _transitions2.default.create("all", "0.3s", null, "linear");
      styles.path.strokeDasharray = Math.round(relVal * 1.25) + ",200";
    }

    return styles;
  },
  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var innerStyle = _props.innerStyle;
    var size = _props.size;

    var other = _objectWithoutProperties(_props, ['style', 'innerStyle', 'size']);

    var styles = this.getStyles(size || 1);

    return _react2.default.createElement(
      'div',
      _extends({}, other, { style: this.prepareStyles(styles.root, style) }),
      _react2.default.createElement(
        'div',
        { ref: 'wrapper', style: this.prepareStyles(styles.wrapper, innerStyle) },
        _react2.default.createElement(
          'svg',
          { style: this.prepareStyles(styles.svg) },
          _react2.default.createElement('circle', { ref: 'path', style: this.prepareStyles(styles.path), cx: '25', cy: '25',
            r: '20', fill: 'none', strokeWidth: '2.5', strokeMiterlimit: '10' })
        )
      )
    );
  }
});

module.exports = CircularProgress;