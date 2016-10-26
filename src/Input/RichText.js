import React from 'react';
import ReactDOM from 'react-dom';
import ThemeService from '../styles/ChamelThemeService';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
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

/**
 * Chamel Editor component for editing rich text and source code
 */
class RichText extends React.Component {

    /**
     * Set accepted properties
     */
    static propTypes = {
        /**
         * The callback function used when user changes the content of the editor
         *
         * @type {function}
         */
        onChange: React.PropTypes.func,

        /**
         * The callback function used when user toggles an icon of the editor
         *
         * @type {function}
         */
        onToggle: React.PropTypes.func,

        /**
         * The callback function used when user looses the focus of the editor
         *
         * @type {function}
         */
        onBlur: React.PropTypes.func,

        /**
         * The initial value of the content editor
         *
         * @type {string}
         */
        value: React.PropTypes.string,

        /**
         * The command that will be executed based on the type that was provided
         *
         * @type {string}
         */
        commandToggleType: React.PropTypes.string,

        /**
         * This will determine what style to toggle
         *
         * @type {string}
         */
        commandToggleStyle: React.PropTypes.oneOf(['block', 'inline'])
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

        let initialEditorState = EditorState.createEmpty();

        // Check if we have a value that we will set in the editor
        if (props.value) {
            // Set the EditorState that it will have an existing content
            initialEditorState = EditorState.createWithContent(stateFromHTML(props.value));
        }

        this.state = {
            editorState: initialEditorState
        };
    }

    /**
     * Handle when the editor has changed
     *
     * @param {obj} editorState  The top-level state object for the editor.
     * @private
     */
    _onChange = (editorState) => {
        this.setState({editorState})

        if (this.props.onChange) {
            let content = stateToHTML(editorState.getCurrentContent());
            this.props.onChange(content)
        }
    }

    /**
     * Handles when the user set the focus in the editor
     *
     * @private
     */
    _focus = () => {
        this.refs.editor.focus();

        if (this.props.onFocus) {
            let content = stateToHTML(this.state.editorState.getCurrentContent());
            this.props.onFocus(content)
        }
    }

    /**
     * Handle when the editor looses the focus
     *
     * @private
     */
    _onBlur = (editorState) => {
        if (this.props.onBlur) {
            let content = stateToHTML(this.state.editorState.getCurrentContent());
            this.props.onBlur(content)
        }
    }

    /**
     * Handle a RETURN keydown event
     *
     * @param {string} command The command that was sent
     * @returns {boolean}
     * @private
     */
    _handleKeyCommand = (command) => {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this._onChange(newState);
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
    _onTab = (e) => {
        const maxDepth = 4;
        this._onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    /**
     * Handles the toggling of block types in the toolbar icons
     *
     * @param {string} blockType The block type that was clicked
     * @private
     */
    _toggleBlockType = (blockType) => {

        let editorState = RichUtils.toggleBlockType(this.state.editorState, blockType);

        if (this.props.onToggle) {
            let content = stateToHTML(editorState.getCurrentContent());
            this.props.onToggle(content)
        }

        this.setState({editorState})
    }

    /**
     * Handles the toggling of inline styles in the toolbar icons
     *
     * @param {string} inlineStyle The inline style that was clicked
     * @private
     */
    _toggleInlineStyle = (inlineStyle) => {
        let editorState = RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle);

        if (this.props.onToggle) {
            let content = stateToHTML(editorState.getCurrentContent());
            this.props.onToggle(content)
        }

        this.setState({editorState})
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
                return theme.RichTextBlockquote;
            default:
                return null;
        }
    }

    /**
     * Componenent is about to receive new props
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.commandToggleStyle === 'block') {
            this._toggleBlockType(nextProps.commandToggleType);
        } else if (nextProps.commandToggleStyle === 'inline') {
            this._toggleInlineStyle(nextProps.commandToggleType);
        }
    }

    render() {
        const {editorState} = this.state;

        // Determine which theme to use
        let theme = (this.context.chamelTheme && this.context.chamelTheme.input)
            ? this.context.chamelTheme.input : ThemeService.defaultTheme.input;

        // Set the classes
        let classes = theme.richText;

        // Determine if the editor has text
        let contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                classes += theme.RichTextHidePlaceholder;
            }
        }

        // Append the className specified in the this.props
        if (this.props.className) {
            classes += " " + this.props.className;
        }

        let classContainer = theme.richTextContainer;
        let selection = editorState.getSelection();
        let blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

        return (
            <div className={classContainer} id="test">
                <div className={classes} onClick={this._focus}>
                    <Editor
                        blockStyleFn={this._getBlockStyle.bind(this, theme)}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this._handleKeyCommand}
                        onChange={this._onChange}
                        onBlur={this._onBlur}
                        onTab={this._onTab}
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
            </div>
        );
    }
}

export default RichText;
