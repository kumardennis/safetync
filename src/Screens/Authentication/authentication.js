import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import RadialGradient from 'react-native-radial-gradient';
import { SignUp, SignIn } from './index';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const AuthStack = createSwitchNavigator({
    signup: SignUp,
    signin: SignIn
});

const AuthContainer = createAppContainer(AuthStack);

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <RadialGradient
                colors={[
                    'rgba(96,113,145,1)',
                    'rgba(51,62,81,1)',
                    'rgba(8,0,0,1)'
                ]}
                stops={[0.0, 0.19, 0.99]}
                radius={500}
            >
                <AuthContainer />
            </RadialGradient>
        );
    }
}

export default Authentication;
