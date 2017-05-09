import React from 'react';
import ReactDOM from 'react-dom';
import ThemeService from '../styles/ChamelThemeService';
import ContentHtml from './ContentHtml';
import ContentSource from './ContentSource';

// Types of content views
const HTML_VIEW = 'html';
const SOURCE_VIEW = 'source';


/**
 * Chamel Editor component for editing rich text and source code
 */
class ChamelEditor extends Component {

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
     * Determine what is the intial content view to be displayed
     *
     * @type {string}
     */
    contentView: PropTypes.oneOf(['html', 'source'])
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
      chamelTheme: PropTypes.object
  };

  static defaultProps = {
      contentView: HTML_VIEW
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
      contentView: this.props.contentView,
      value: this.props.value
    };
  }

  /**
   * Handle when the editor has changed
   *
   * @param {obj} editorState  The top-level state object for the editor.
   * @private
   */
  _onChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  /**
   * Handle when the editor looses the focus
   *
   * @param {string} value The value of the editor
   * @private
   */
  _onBlur = (value) => {
    if (this.props.onBlur) {
      this.props.onBlur(value);
    }
  };

  /**
   * Handles when the user set the focus in the editor
   *
   * @param {string} value The value of the editor
   * @private
   */
  _onFocus = (value) => {
    if (this.props.onFocus) {
      this.props.onFocus(value);
    }
  };

  /**
   * Handles the toggling of content view
   *
   * @param {int} contentView The content view we are switching to
   * @param {string} value The content of the editor
   * @private
   */
  _handleContentViewToggle = (contentView, value) => {
    this.setState({contentView, value});
  };

  /**
   * Render shadow dom
   *
   * @returns {Object}
   */
  render() {
    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.editor)
        ? this.context.chamelTheme.editor : ThemeService.defaultTheme.editor;

    let displaySourceView = null;

    switch (this.state.contentView) {
      case HTML_VIEW:
        displaySourceView = (
          <ContentHtml
            onChange={this._onChange}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            contentViewType={HTML_VIEW}
            onContentViewToggle={this._handleContentViewToggle}
            value={this.state.value}
          />
        );
        break;

      case SOURCE_VIEW:
        displaySourceView = (
          <ContentSource
            onChange={this._onChange}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            onContentViewToggle={this._handleContentViewToggle}
            contentViewType={SOURCE_VIEW}
            value={this.state.value}
          />
        );
        break;
    }

    return (
        <div>
            {displaySourceView}
        </div>
    );
  }
}

export default ChamelEditor;
