import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class AuthInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={Style.authMasterContainer}>
                <View style={Style.authInputContainer}>
                    <View style={Style.authImageContainer}>
                        <Image
                            style={Style.authIcon}
                            source={this.props.source}
                        />
                    </View>
                    <View style={Style.authVerticalLine} />
                    <TextInput
                        style={Style.authInput}
                        onChangeText={this.props.onChangeText}
                        editable={true}
                        maxLength={40}
                        secureTextEntry={this.props.secureTextEntry}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={colors.authPlaceholderColor}
                        keyboardType={this.props.keyboardType}
                        returnKeyType={this.props.returnKeyType}
                    />
                </View>
                <View style={Style.authHorizontalLine} />
            </View>
        );
    }
}

const Style = StyleSheet.create({
    authIcon: {
        height: 25,
        width: 25
    },
    authVerticalLine: {
        borderLeftColor: colors.authPlaceholderColor,
        borderLeftWidth: 1,
        alignSelf: 'center',
        flex: 0.25,
        height: sizes.authInputFontSize + 5
    },

    authInput: {
        fontSize: sizes.authInputFontSize,
        fontFamily: Fonts.Nunito,
        color: colors.authFontColor,
        flex: 12,
        paddingHorizontal: 10,
        letterSpacing: sizes.subHeaderLetterSpacing
    },
    authImageContainer: {
        flex: 2,
        justifyContent: 'center'
    },
    authHorizontalLine: {
        borderBottomColor: colors.authPlaceholderColor,
        borderBottomWidth: 1,
        width: sizes.authInputWidth - 50,
        marginTop: -10,
        marginBottom: 10
    },
    authInputContainer: {
        paddingHorizontal: 7,
        flexDirection: 'row',
        height: sizes.authInputHeight,
        width: sizes.authInputWidth
    },
    authMasterContainer: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        height: sizes.authInputHeight,
        width: sizes.authInputWidth,
        backgroundColor: colors.authComponentBackground,
        borderRadius: sizes.borderRadius
    }
});

export default AuthInput;
