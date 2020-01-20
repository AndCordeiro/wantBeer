import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TextInput,
    Dimensions
} from 'react-native';
import {
    connect
} from 'react-redux';
import {
    getPoc
} from '../actions/pocs';

const {
    width
} = Dimensions.get('window');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputSearch: ''
        }
    }

    componentDidMount() {
        getPoc().then((data) => console.log(data)).catch((error) => console.log(error));
    }

    renderInputSearch = () => {
        return (
            <View style={styles.header}>
                <TextInput
                    ref={(input) => this.inputSearch = input}
                    style={styles.inputSearch}
                    onChangeText={(inputSearch) => this.setState({ inputSearch })}
                    value={this.state.inputSearch}
                    placeholder='Fill your address'
                    autoCapitalize='words'
                    returnKeyType='done'
                />
            </View>
        );
    }

    renderInformations = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderInputSearch()}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        width,
        backgroundColor: 'black',
        padding: 20
    },
    inputSearch: {
        backgroundColor: 'white',
        borderRadius: 10
    }
});