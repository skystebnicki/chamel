'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Events = require('../utils/Events');

var _Events2 = _interopRequireDefault(_Events);

var _Dom = require('../utils/Dom');

var _Dom2 = _interopRequireDefault(_Dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

  //When the component mounts, listen to click events and check if we need to
  //Call the componentClickAway function.
  componentDidMount: function componentDidMount() {
    if (!this.manuallyBindClickAway) this._bindClickAway();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._unbindClickAway();
  },

  _checkClickAway: function _checkClickAway(e) {
    var el = _reactDom2.default.findDOMNode(this);

    // Check if the target is inside the current component
    if (this.isMounted() && e.target != el && !_Dom2.default.isDescendant(el, e.target) && document.documentElement.contains(e.target)) {
      if (this.componentClickAway) this.componentClickAway();
    }
  },

  _bindClickAway: function _bindClickAway() {
    _Events2.default.on(document, 'click', this._checkClickAway);
  },

  _unbindClickAway: function _unbindClickAway() {
    _Events2.default.off(document, 'click', this._checkClickAway);
  }

};