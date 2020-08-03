import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Authentication from './src/Screens/Authentication/authentication';
import MainPage from './src/Screens/Main/main';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: true
        };
    }

    static getDerivedStateFromProps(props, currentState) {
        if (currentState.isSignedIn !== props.isSignedIn.isSignedIn) {
            return {
                isSignedIn: props.isSignedIn.isSignedIn
            };
        } else {
            return null;
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                    {this.state.isSignedIn ? (
                        <MainPage />
                    ) : (
                        <Authentication getSignIn={this.getSignIn} />
                    )}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.authReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        isLoggedDispatch: response => {
            dispatch({
                type: 'IS_LOGGED',
                payload: response
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
