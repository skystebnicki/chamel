import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ThemeService from '../styles/ChamelThemeService';
import EditorToolbar from './EditorToolbar';
import Codemirror from 'react-codemirror'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/lib/codemirror.css'


/**
 * Contains codemirror and the toolbar for viewing source
 */
class ContentSource extends Component {

    /**
     * Set accepted properties
     */
    static propTypes = {
        /**
         * The callback function used when user changes the content of the editor
         *
         * @type {function}
         */
        onChange: PropTypes.func,

        /**
         * The callback function used when user looses the focus of the editor
         *
         * @type {function}
         */
        onBlur: PropTypes.func,

        /**
         * The initial value of the content editor
         *
         * @type {string}
         */
        value: PropTypes.string,

        /**
         * Handles the toggling of content view
         *
         * @type {function}
         */
        onContentViewToggle: PropTypes.func
    }

    /**
     * An alternate theme may be passed down by a provider
     */
    static contextTypes = {
        chamelTheme: PropTypes.object
    };

    /**
     * Class constructor
     *
     * @param {Object} props Properties to send to the render function
     */
    constructor(props) {

        // Call parent constructor
        super(props);

        this.state = {
            value: this.props.value
        };
    }

    /**
     * Handle when the editor has changed
     *
     * @param {string} value The value of the editor
     * @private
     */
    _onChange = (value) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }

        this.setState({value});
    }

    /**
     * Handles the toggling of content view
     *
     * @param {int} contentView The content view we are switching to
     * @private
     */
    _handleContentViewToggle = (contentView) => {
        if (this.props.onContentViewToggle) {
            this.props.onContentViewToggle(contentView, this.state.value);
        }
    }

    render() {

        // Determine which theme to use
        let theme = (this.context.chamelTheme && this.context.chamelTheme.editor)
            ? this.context.chamelTheme.editor : ThemeService.defaultTheme.editor;

        let options = {
            lineNumbers: true
        };

        return (
          <div className={theme.richTextContainer}>
                <EditorToolbar
                    contentViewType={this.props.contentViewType}
                    onContentViewToggle={this._handleContentViewToggle}
                />
                <Codemirror value={this.state.value} onChange={this._onChange} options={options}/>
            </div>
        );
    }
}

export default ContentSource;
