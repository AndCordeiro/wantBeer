import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ActivityIndicator,
    View,
} from 'react-native';

class Loading extends Component {
    render() {
        const {
            show,
            size,
            color,
            container
        } = this.props;
        if (!show) {
            return (<View />);
        }
        return (
            <ActivityIndicator
                size={size}
                color={color}
                style={container}
            />
        );
    }
}

Loading.propTypes = {
    show: PropTypes.bool,
    size: PropTypes.string,
    color: PropTypes.string,
    container: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};

Loading.defaultProps = {
    show: false,
    size: 'large',
    color: global.COLOR_SECOND,
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: global.COLOR_THIRD
    }
};

export { Loading };