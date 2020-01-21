import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    Image
} from 'react-native';
import {
    connect
} from 'react-redux';
import {
    getPoc,
    getPocsSearch
} from '../actions/pocs';
import {
    getCategories
} from '../actions/categories';
import {
    getLocation
} from '../actions/location';
import {
    informationsSelector,
    locationSelector,
    productsSelector
} from '../reducers/selectors';
import {
    Button,
    Loading
} from '../components';
import DeviceInfo from 'react-native-device-info';

const {
    width
} = Dimensions.get('window');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        }
    }

    async componentDidMount() {
        this.props.dispatch(getCategories());
    }

    _sendAddress = async () => {
        if (this.state.address != '') {
            let { lat, lng } = await this.props.dispatch(getLocation(this.state.address));
            if (lat) {
                await this.props.dispatch(getPocsSearch(lat, lng));
                this.setState({ address: '' });
            }
        }
    }

    _getProducts = () => {
        const { informations } = this.props.informations;
        this.props.dispatch(getPoc(informations.id))
            .then(() => this.props.navigation.navigate('product'));
    }

    renderInputAddress = () => {
        return (
            <View style={styles.header}>
                <TextInput
                    ref={(input) => this.inputAddress = input}
                    style={styles.inputAddress}
                    onChangeText={(address) => this.setState({ address })}
                    value={this.state.address}
                    placeholder='Fill your address'
                    autoCapitalize='words'
                    returnKeyType='done'
                    onSubmitEditing={() => this._sendAddress()}
                />
            </View>
        );
    }

    renderInformations = () => {
        const { informations } = this.props.informations;
        if (this.props.informations.message) {
            return (
                <View style={styles.body}>
                    <Text style={styles.title}>
                        {this.props.informations.message}
                    </Text>
                </View>
            );
        }
        if (!informations) {
            return (
                <View style={[styles.body, { backgroundColor: global.COLOR_THIRD, justifyContent: 'center' }]}>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={require('../imgs/icon.png')}
                    />
                    <Text>
                        {global.GOOGLE_KEY}
                    </Text>
                </View>
            );
        }
        return (
            <View style={styles.body}>
                <Text style={styles.title}>
                    {informations.tradingName} - {informations.status}
                </Text>
                <Text style={{ alignItems: 'center' }}>
                    <Text style={styles.label}>
                        Address: {'\t'}
                    </Text>
                    <Text style={styles.informations}>
                        {informations.address.address1}, {informations.address.number} - {informations.address.city}
                    </Text>
                </Text>
                <Text>
                    <Text style={styles.label}>
                        Phone Number: {'\t'}
                    </Text>
                    <Text style={styles.informations}>
                        {informations.phone.phoneNumber}
                    </Text>
                </Text>
                <Button
                    title='SHOW PRODUCTS'
                    onPress={() => this._getProducts()}
                />
            </View>
        )
    }

    renderFooter = () => {
        return (
            <Text style={{
                width, backgroundColor: (this.props.informations.message || this.props.informations.informations) ? global.COLOR_MAIN : global.COLOR_THIRD,
                fontWeight: 'bold',
                color: global.COLOR_SECOND,
                textAlign: 'center'
            }}>
                WB Version {DeviceInfo.getVersion()}
            </Text>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Loading
                    show={(this.props.informations.loading || this.props.location.loading || this.props.products.loading)}
                />
                {this.renderInputAddress()}
                {this.renderInformations()}
                {this.renderFooter()}
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        informations: informationsSelector(state),
        location: locationSelector(state),
        products: productsSelector(state)
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
        backgroundColor: global.COLOR_SECOND,
        padding: 20,
        zIndex: 1
    },
    inputAddress: {
        backgroundColor: global.COLOR_THIRD,
        borderRadius: 10
    },
    body: {
        flex: 1,
        backgroundColor: global.COLOR_MAIN,
        width,
        alignItems: 'center',
        paddingVertical: 50
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    informations: {
        fontSize: 16,
        textAlign: 'center'
    }
});