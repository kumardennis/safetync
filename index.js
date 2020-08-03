import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as safetync } from './app.json';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/reducers/index';

const store = createStore(rootReducer);

const AppContainer = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
AppRegistry.registerComponent('safetync', () => AppContainer);
