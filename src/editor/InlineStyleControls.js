import React from 'react';
import ReactDOM from 'react-dom';
import StyleButton from './StyleButton';

// Inline Styles that are used in the editor and displayed in the toolbar
const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

/**
 * Handle when displaying the inline style controls and
 * Set the styles of the controls if it is toggled or not
 */
class InlineStyleControls extends React.Component {
    static propTypes = {

        /**
         * The top-level state object for the draft-js editor.
         *
         * @var {object}
         */
        editorState: React.PropTypes.object.isRequired,

        /**
         * The theme that we will be using to decorate the toolbar buttons
         *
         * @var {object}
         */
        theme: React.PropTypes.object.isRequired,

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

        let currentStyle = this.props.editorState.getCurrentInlineStyle();
        let displayStyles = [];

        // Loop thru the inline styles and setup the style button
        INLINE_STYLES.map(function (type) {

            let className = this.props.theme.chamelEditorStyleButton;
            if (currentStyle.has(type.style)) {
                className += ' ' + this.props.theme.chamelEditorActiveButton;
            }

            displayStyles.push(
                <StyleButton
                    key={type.label}
                    className={className}
                    label={type.label}
                    onToggle={this.props.onToggle}
                    style={type.style}
                />
            );
        }.bind(this))

        return (
            <div className={this.props.theme.chamelEditorControls}>
                {displayStyles}
            </div>
        );
    }
}

export default InlineStyleControls;