'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ClickAwayable = require('../mixins/ClickAwayable');

var _ClickAwayable2 = _interopRequireDefault(_ClickAwayable);

var _dropDownArrow = require('../svg-icons/drop-down-arrow');

var _dropDownArrow2 = _interopRequireDefault(_dropDownArrow);

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Menu = require('../Menu/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Popover = require('../Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _FontIcon = require('../FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _IconButton = require('../Button/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component for displaying dropdowns
 */
var SelectButton = function (_React$Component) {
  _inherits(SelectButton, _React$Component);

  /**
   * Class constructor takes properties and passes them to the parent/super
   */


  /**
   * Set accepted properties
   */
  function SelectButton(props) {
    _classCallCheck(this, SelectButton);

    var _this = _possibleConstructorReturn(this, (SelectButton.__proto__ || Object.getPrototypeOf(SelectButton)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      open: false,
      anchorEl: null,
      selectedIndex: props.selectedIndex || 0
    };
    return _this;
  }

  /**
   * An alternate theme may be passed down by a provider
   */


  /**
   * Set property defaults
   */


  _createClass(SelectButton, [{
    key: 'componentDidMount',


    /**
     * Popover has entered the dom
     */
    value: function componentDidMount() {
      if (this.props.hasOwnProperty('selectedIndex')) {
        this._setSelectedIndex(this.props);
      }
    }

    /**
     * Componenent is about to exit the dom
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}

    /**
     * Componenent is about to exit the dom
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.hasOwnProperty('selectedIndex')) {
        this._setSelectedIndex(nextProps);
      }
    }

    /**
     * Render Componenent
     */

  }, {
    key: 'render',
    value: function render() {

      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.picker ? this.context.chamelTheme.picker : _ChamelThemeService2.default.defaultTheme.picker;

      var icon = typeof this.props.icon === 'string' ? _react2.default.createElement(_FontIcon2.default, { className: this.props.icon }) : this.props.icon;

      // Use default dropdown icon
      if (!icon && this.props.children) {
        icon = this.props.children;
      } else {
        icon = _react2.default.createElement(_dropDownArrow2.default, null);
      }

      return _react2.default.createElement(
        'div',
        { className: theme.selectButtonCon },
        _react2.default.createElement(
          _IconButton2.default,
          { className: this.props.className, onTap: this._onControlClick },
          icon
        ),
        _react2.default.createElement(
          _Popover2.default,
          {
            open: this.state.open,
            anchorEl: this.state.anchorEl,
            anchorOrigin: { horizontal: 'left', vertical: 'top' },
            onRequestClose: this._handleRequestClose,
            relative: true
          },
          _react2.default.createElement(_Menu2.default, {
            ref: 'menuItems',
            autoWidth: this.props.autoWidth,
            selectedIndex: this.state.selectedIndex,
            menuItems: this.props.menuItems,
            onItemClick: this._onMenuItemClick
          })
        )
      );
    }

    /**
     * Set which menu item is selected
     *
     * @private
     * @param {Object} props The props we are setting
     */


    /**
     * Meny control clicked handler
     *
     * @private
     * @param {DOMEvent} e The click event fired
     */


    /**
     * Triggered when a menu item gets clicked
     *
     * @private
     * @param {DOMEvent} e The event fired through
     * @param {int} key The index of the item clicked - this will be deprecated soon
     * @param {Object} payload Whatever payload was passed to the menu
     */


    /**
     * Handle when the popover gets closed
     *
     * @private
     * @param {DOMEvent} e The click event fired
     */

  }]);

  return SelectButton;
}(_react2.default.Component);

SelectButton.propTypes = {
  onChange: _react2.default.PropTypes.func,
  selectedIndex: _react2.default.PropTypes.number,
  icon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  menuItems: _react2.default.PropTypes.array.isRequired,

  /**
   * Optional additional class for the icon button
   */
  className: _react2.default.PropTypes.string,

  /**
   * Optional children can be used to define content
   */
  children: _react2.default.PropTypes.node
};
SelectButton.defaultProps = {
  autoWidth: true,
  children: null
};
SelectButton.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._setSelectedIndex = function (props) {
    var selectedIndex = props.selectedIndex;

    if (process.env.NODE_ENV !== 'production' && selectedIndex < 0) {
      console.warn('Cannot set selectedIndex to a negative index.', selectedIndex);
    }

    _this2.setState({ selectedIndex: selectedIndex > -1 ? selectedIndex : 0 });
  };

  this._onControlClick = function (e) {
    e.preventDefault();

    _this2.setState({
      open: !_this2.state.open,
      anchorEl: e.currentTarget
    });
  };

  this._onMenuItemClick = function (e, key, payload) {
    if (_this2.props.onChange && _this2.state.selectedIndex !== key) {
      _this2.props.onChange(e, key, payload);
    }

    _this2.setState({
      selectedIndex: key,
      open: false
    });

    // Prevent ghost clicks
    e.preventDefault();
    e.stopPropagation();

    // TODO: Not sure if this is needed with the above being called
    e.nativeEvent.stopImmediatePropagation();
  };

  this._handleRequestClose = function (e) {
    _this2.setState({
      open: false
    });
  };
};

exports.default = SelectButton;
module.exports = exports['default'];