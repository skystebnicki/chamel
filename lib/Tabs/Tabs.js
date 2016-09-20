'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Tabs component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Outer container for tabs
 */
var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this2 = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));
    // Call parent constructor


    _this2.handleTouchTap = function (tabIndex, tab) {
      if (_this2.props.onChange && _this2.state.selectedIndex !== tabIndex) {
        _this2.props.onChange(tabIndex, tab);
      }

      _this2.setState({ selectedIndex: tabIndex });
      //default CB is _onActive. Can be updated in tab
      if (tab.props.onActive) tab.props.onActive(tab);
    };

    var selectedIndex = 0;
    if (_this2.props.initialSelectedIndex && _this2.props.initialSelectedIndex < _this2.props.children.length) {
      selectedIndex = _this2.props.initialSelectedIndex;
    }

    _this2.state = {
      selectedIndex: selectedIndex
    };
    return _this2;
  }

  /**
   * An alternate theme may be passed down by a provider
   */


  _createClass(Tabs, [{
    key: 'getEvenWidth',
    value: function getEvenWidth() {
      return parseInt(window.getComputedStyle(_reactDom2.default.findDOMNode(this)).getPropertyValue('width'), 10);
    }
  }, {
    key: 'getTabCount',
    value: function getTabCount() {
      return _react2.default.Children.count(this.props.children);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.tabWidth) {
        if (!(this.props.children.length * this.props.tabWidth > this.getEvenWidth())) {
          this.setState({
            width: this.props.tabWidth,
            fixed: false
          });
          return;
        }
      }

      this.setState({
        width: this.getEvenWidth(),
        fixed: true
      });
    }

    /**
     * Handle touch or click
     *
     * @param tabIndex
     * @param tab
     */

  }, {
    key: 'render',
    value: function render() {

      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.tabs ? this.context.chamelTheme.tabs : _ChamelThemeService2.default.defaultTheme.tabs;

      var _this = this;
      var width = 100 / this.getTabCount() + '%';

      /*
      var width = this.state.fixed ?
      this.state.width/this.props.children.length :
          this.props.tabWidth;*/
      var left = 'calc(' + width + '*' + this.state.selectedIndex + ')';
      //var left = width * this.state.selectedIndex || 0;
      var currentTemplate = null;
      var tabs = _react2.default.Children.map(this.props.children, function (tab, index) {
        if (tab.type.name === "Tab") {
          // Generic UI implementation
          if (_this.state.selectedIndex === index) currentTemplate = tab.props.children;
          return _react2.default.cloneElement(tab, {
            key: index,
            selected: _this.state.selectedIndex === index,
            tabIndex: index,
            width: width,
            handleTouchTap: _this.handleTouchTap
          });
        } else {
          var type = tab.type.displayName || tab.type;
          throw "Tabs only accepts Tab Components as children. Found " + type + " as child number " + (index + 1) + " of Tabs";
        }
      });

      return _react2.default.createElement(
        'div',
        { className: theme.tabsContainer },
        _react2.default.createElement(
          'div',
          { className: theme.tabItemContainer },
          tabs
        ),
        _react2.default.createElement('div', { className: theme.tabInkBar, style: { left: left, width: width } }),
        _react2.default.createElement(
          'div',
          { className: theme.tabTemplate },
          currentTemplate
        )
      );
    }
  }]);

  return Tabs;
}(_react2.default.Component);

Tabs.propTypes = {
  initialSelectedIndex: _react2.default.PropTypes.number,
  onActive: _react2.default.PropTypes.func,
  tabWidth: _react2.default.PropTypes.number
};
Tabs.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};
exports.default = Tabs;
module.exports = exports['default'];