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
import ProductsScreen from './screens/Products';

const headerDefault = (title, headerTintColor, backgroundColor) => ({
    title,
    headerTintColor: (headerTintColor) ? headerTintColor : global.COLOR_MAIN,
    headerStyle: {
        backgroundColor: (backgroundColor) ? backgroundColor : global.COLOR_MAIN
    }
});

const AppStack = createStackNavigator({
    home: {
        screen: HomeScreen,
        navigationOptions: () => (headerDefault('Want Beer', global.COLOR_SECOND, global.COLOR_MAIN))
    },
    product: {
        screen: ProductsScreen,
        navigationOptions: () => (headerDefault('Products', global.COLOR_SECOND, global.COLOR_MAIN))
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