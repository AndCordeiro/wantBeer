import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import {
    connect
} from 'react-redux';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Product</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps)(Product);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});