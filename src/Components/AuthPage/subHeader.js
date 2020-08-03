import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class SubHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <Text style={Style.SubHeader}>{this.props.children}</Text>;
    }
}

const Style = StyleSheet.create({
    SubHeader: {
        fontFamily: Fonts.DancingScript,
        letterSpacing: sizes.subHeaderLetterSpacing,
        fontSize: sizes.subHeaderFontSize,
        color: colors.authHeaderColor,
        backgroundColor: colors.authComponentBackground,
        textAlign: 'center',
        height: sizes.subHeaderHeight,
        width: sizes.subHeaderWidth,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

export default SubHeader;
