'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var React = require('react'),
    ReactDOM = require('react-dom'),
    Paper = require('../Paper'),
    Classable = require('../mixins/classable'),
    Draggable = require('react-draggable2');

var Slider = React.createClass({
    displayName: 'Slider',


    propTypes: {
        required: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        step: React.PropTypes.number,
        error: React.PropTypes.string,
        description: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
        onDragStart: React.PropTypes.func,
        onDragStop: React.PropTypes.func
    },

    mixins: [Classable],

    getDefaultProps: function getDefaultProps() {
        return {
            required: true,
            disabled: false,
            defaultValue: 0,
            min: 0,
            max: 1,
            dragging: false
        };
    },

    getInitialState: function getInitialState() {
        var value = this.props.value;
        if (value == null) value = this.props.defaultValue;
        var percent = (value - this.props.min) / (this.props.max - this.props.min);
        if (isNaN(percent)) percent = 0;
        return {
            value: value,
            percent: percent
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.value != null) {
            this.setValue(nextProps.value);
        }
    },

    render: function render() {
        var classes = this.getClasses('chamel-input', {
            'chamel-error': this.props.error != null
        });

        var sliderClasses = this.getClasses('chamel-slider', {
            'chamel-slider-zero': this.state.percent == 0,
            'chamel-disabled': this.props.disabled
        });

        var percent = this.state.percent;
        if (percent > 1) percent = 1;else if (percent < 0) percent = 0;

        return React.createElement(
            'div',
            { className: classes, style: this.props.style },
            React.createElement('span', { className: 'chamel-input-highlight' }),
            React.createElement('span', { className: 'chamel-input-bar' }),
            React.createElement(
                'span',
                { className: 'chamel-input-description' },
                this.props.description
            ),
            React.createElement(
                'span',
                { className: 'chamel-input-error' },
                this.props.error
            ),
            React.createElement(
                'div',
                { className: sliderClasses, onClick: this._onClick },
                React.createElement(
                    'div',
                    { ref: 'track', className: 'chamel-slider-track' },
                    React.createElement(
                        Draggable,
                        { axis: 'x', bound: 'point',
                            cancel: this.props.disabled ? '*' : null,
                            start: { x: percent * 100 + '%' },
                            onStart: this._onDragStart,
                            onStop: this._onDragStop,
                            onDrag: this._onDragUpdate },
                        React.createElement('div', { className: 'chamel-slider-handle', tabIndex: 0 })
                    ),
                    React.createElement(
                        'div',
                        { className: 'chamel-slider-selection chamel-slider-selection-low',
                            style: { width: percent * 100 + '%' } },
                        React.createElement('div', { className: 'chamel-slider-selection-fill' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'chamel-slider-selection chamel-slider-selection-high',
                            style: { width: (1 - percent) * 100 + '%' } },
                        React.createElement('div', { className: 'chamel-slider-selection-fill' })
                    )
                )
            ),
            React.createElement('input', { ref: 'input', type: 'hidden',
                name: this.props.name,
                value: this.state.value,
                required: this.props.required,
                min: this.props.min,
                max: this.props.max,
                step: this.props.step })
        );
    },

    getValue: function getValue() {
        return this.state.value;
    },

    setValue: function setValue(i) {
        // calculate percentage
        var percent = (i - this.props.min) / (this.props.max - this.props.min);
        if (isNaN(percent)) percent = 0;
        // update state
        this.setState({
            value: i,
            percent: percent
        });
    },

    getPercent: function getPercent() {
        return this.state.percent;
    },

    setPercent: function setPercent(percent) {
        var value = this._percentToValue(percent);
        this.setState({ value: value, percent: percent });
    },

    clearValue: function clearValue() {
        this.setValue(0);
    },

    _onClick: function _onClick(e) {
        // let draggable handle the slider
        if (this.state.dragging || this.props.disabled) return;
        var value = this.state.value;
        var node = ReactDOM.findDOMNode(this.refs.track);
        var boundingClientRect = node.getBoundingClientRect();
        var offset = e.clientX - boundingClientRect.left;
        this._updateWithChangeEvent(e, offset / node.clientWidth);
    },

    _onDragStart: function _onDragStart(e, ui) {
        this.setState({
            dragging: true
        });
        if (this.props.onDragStart) this.props.onDragStart(e, ui);
    },

    _onDragStop: function _onDragStop(e, ui) {
        this.setState({
            dragging: false
        });
        if (this.props.onDragStop) this.props.onDragStop(e, ui);
    },

    _onDragUpdate: function _onDragUpdate(e, ui) {
        if (!this.state.dragging) return;
        if (!this.props.disabled) this._dragX(e, ui.position.left);
    },

    _dragX: function _dragX(e, pos) {
        var max = ReactDOM.findDOMNode(this.refs.track).clientWidth;
        if (pos < 0) pos = 0;else if (pos > max) pos = max;
        this._updateWithChangeEvent(e, pos / max);
    },

    _updateWithChangeEvent: function _updateWithChangeEvent(e, percent) {
        if (this.state.percent === percent) return;
        this.setPercent(percent);
        var value = this._percentToValue(percent);
        if (this.props.onChange) this.props.onChange(e, value);
    },

    _percentToValue: function _percentToValue(percent) {
        return percent * (this.props.max - this.props.min) + this.props.min;
    }

});

// Check for commonjs
if (module) {
    module.exports = Slider;
}

exports.default = Slider;
module.exports = exports['default'];