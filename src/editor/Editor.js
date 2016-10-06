import React from 'react';
import ReactDOM from 'react-dom';
import Classable from '../mixins/classable';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import immutable from 'immutable';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import {Editor, ContentState, EditorState, RichUtils, convertFromHTML} from 'draft-js';

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
class ChamelEditor extends React.Component {

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
            editorState: initialEditorState,
            sourceView: false
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
     * @param {bool} active Determine if the current block type is active or not
     * @private
     */
    _toggleBlockType = (active, blockType) => {

        let editorState = this.state.editorState;

        if (blockType === "view-source") {

            let content = null,
                contentState = null;

            /*
             * We need to determine if we are on view source mode or not
             * Then we will get the editor's content and set it to the new editor's state
             */
            if (active) {
                content = stateToHTML(editorState.getCurrentContent());
                contentState = ContentState.createFromText(content);
            } else {
                content = editorState.getCurrentContent().getPlainText();
                contentState = ContentState.createFromBlockArray(
                    convertFromHTML(content)
                );
            }

            // Set the new editor state depending on the current view mode (html view or source view)
            editorState = EditorState.push(editorState, contentState);

            // Update the state
            this.setState({
                editorState: editorState,
                sourceView: active
            });

            this._onChange(editorState);
        } else {
            this._onChange(
                RichUtils.toggleBlockType(editorState, blockType)
            );
        }
    }

    /**
     * Handles the toggling of inline styles in the toolbar icons
     *
     * @param {string} inlineStyle The inline style that was clicked
     * @private
     */
    _toggleInlineStyle = (inlineStyle) => {
        this._onChange(
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
                    sourceView={this.state.sourceView}
                    onToggle={this._toggleBlockType}
                />
                <InlineStyleControls
                    theme={theme}
                    editorState={editorState}
                    onToggle={this._toggleInlineStyle}
                />
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

export default ChamelEditor;
