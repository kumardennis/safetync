import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class AuthFooterButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleAuthNav = props => {
        this.props.navigation.navigate(this.props.linkTo);
    };

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.handleAuthNav()}
                style={Style.AuthFooterButton}
            >
                <Text style={Style.AuthFooterButtonText}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

const Style = StyleSheet.create({
    AuthFooterButton: {
        backgroundColor: colors.authComponentBackground,
        justifyContent: 'center',
        flex: 1
    },
    AuthFooterButtonText: {
        fontFamily: Fonts.Orbitron,
        fontSize: sizes.subHeaderFontSize,
        textAlign: 'center',
        color: colors.authFontColor
    }
});

export default AuthFooterButton;
