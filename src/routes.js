import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
    View
} from 'react-native';

import HomeScreen from './screens/Home';
import ProductScreen from './screens/Product';

const headerDefault = (title, headerTintColor, backgroundColor) => ({
    title,
    headerTintColor: (headerTintColor) ? headerTintColor : '#FFC500',
    headerStyle: {
        backgroundColor: (backgroundColor) ? backgroundColor : global.COLOR_MAIN
    }
});

const AppStack = createStackNavigator({
    home: {
        screen: HomeScreen,
        navigationOptions: () => (headerDefault('Want Beer', '#000', '#FFC500'))
    },
    product: {
        screen: ProductScreen,
        navigationOptions: () => (headerDefault('Product', '#000', '#FFC500'))
    }
});

const Routes = createSwitchNavigator({
    App: AppStack
});

const AppContainer = createAppContainer(Routes);

const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <AppContainer />
        </View>
    );
}

export default App;