import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    SafeAreaView,
    View
} from 'react-native';
import {
    connect
} from 'react-redux';
import {
    informationsSelector,
    locationSelector,
    productsSelector,
    categorySelector
} from '../reducers/selectors';
import {
    ListProducts,
    Loading
} from '../components';
import ReactNativePicker from 'react-native-picker-select';
import {
    getPoc
} from '../actions/pocs';

const {
    width
} = Dimensions.get('window');

const placeholderPickerCategories = {
    label: 'Filter by Category',
    value: null,
    color: '#9EA0A4'
};

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categotyId: null
        }
    }

    _getProducts = () => {
        const { informations } = this.props.informations;
        this.props.dispatch(getPoc(informations.id, this.state.categotyId));
    }

    renderPickerCategories = () => {
        return (
            <View style={{ width, justifyContent: 'center', marginBottom: 10, borderBottomWidth: 1 }} >
                <ReactNativePicker
                    selectedValue={this.state.categotyId}
                    value={this.state.categotyId}
                    useNativeAndroidPickerStyle={false}
                    style={{
                        inputAndroid: {
                            textAlign: 'center',
                            height: 40,
                            fontSize: 16,
                            width,
                            color: 'black',
                            fontWeight: 'bold'
                        },
                        inputIOS: {
                            textAlign: 'center',
                            alignItems: 'center',
                            width,
                            fontSize: 30,
                            borderRadius: 8,
                            color: 'black',
                            fontWeight: 'bold'
                        }
                    }}
                    onValueChange={(itemValue) =>
                        this.setState({ categotyId: itemValue }, () => this._getProducts())
                    }
                    placeholder={placeholderPickerCategories}
                    items={this.props.categories}
                />
            </View>
        );
    }

    renderProducts = () => {
        return (
            <ListProducts
                products={this.props.products.poc.products}
            />
        );
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Loading
                    show={this.props.products.loading}
                />
                {this.renderPickerCategories()}
                {this.renderProducts()}
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        informations: informationsSelector(state),
        location: locationSelector(state),
        products: productsSelector(state),
        categories: categorySelector(state, true)
    }
}

export default connect(mapStateToProps)(Products);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});