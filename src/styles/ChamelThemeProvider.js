import {Component} from 'react';
import PropTypes from 'prop-types';

class ChamelThemeProvider extends Component {

    static propTypes = {
        children: PropTypes.element,
        chamelTheme: PropTypes.object.isRequired,
    };

    static childContextTypes = {
        chamelTheme: PropTypes.object,
    };

    getChildContext() {
        return {
            chamelTheme: this.props.chamelTheme,
        };
    }

    render() {
        return this.props.children;
    }
}

export default ChamelThemeProvider;