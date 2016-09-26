import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Style button component that will display the style button in the toolbar editor
 */
class InlineStyleControls extends React.Component {
    static propTypes = {

        /**
         * The top-level state object for the draft-js editor.
         *
         * @var {string}
         */
        style: React.PropTypes.string.isRequired,

        /**
         * The label of the button that will be displayed in the editor's toolbar
         *
         * @var {string}
         */
        label: React.PropTypes.string,

        /**
         * The callback function used when user toggles the toolbar buttons of the editor
         *
         * @var {func}
         */
        onToggle: React.PropTypes.func
    }

    /**
     * Class constructor
     *
     * @param {Object} props Properties to send to the render function
     */
    constructor(props) {

        // Call parent constructor
        super(props);
    }

    render() {
        return (
            <span className={this.props.className} onMouseDown={this._onToggle}>
              {this.props.label}
            </span>
        );
    }

    /**
     * Function that handles the toggling of toolbar button
     *
     * @param {DOMEvent} e Reference to the DOM event being sent
     * @private
     */
    _onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    };
}

export default InlineStyleControls;