import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class ErrorNote extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <Text style={Style.ErrorNote}>{this.props.text}</Text>;
    }
}

const Style = StyleSheet.create({
    ErrorNote: {
        fontSize: sizes.subNoteFontSize,
        color: colors.authFontColor,
        fontFamily: Fonts.Nunito,
        textAlign: 'center',
        marginVertical: 5
    }
});

export default ErrorNote;
