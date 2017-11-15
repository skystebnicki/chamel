import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Toolbar from '../Toolbar/Toolbar';
import ToolbarGroup from '../Toolbar/ToolbarGroup';
import IconButton from '../Button/IconButton';
import TitleIcon from '../icons/font/TitleIcon';
import ListBulletedIcon from '../icons/font/ListBulletedIcon';
import ListNumberedIcon from '../icons/font/ListNumberedIcon';
import BoldIcon from '../icons/font/BoldIcon';
import ItalicIcon from '../icons/font/ItalicIcon';
import UnderlinedIcon from '../icons/font/UnderlinedIcon';
import CodeIcon from '../icons/font/CodeIcon';
import WebIcon from '../icons/font/WebIcon';
import Dom from '../utils/Dom';
import Events from '../utils/Events';

// Block Types that are used in the editor and displayed in the toolbar
const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one', class: TitleIcon, props: {headerType: 1}},
  {label: 'H2', style: 'header-two', class: TitleIcon, props: {headerType: 2}},
  {label: 'H3', style: 'header-three', class: TitleIcon, props: {headerType: 3}},
  {label: 'H4', style: 'header-four', class: TitleIcon, props: {headerType: 4}},
  {label: 'H5', style: 'header-five', class: TitleIcon, props: {headerType: 5}},
  {label: 'H6', style: 'header-six', class: TitleIcon, props: {headerType: 6}},
  {label: 'OL', style: 'ordered-list-item', class: ListBulletedIcon, props: {}},
  {label: 'UL', style: 'unordered-list-item', class: ListNumberedIcon, props: {}},
];

// Inline Styles that are used in the editor and displayed in the toolbar
const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD', class: BoldIcon, props: {}},
  {label: 'Italic', style: 'ITALIC', class: ItalicIcon, props: {}},
  {label: 'Underline', style: 'UNDERLINE', class: UnderlinedIcon, props: {}},
];

// Types of content views
const HTML_VIEW = 'html';
const SOURCE_VIEW = 'source';

/**
 * Handle when displaying the block type controls and
 * Set the styles of the controls if it is toggled or not
 */
class EditorToolbar extends Component {
  static propTypes = {
    /**
     * Determines which toolbar should we display for current type of content view
     *
     * @var {int}
     */
    contentViewType: PropTypes.oneOf([HTML_VIEW, SOURCE_VIEW]),

    /**
     * The callback function used when user toggles the styles in the toolbar buttons
     *
     * @var {func}
     */
    onStyleToggle: PropTypes.func,

    /**
     * The callback function used when user toggles content view of the editor
     *
     * @var {func}
     */
    onContentViewToggle: PropTypes.func,

    /**
     * Flag that will determine if we are going to set the display of toolbar to fixed.
     */
    fixed: PropTypes.bool
  };

  /**
   * Set property defaults
   */
  static defaultProps = {
    fixed: true,
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
      startTopOffset: 0,
      startWidth: 0,
      curTopOffset: -1,
    };
  }

  componentDidMount() {
    // Save the original top position of the menu
    if (this.props.fixed) {
      let offset = Dom.offset(ReactDOM.findDOMNode(this.refs.editorToolbar));
      this.setState({
        startTopOffset: offset.top,
        startWidth: offset.width,
        startHeight: offset.height,
      });

      // Now listen for window scroll events
      Events.on(window, 'scroll', this._onWindowScroll);
    }
  }

  componentWillUnmount() {
    // Remove window scroll event
    if (this.props.fixed) {
      Events.off(window, 'scroll', this._onWindowScroll);
    }
  }

  render() {
    let displayBlockStyles = [];
    let displayInlineStyles = [];
    let displayConteViewType = [];

    switch (this.props.contentViewType) {
      case HTML_VIEW:
        // Loop thru the block types and setup the style button
        BLOCK_TYPES.map((blockType, idx) => {
          displayBlockStyles.push(
            <IconButton
              key={'block' + idx}
              onTap={e => {
                this.props.onStyleToggle('block', blockType.style);
              }}
            >
              <blockType.class {...blockType.props} />
            </IconButton>,
          );
        });

        // Loop thru the inline styles and setup the style button
        INLINE_STYLES.map((inlineType, idx) => {
          displayInlineStyles.push(
            <IconButton
              key={'inline' + idx}
              onTap={e => {
                this.props.onStyleToggle('inline', inlineType.style);
              }}
            >
              <inlineType.class {...inlineType.props} />
            </IconButton>,
          );
        });

        displayConteViewType = (
          <IconButton
            onTap={e => {
              this.props.onContentViewToggle(SOURCE_VIEW);
            }}
          >
            <CodeIcon />
          </IconButton>
        );
        break;

      case SOURCE_VIEW:
        displayConteViewType = (
          <IconButton
            onTap={e => {
              this.props.onContentViewToggle(HTML_VIEW);
            }}
          >
            <WebIcon />
          </IconButton>
        );
        break;
    }

    // Handle offset when the document scrolls and the toolbar is fixed
    let innerConStyle = null;
    let outerConStyle = null;
    if (this.props.fixed && this.state.curTopOffset !== -1) {
      innerConStyle = {
        top: this.state.curTopOffset + 'px',
        width: this.state.startWidth + 'px',
        position: 'fixed',
        zIndex: 100,
      };

      /*
       * Set the outer con style since a fixed element will cause it to shrink
       * which makes the UX pretty bad when elements suddenly jump
       */
      outerConStyle = {height: this.state.startHeight + 'px'};
    }

    return (
      <div style={outerConStyle}>
        <div style={innerConStyle}>
          <Toolbar secondary={true} ref="editorToolbar">
            <ToolbarGroup key={1} align="left">
              {displayInlineStyles}
            </ToolbarGroup>
            <ToolbarGroup key={2} align="left">
              {displayBlockStyles}
            </ToolbarGroup>
            <ToolbarGroup key={3} align="right">
              {displayConteViewType}
            </ToolbarGroup>
          </Toolbar>
        </div>
      </div>
    );
  }

  /**
   * Handle when the document is scrolled while the
   * The starting top of this menu was not 0 so it means
   * the menu is a fixed position and docked. A menu can be docked
   * below the top of the page (like below an AppBar) so we
   * want to be able to reposition the leftnav when the user scrolls
   * so it scrolls with the document until 0 (top)
   */
  _onWindowScroll = () => {
    // If the starting state was 0 then do nothing
    if (!this.props.fixed) {
      return;
    }

    // Get the scroll offset of the window
    let windowOffset = Dom.scrollOffset();

    /*
     * If we have scrolled, then follow the scroll.
     * Because the left nav div is position:fixed, then we
     * can move all the way to 0 to be at the top no matter how
     * far down the page they scroll
     */
    let newTop = this.state.startTopOffset - windowOffset.top;
    if (newTop < 0) {
      newTop = 0;
    }

    // Restore the original state if we are back in the viewport.
    if (windowOffset.top <= this.state.startTopOffset) {
      newTop = -1; // Reset
    }

    // Set state
    this.setState({curTopOffset: newTop});
  };
}

export default EditorToolbar;
