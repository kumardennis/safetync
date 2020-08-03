import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class AuthSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleLogin = () => {
        this.props.onPress;
    };

    render() {
        return (
            <TouchableOpacity
                style={[
                    Style.authSubmit,
                    { backgroundColor: this.props.bgcolor }
                ]}
                onPress={this.props.onPress}
            >
                <Text style={Style.authSubmitText}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

const Style = StyleSheet.create({
    authSubmit: {
        height: sizes.authSubmitHeight,
        width: sizes.authSubmitWidth,
        borderRadius: sizes.borderRadius,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    authSubmitText: {
        fontFamily: Fonts.CinzelDecorative,
        letterSpacing: sizes.subHeaderLetterSpacing,
        fontSize: sizes.mainFontSize,
        color: colors.authFontColor,
        textAlign: 'center'
    }
});

export default AuthSubmit;
