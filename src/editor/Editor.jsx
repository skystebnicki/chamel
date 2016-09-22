import React from 'react';
import ReactDOM from 'react-dom';
import Classable from "../mixins/classable";
import immutable from 'immutable';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';
import {Editor, EditorState, RichUtils} from 'draft-js';

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

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
];

// Inline Styles that are used in the editor and displayed in the toolbar
const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

/**
 * Handle when displaying the block type controls and
 * Set the styles of the controls if it is toggled or not
 */
const BlockStyleControls = (props) => {
    let displayStyleButton = [];

    // Loop thru the block types and setup the style button
    BLOCK_TYPES.map(function (type) {

        let className = props.theme.chamelEditorStyleButton;
        if (type.style === props.blockType) {
            className += ' ' + props.theme.chamelEditorActiveButton;
        }

        displayStyleButton.push(
            <StyleButton
                key={type.label}
                className={className}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
            />
        );
    })

    return (
        <div className={props.theme.chamelEditorControls}>
            {displayStyleButton}
        </div>
    );
};

/**
 * Handle when displaying the inline style controls and
 * Set the styles of the controls if it is toggled or not
 */
const InlineStyleControls = (props) => {
    let currentStyle = props.editorState.getCurrentInlineStyle();
    let displayStyles = [];

    // Loop thru the inline styles and setup the style button
    INLINE_STYLES.map(function (type) {

        let className = props.theme.chamelEditorStyleButton;
        if (currentStyle.has(type.style)) {
            className += ' ' + props.theme.chamelEditorActiveButton;
        }

        displayStyles.push(
            <StyleButton
                key={type.label}
                className={className}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
            />
        );
    })

    return (
        <div className={props.theme.chamelEditorControls}>
            {displayStyles}
        </div>
    );
};

/**
 * Style button component that will display the style button in the editor toolbar
 */
class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        return (
            <span className={this.props.className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}

/**
 * Chamel Editor component
 */
class ChamelEditor extends React.Component {

    /**
     * Set accepted properties
     */
    static propTypes = {
        /**
         * Flag to indicate if the drawer is open
         *
         * @type {function}
         */
        onChange: React.PropTypes.func,

        /**
         * If permanent we cannot close the drawer
         *
         * @type {string}
         */
        value: React.PropTypes.string,

        /**
         * Optional. The custom className that will be used to style the editor container
         *
         * @type {string}
         */
        className: React.PropTypes.string,
    }

    /**
     * An alternate theme may be passed down by a provider
     */
    static contextTypes = {
        chamelTheme: React.PropTypes.object
    };

    /**
     * Class constructor
     *
     * @param {Object} props Properties to send to the render function
     */
    constructor(props) {

        // Call parent constructor
        super(props);

        this.state = {editorState: EditorState.createEmpty()};

        this.focus = () => this.refs.editor.focus();

        this.onChange = (editorState) => this._onChange(editorState);
        this.onTab = (e) => this._onTab(e);

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

        this.getBlockStyle = (block, theme) => this._getBlockStyle(block, theme);
    }

    /**
     * Handle when the editor has changed
     * @param {obj} editorState  The top-level state object for the editor.
     * @private
     */
    _onChange(editorState) {
        this.setState({editorState})

        // TODO: Get the content text including the styles. Right now it gets the plain text
        if(this.props.onChange) {
            this.props.onChange(editorState.getCurrentContent().getPlainText())
        }
    }


    /**
     * Handle a RETURN keydown event
     *
     * @param {string} command The command that was sent
     * @returns {boolean}
     * @private
     */
    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return true;
        }

        return false;
    }

    /**
     * Handle when user hits the tab button
     *
     * @param {DOMEvent} e Reference to the DOM event being sent
     * @returns {boolean}
     * @private
     */
    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    /**
     * Handles the toggling of block types in the toolbar icons
     *
     * @param {string} blockType The block type that was clicked
     * @private
     */
    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    /**
     * Handles the toggling of inline styles in the toolbar icons
     *
     * @param {string} inlineStyle The inline style that was clicked
     * @private
     */
    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    /**
     * Handles the getting of block class name
     *
     * @param {obj} theme The theme that we are currently using
     * @param {obj} block Represents the state of the entire document.
     *
     * @return {string} Returns the current theme class name
     * @private
     */
    _getBlockStyle(theme, block) {
        switch (block.getType()) {
            case 'blockquote':
                return theme.chamelEditorBlockquote;
            default:
                return null;
        }
    }

    render() {
        const {editorState} = this.state;

        // Determine which theme to use
        let theme = (this.context.chamelTheme && this.context.chamelTheme.editor)
            ? this.context.chamelTheme.editor : ThemeService.defaultTheme.editor;

        // Set the classes
        let classes = theme.chamelEditor;

        // Determine if the editor has text
        let contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                classes += theme.chamelEditorHidePlaceholder;
            }
        }

        // Append the className specified in the this.props
        if (this.props.className) {
            classes += " " + this.props.className;
        }

        let classContainer = theme.chamelEditorContainer;
        let selection = editorState.getSelection();
        let blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

        return (
            <div className={classContainer}>
                <BlockStyleControls
                    theme={theme}
                    blockType={blockType}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    theme={theme}
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <div className={classes} onClick={this.focus}>
                    <Editor
                        blockStyleFn={this.getBlockStyle.bind(this, theme)}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        onTab={this.onTab}
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
            </div>
        );
    }
}

export default ChamelEditor;



