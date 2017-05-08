import React from 'react';
import ReactDOM from 'react-dom';
import ThemeService from '../styles/ChamelThemeService';
import RichText from '../Input/RichText';
import EditorToolbar from './EditorToolbar';

/**
 * Contains both the toolbar and an instance of RichText component
 */
class ContentHtml extends React.Component {

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

    /**
     * Handles the toggling of content view
     *
     * @type {function}
     */
    onContentViewToggle: React.PropTypes.func
  };

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

    this.state = {
      value: this.props.value,
      toggleStyle: null,
      toggleType: null
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

  _onToggle = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.setState({
      value,
      toggleStyle: null,
      toggleType: null
    });
  }

  /**
   * Handle when the editor looses the focus
   *
   * @param {string} value The value of the editor
   * @private
   */
  _onBlur = (value) => {
    if (this.props.onBlur) {
      this.props.onBlur(value);
    } else {
      //this.setState({value});
    }
  }

  /**
   * Handles when the user set the focus in the editor
   *
   * @param {string} value The value of the editor
   * @private
   */
  _onFocus = (value) => {
    if (this.props.onFocus) {
      this.props.onFocus(value);
    } else {
      //this.setState({value});
    }
  }

  /**
   * Handles the toggling of styles in the toolbar icons
   *
   * @param {string} style The style that was clicked. It is either block style or inline style
   * @param {string} type The style type that was toggled. (e.g. bold, italic, underline, h1, h2, h3, ul, ol)
   * @private
   */
  _handleStyleToggle = (style, type) => {
    console.log('toggle');
    this.setState({
      toggleStyle: style,
      toggleType: type
    })
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

    return (
      <div className={theme.richTextContainer}>
        <EditorToolbar
          contentViewType={this.props.contentViewType}
          onStyleToggle={this._handleStyleToggle}
          onContentViewToggle={this._handleContentViewToggle}
        />
        <RichText
          commandToggleType={this.state.toggleType}
          commandToggleStyle={this.state.toggleStyle}
          onToggle={this._onToggle}
          onChange={this._onChange}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default ContentHtml;
