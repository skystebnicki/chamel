/**
 * Tabs component
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Outer container for tabs
 */
class Tabs extends React.Component {

  static propTypes = {
    initialSelectedIndex: React.PropTypes.number,
    onActive: React.PropTypes.func,
    tabWidth: React.PropTypes.number
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

    let selectedIndex = 0;
    if (this.props.initialSelectedIndex && this.props.initialSelectedIndex < this.props.children.length) {
      selectedIndex = this.props.initialSelectedIndex;
    }

    this.state = {
      selectedIndex: selectedIndex
    }
  }

  getEvenWidth(){
    return (
      parseInt(
        window.getComputedStyle(ReactDOM.findDOMNode(this))
          .getPropertyValue('width'),
        10)
    );
  }

  getTabCount() {
      return React.Children.count(this.props.children);
  }

  componentDidMount(){
    if(this.props.tabWidth) {
      if(!(this.props.children.length * this.props.tabWidth > this.getEvenWidth())){
        this.setState({
          width: this.props.tabWidth,
          fixed: false
        });
        return;
      }
    }

    this.setState({
      width: this.getEvenWidth(),
      fixed: true
    });
  }

  /**
   * Handle touch or click
   *
   * @param tabIndex
   * @param tab
   */
  handleTouchTap = (tabIndex, tab) => {
    if (this.props.onChange && this.state.selectedIndex !== tabIndex) {
        this.props.onChange(tabIndex, tab);
    }

    this.setState({selectedIndex: tabIndex});
    //default CB is _onActive. Can be updated in tab
    if(tab.props.onActive) tab.props.onActive(tab);
  };

  render(){

    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.tabs)
      ? this.context.chamelTheme.tabs : {};
    
    var _this = this;
    let width = 100 / this.getTabCount() +'%';

    /*
    var width = this.state.fixed ?
    this.state.width/this.props.children.length :
        this.props.tabWidth;*/
    let left = 'calc(' + width + '*' + this.state.selectedIndex + ')';
    //var left = width * this.state.selectedIndex || 0;
    var currentTemplate = null;
    var tabs = React.Children.map(this.props.children, function(tab, index){
      if(tab.type.name === "Tab") {
        // Generic UI implementation
        if(_this.state.selectedIndex === index) currentTemplate = tab.props.children;
        return React.cloneElement(tab, {
          key: index,
          selected: _this.state.selectedIndex === index,
          tabIndex: index,
          width: width,
          handleTouchTap: _this.handleTouchTap
        });
      } else {
        var type = tab.type.displayName || tab.type;
        throw "Tabs only accepts Tab Components as children. Found " + type + " as child number " + (index + 1) + " of Tabs";
      }
    });

    return (
      <div className={theme.tabsContainer}>
        <div className={theme.tabItemContainer}>
          {tabs}
        </div>
        <div className={theme.tabInkBar} style={{left: left, width:width}} />
        <div className={theme.tabTemplate}>
          {currentTemplate}
        </div>
      </div>
    )
  }
}

export default Tabs;
