'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CssEvent = require('../utils/CssEvent');

var _CssEvent2 = _interopRequireDefault(_CssEvent);

var _Dom = require('../utils/Dom');

var _Dom2 = _interopRequireDefault(_Dom);

var _KeyLine = require('../utils/KeyLine');

var _KeyLine2 = _interopRequireDefault(_KeyLine);

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _LinkMenuItem = require('./LinkMenuItem');

var _LinkMenuItem2 = _interopRequireDefault(_LinkMenuItem);

var _SubheaderMenuItem = require('./SubheaderMenuItem');

var _SubheaderMenuItem2 = _interopRequireDefault(_SubheaderMenuItem);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***********************
 * Nested Menu Component
 ***********************/
var NestedMenuItem = function (_Component) {
  _inherits(NestedMenuItem, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function NestedMenuItem(props) {
    _classCallCheck(this, NestedMenuItem);

    var _this = _possibleConstructorReturn(this, (NestedMenuItem.__proto__ || Object.getPrototypeOf(NestedMenuItem)).call(this, props));
    // Call paprent constructor


    _this.componentClickAway = function () {
      _this._closeNestedMenu();
    };

    _this._positionNestedMenu = function () {
      var el = _reactDom2.default.findDOMNode(_this),
          nestedMenu = _reactDom2.default.findDOMNode(_this.refs.nestedMenu);

      nestedMenu.style.left = el.offsetWidth + 'px';
    };

    _this._openNestedMen = function () {
      if (!_this.props.disabled) _this.setState({ open: true });
    };

    _this._closeNestedMenu = function () {
      _this.setState({ open: false });
    };

    _this._toggleNestedMenu = function () {
      if (!_this.props.disabled) _this.setState({ open: !_this.state.open });
    };

    _this._onParentItemClick = function () {
      _this._toggleNestedMenu();
    };

    _this._onMenuItemClick = function (e, index, menuItem) {
      if (_this.props.onItemClick) _this.props.onItemClick(e, index, menuItem);
      _this._closeNestedMenu();
    };

    _this._onMenuItemTap = function (e, index, menuItem) {
      if (_this.props.onItemTap) _this.props.onItemTap(e, index, menuItem);
      _this._closeNestedMenu();
    };

    _this.getClasses = function (initialClasses, additionalClassObj) {
      var classString = '';

      //Initialize the classString with the classNames that were passed in
      if (_this.props.className) classString += ' ' + _this.props.className;

      //Add in initial classes
      if ((typeof initialClasses === 'undefined' ? 'undefined' : _typeof(initialClasses)) === 'object') {
        classString += ' ' + (0, _classnames2.default)(initialClasses);
      } else {
        classString += ' ' + initialClasses;
      }

      //Add in additional classes
      if (additionalClassObj) classString += ' ' + (0, _classnames2.default)(additionalClassObj);

      //Convert the class string into an object and run it through the class set
      return (0, _classnames2.default)(_this.getClassSet(classString));
    };

    _this.getClassSet = function (classString) {
      var classObj = {};

      if (classString) {
        classString.split(' ').forEach(function (className) {
          if (className) classObj[className] = true;
        });
      }

      return classObj;
    };

    _this.state = {
      open: false
    };
    return _this;
  }

  _createClass(NestedMenuItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._positionNestedMenu();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this._positionNestedMenu();
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = this.getClasses('chamel-nested-menu-item', {
        'chamel-open': this.state.open,
        'chamel-is-disabled': this.props.disabled
      });

      return _react2.default.createElement(
        'div',
        { className: classes, onMouseEnter: this._openNestedMenu, onMouseLeave: this._closeNestedMenu },
        _react2.default.createElement(
          _MenuItem2.default,
          { index: this.props.index, disabled: this.props.disabled,
            iconRightClassName: 'chamel-icon-custom-arrow-drop-right', onClick: this._onParentItemClick },
          this.props.text
        ),
        _react2.default.createElement(
          _Menu2.default,
          {
            ref: 'nestedMenu',
            menuItems: this.props.menuItems,
            onItemClick: this._onMenuItemClick,
            onItemTap: this._onMenuItemTap,
            hideable: true,
            visible: this.state.open,
            zDepth: this.props.zDepth + 1
          },
          this.props.children
        )
      );
    }
  }]);

  return NestedMenuItem;
}(_react.Component);

NestedMenuItem.propTypes = {
  index: _propTypes2.default.number,
  text: _propTypes2.default.string,
  menuItems: _propTypes2.default.array,
  zDepth: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  onItemClick: _propTypes2.default.func,
  onItemTap: _propTypes2.default.func
};

NestedMenuItem.defaultProps = {
  disabled: false,
  zDepth: 1,
  index: -1
};

exports.default = NestedMenuItem;
module.exports = exports['default'];