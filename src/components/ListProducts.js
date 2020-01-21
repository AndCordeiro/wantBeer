import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    View,
    Text,
    Dimensions,
    Image
} from 'react-native';
import {
    Card,
    Button
} from './';

const {
    width
} = Dimensions.get('window');

class ListProducts extends Component {

    _createRows = (data, columns) => {
        const rows = Math.floor(data.length / columns);
        let lastRowElements = data.length - rows * columns;
        while (lastRowElements !== columns) {
            data.push({
                id: `empty-${lastRowElements}`,
                name: `empty-${lastRowElements}`,
                empty: true
            });
            lastRowElements += 1;
        }
        return data;
    }

    renderList = () => {
        return (
            <FlatList
                data={this._createRows(this.props.products, this.props.numberColumns)}
                keyExtractor={item => item.id}
                numColumns={this.props.numberColumns}
                renderItem={this.renderItems}
            />
        );
    }

    renderItems = ({ item }, index) => {
        if (item.empty) {
            return <View style={[this.props.cardStyle, { backgroundColor: 'transparent', elevation: 0 }]} />;
        }
        return (
            <Card
                containerStyle={this.props.cardStyle}
                key={index}
            >
                <View style={this.props.header}>
                    <Text style={this.props.titleStyle}>
                        {item.title} - {item.productVariants[0].price}
                    </Text>
                </View>
                <View style={this.props.body}>
                    <Image
                        style={this.props.imageStyles}
                        source={{ uri: item.images[0].url }}
                    />
                </View>
                <View style={this.props.footer}>
                    <Button
                        title='-'
                        titleStyle={this.props.buttonTitleStyle}
                        buttonStyle={this.props.buttonStyle}
                        onPress={() => { }}
                    />
                    <Button
                        title='+'
                        titleStyle={this.props.buttonTitleStyle}
                        buttonStyle={this.props.buttonStyle}
                        onPress={() => { }}
                    />
                </View>
            </Card>
        );
    }

    render() {
        return (
            <View style={this.props.container}>
                {this.renderList()}
            </View>
        );
    }
}

ListProducts.propTypes = {
    container: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    numberColumns: PropTypes.number,
    cardStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    header: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    titleStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    body: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    imageStyles: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    footer: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    buttonStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    buttonTitleStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
};

ListProducts.defaultProps = {
    container: {
        width,
        marginBottom: 50
    },
    numberColumns: 3,
    cardStyle: {
        alignItems: "center",
        backgroundColor: global.COLOR_MAIN,
        flexGrow: 1,
        margin: 4,
        flexBasis: 0,
        borderRadius: 20,
        elevation: 2,
        marginTop: 8
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginBottom: 5,
        backgroundColor: global.COLOR_SECOND,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        height: 60
    },
    titleStyle: {
        fontSize: 12,
        textAlign: 'center',
        color: global.COLOR_THIRD,
        width: (width / 3.5)
    },
    body: {
        marginBottom: 5,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyles: {
        width: 60,
        height: 80
    },
    footer: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: (width / 3.5)
    },
    buttonStyle: {
        elevation: 2,
        backgroundColor: global.COLOR_SECOND,
        height: 40,
        width: (width / 7.5),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitleStyle: {
        alignSelf: 'center',
        fontSize: 20,
        color: global.COLOR_THIRD,
        fontWeight: 'bold'
    }
};

export { ListProducts };