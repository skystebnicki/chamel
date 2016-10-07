import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from 'chamel/Toolbar/Toolbar';
import ToolbarGroup from 'chamel/Toolbar/ToolbarGroup';
import IconButton from 'chamel/Button/IconButton';
import HeaderIcon from 'chamel/icons/font/HeaderIcon';
import ListOlIcon from 'chamel/icons/font/ListOlIcon';
import ListUlIcon from 'chamel/icons/font/ListUlIcon';
import BoldIcon from 'chamel/icons/font/BoldIcon';
import ItalicIcon from 'chamel/icons/font/ItalicIcon';
import UnderlineIcon from 'chamel/icons/font/UnderlineIcon';
import CodeIcon from 'chamel/icons/font/CodeIcon';
import WebIcon from 'chamel/icons/font/WebIcon';

// Block Types that are used in the editor and displayed in the toolbar
const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one', class: HeaderIcon, props: {headerType: 1}},
    {label: 'H2', style: 'header-two', class: HeaderIcon, props: {headerType: 2}},
    {label: 'H3', style: 'header-three', class: HeaderIcon, props: {headerType: 3}},
    {label: 'H4', style: 'header-four', class: HeaderIcon, props: {headerType: 4}},
    {label: 'H5', style: 'header-five', class: HeaderIcon, props: {headerType: 5}},
    {label: 'H6', style: 'header-six', class: HeaderIcon, props: {headerType: 6}},
    {label: 'OL', style: 'ordered-list-item', class: ListOlIcon, props: {}},
    {label: 'UL', style: 'unordered-list-item', class: ListUlIcon, props: {}}
];

// Inline Styles that are used in the editor and displayed in the toolbar
const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD', class: BoldIcon, props: {}},
    {label: 'Italic', style: 'ITALIC', class: ItalicIcon, props: {}},
    {label: 'Underline', style: 'UNDERLINE', class: UnderlineIcon, props: {}}
];

// Types of content views
const HTML_VIEW = 'html';
const SOURCE_VIEW = 'source';

/**
 * Handle when displaying the block type controls and
 * Set the styles of the controls if it is toggled or not
 */
class EditorToolbar extends React.Component {
    static propTypes = {

        /**
         * Determines which toolbar should we display for current type of content view
         *
         * @var {int}
         */
        contentViewType: React.PropTypes.oneOf([HTML_VIEW, SOURCE_VIEW]),

        /**
         * The callback function used when user toggles the styles in the toolbar buttons
         *
         * @var {func}
         */
        onStyleToggle: React.PropTypes.func,

        /**
         * The callback function used when user toggles content view of the editor
         *
         * @var {func}
         */
        onContentViewToggle: React.PropTypes.func
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

        let displayBlockStyles = [];
        let displayInlineStyles = [];
        let displayConteViewType = [];

        switch (this.props.contentViewType) {
            case HTML_VIEW:

                // Loop thru the block types and setup the style button
                BLOCK_TYPES.map((blockType, idx) => {

                    displayBlockStyles.push(
                        <IconButton key={idx} onTap={(e) => { this.props.onStyleToggle("block", blockType.style); }}>
                            <blockType.class
                                {...blockType.props}
                            />
                        </IconButton>
                    );
                });

                // Loop thru the inline styles and setup the style button
                INLINE_STYLES.map((inlineType, idx) => {

                    displayInlineStyles.push(
                        <IconButton key={idx} onTap={(e) => { this.props.onStyleToggle("inline", inlineType.style); }}>
                            <inlineType.class
                                {...inlineType.props}
                            />
                        </IconButton>
                    );
                });

                displayConteViewType = (
                    <IconButton onTap={(e) => { this.props.onContentViewToggle(SOURCE_VIEW); }}>
                        <CodeIcon />
                    </IconButton>
                )
                break;

            case SOURCE_VIEW:
                displayConteViewType = (
                    <IconButton onTap={(e) => { this.props.onContentViewToggle(HTML_VIEW); }}>
                        <WebIcon />
                    </IconButton>
                )
                break;
        }

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup key={0} align="left">
                        {displayBlockStyles}
                    </ToolbarGroup>
                    <ToolbarGroup key={1} align="right">
                        {displayConteViewType}
                    </ToolbarGroup>
                </Toolbar>
                <Toolbar secondary>
                    <ToolbarGroup align="left">
                        {displayInlineStyles}
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

export default EditorToolbar;