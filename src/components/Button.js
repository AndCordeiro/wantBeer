import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

const {
    width
} = Dimensions.get('window');

class Button extends Component {
    render() {
        const {
            onPress,
            buttonStyle,
            titleStyle,
            title
        } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress}
                style={buttonStyle}
            >
                <Text style={titleStyle}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }
}

Button.propTypes = {
    buttonStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    onPress: PropTypes.func.isRequired
};

Button.defaultProps = {
    buttonStyle: {
        backgroundColor: global.COLOR_SECOND,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: (width / 1.5),
        borderRadius: 20,
        marginTop: 50
    },
    titleStyle: {
        alignSelf: 'center',
        fontSize: 16,
        color: global.COLOR_THIRD,
        fontWeight: 'bold'
    }
};

export { Button };