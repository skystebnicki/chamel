'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _LinkMenuItem = require('./LinkMenuItem');

var _LinkMenuItem2 = _interopRequireDefault(_LinkMenuItem);

var _SubheaderMenuItem = require('./SubheaderMenuItem');

var _SubheaderMenuItem2 = _interopRequireDefault(_SubheaderMenuItem);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));
    // Call paprent constructor


    _this._handleMouseEnter = function () {
      _this.setState({ focusedIndex: null });
    };

    _this._onNestedItemClick = function (e, index, menuItem) {
      if (_this.props.onItemClick) _this.props.onItemClick(e, index, menuItem);
    };

    _this._onNestedItemTap = function (e, index, menuItem) {
      if (_this.props.onItemTap) _this.props.onItemTap(e, index, menuItem);
    };

    _this._onItemClick = function (e, index) {
      if (_this.props.onItemClick) _this.props.onItemClick(e, index, _this.props.menuItems[index]);
    };

    _this._onItemTap = function (e, index) {
      if (_this.props.onItemTap) _this.props.onItemTap(e, index, _this.props.menuItems[index]);
    };

    _this._onItemToggle = function (e, index, toggled) {
      if (_this.props.onItemToggle) _this.props.onItemToggle(e, index, _this.props.menuItems[index], toggled);
    };

    _this.getClasses = function (initialClasses, additionalClassObj) {
      var classString = '';

      //Initialize the classString with the classNames that were passed in
      if (_this.props.className) classString += ' ' + _this.props.className;

      //Add in initial classes
      if ((typeof initialClasses === 'undefined' ? 'undefined' : _typeof(initialClasses)) === 'object') {
        classString += ' ' + classNames(initialClasses);
      } else {
        classString += ' ' + initialClasses;
      }

      //Add in additional classes
      if (additionalClassObj) classString += ' ' + classNames(additionalClassObj);

      //Convert the class string into an object and run it through the class set
      return classNames(_this.getClassSet(classString));
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
      nestedMenuShown: false,
      focusedIndex: props.focusedIndex
    };
    return _this;
  }

  _createClass(Menu, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ focusedIndex: nextProps.focusedIndex });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var el = _reactDom2.default.findDOMNode(this);

      //Set the menu with
      this._setKeyWidth(el);

      //Save the initial menu height for later
      this._initialMenuHeight = el.offsetHeight + _KeyLine2.default.Desktop.GUTTER_LESS;

      //Show or Hide the menu according to visibility
      this._renderVisibility();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.visible !== prevProps.visible) this._renderVisibility();
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var theme = this.context.chamelTheme && this.context.chamelTheme.menu ? this.context.chamelTheme.menu : _ChamelThemeService2.default.defaultTheme.menu;

      var classes = (0, _classnames3.default)(theme.menu, (_classnames = {}, _defineProperty(_classnames, theme.menuHideable, this.props.hideable), _defineProperty(_classnames, theme.menuVisible, this.props.visible), _classnames));

      // If we have custom classes in the props, then let's include it
      if (this.props.classes) {
        classes += " " + this.props.classes;
      }

      var children = this.props.menuItems.length ? this._getChildren() : this.props.children;

      return _react2.default.createElement(
        _Paper2.default,
        {
          ref: 'paperContainer',
          onMouseEnter: this._handleMouseEnter,
          onMouseLeave: this._handleMouseLeave,
          zDepth: this.props.zDepth,
          className: classes
        },
        children
      );
    }

    /**
     * Callback used to handle the hovering of mouse into the menu list
     *
     * @private
     */

  }, {
    key: '_getChildren',
    value: function _getChildren() {
      var children = [],
          menuItem = void 0,
          itemComponent = void 0,
          isSelected = void 0,
          isDisabled = void 0,
          isFocused = void 0;

      //This array is used to keep track of all nested menu refs
      this._nestedChildren = [];

      for (var i = 0; i < this.props.menuItems.length; i++) {
        menuItem = this.props.menuItems[i];
        isSelected = i === this.props.selectedIndex;
        isDisabled = menuItem.disabled === undefined ? false : menuItem.disabled;

        if (this.state.focusedIndex == null) {
          isFocused = false;
        } else {
          isFocused = i === this.props.focusedIndex;
        }

        var _menuItem = menuItem,
            icon = _menuItem.icon,
            data = _menuItem.data,
            attribute = _menuItem.attribute,
            number = _menuItem.number,
            toggle = _menuItem.toggle,
            onClick = _menuItem.onClick,
            other = _objectWithoutProperties(_menuItem, ['icon', 'data', 'attribute', 'number', 'toggle', 'onClick']);

        switch (menuItem.type) {

          case _MenuItem2.default.Types.LINK:
            itemComponent = _react2.default.createElement(_LinkMenuItem2.default, {
              key: i,
              index: i,
              payload: menuItem.payload,
              target: menuItem.target,
              text: menuItem.text,
              disabled: isDisabled });
            break;

          case _MenuItem2.default.Types.SUBHEADER:
            itemComponent = _react2.default.createElement(_SubheaderMenuItem2.default, {
              key: i,
              index: i,
              text: menuItem.text });
            break;

          case _MenuItem2.default.Types.NESTED:
            var NestedMenuItem = require("./NestedMenuItem");
            itemComponent = _react2.default.createElement(NestedMenuItem, {
              ref: i,
              key: i,
              index: i,
              text: menuItem.text,
              disabled: isDisabled,
              menuItems: menuItem.items,
              zDepth: this.props.zDepth,
              onItemClick: this._onNestedItemClick,
              onItemTap: this._onNestedItemClick });
            this._nestedChildren.push(i);
            break;

          default:
            itemComponent = _react2.default.createElement(
              _MenuItem2.default,
              _extends({}, other, {
                selected: isSelected,
                focused: isFocused,
                key: i,
                index: i,
                icon: menuItem.icon,
                data: menuItem.data,
                attribute: menuItem.attribute,
                number: menuItem.number,
                toggle: menuItem.toggle,
                disabled: isDisabled,
                onClick: this._onItemClick }),
              menuItem.text
            );
        }
        children.push(itemComponent);
      }

      return children;
    }
  }, {
    key: '_setKeyWidth',
    value: function _setKeyWidth(el) {
      var menuWidth = this.props.autoWidth ? _KeyLine2.default.getIncrementalDim(el.offsetWidth) + 'px' : '100%';

      //Update the menu width
      _Dom2.default.withoutTransition(el, function () {
        // Changed the below to use auto width because
        // it was causing text to extnd beyond the menu
        // if items were added after the fact.
        // - Sky Stebnicki
        // el.style.width = menuWidth;
        el.style.width = "auto";
      });
    }
  }, {
    key: '_renderVisibility',
    value: function _renderVisibility() {
      var el = void 0;

      if (this.props.hideable) {
        el = _reactDom2.default.findDOMNode(this);
        var innerContainer = _reactDom2.default.findDOMNode(this.refs.paperContainer.getInnerContainer());

        if (this.props.visible) {
          // Update the width
          this._setKeyWidth(el);

          //Open the menu
          /*
           This was not dealing with added menu items well at all. Changed the height
           to auto to fix the problems.
           - Sky Stebnicki
           */
          el.style.height = "auto"; //this._initialMenuHeight + 'px';

          //Set the overflow to visible after the animation is done so
          //that other nested menus can be shown
          _CssEvent2.default.onTransitionEnd(el, function () {
            //Make sure the menu is open before setting the overflow.
            //This is to accout for fast clicks
            if (this.props.visible) innerContainer.style.overflow = 'visible';
          }.bind(this));
        } else {

          //Close the menu
          el.style.height = '0px';

          //Set the overflow to hidden so that animation works properly
          innerContainer.style.overflow = 'hidden';
        }
      }
    }
  }]);

  return Menu;
}(_react.Component);

Menu.propTypes = {
  autoWidth: _propTypes2.default.bool,
  onItemTap: _propTypes2.default.func,
  onItemClick: _propTypes2.default.func,
  onToggleClick: _propTypes2.default.func,
  menuItems: _propTypes2.default.array,
  selectedIndex: _propTypes2.default.number,
  hideable: _propTypes2.default.bool,
  visible: _propTypes2.default.bool,
  zDepth: _propTypes2.default.number,

  /**
   * The index that is currently being focused.
   *
   * This is used when moving the list up/down using the keyboard instead of hovering using the mouse
   *
   * @param {int}
   */
  focusedIndex: _propTypes2.default.number,

  /**
   * Custom classes that will be applied to the paper container
   *
   * @param {string}
   */
  classes: _propTypes2.default.string
};

Menu.defaultProps = {
  focusedIndex: null,
  autoWidth: true,
  hideable: false,
  visible: true,
  zDepth: 1,
  menuItems: []
};

/**
 * An alternate theme may be passed down by a provider
 */
Menu.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = Menu;
module.exports = exports['default'];