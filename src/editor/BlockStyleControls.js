import React from 'react';
import ReactDOM from 'react-dom';
import StyleButton from './StyleButton';

// Block Types that are used in the editor and displayed in the toolbar
const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
    {label: 'SRC', style: 'view-source'},
];

/**
 * Handle when displaying the block type controls and
 * Set the styles of the controls if it is toggled or not
 */
class BlockStyleControls extends React.Component {
    static propTypes = {

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

        let displayStyleButton = [];

        // Loop thru the block types and setup the style button
        BLOCK_TYPES.map((type) => {

            let setToActive = true;
            let className = this.props.theme.chamelEditorStyleButton;

            if (type.style === this.props.blockType ||
                (type.style === "view-source" && this.props.sourceView)) {
                className += ' ' + this.props.theme.chamelEditorActiveButton;
                setToActive = false;
            }

            displayStyleButton.push(
                <StyleButton
                    key={type.label}
                    className={className}
                    label={type.label}
                    onToggle={this.props.onToggle.bind(this, setToActive)}
                    style={type.style}
                />
            );
        });

        return (
            <div className={this.props.theme.chamelEditorControls}>
                {displayStyleButton}
            </div>
        );
    }
}

export default BlockStyleControls;