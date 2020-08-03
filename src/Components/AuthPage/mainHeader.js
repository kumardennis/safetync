import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <Text style={Style.MainHeader}>{this.props.children}</Text>;
    }
}

const Style = StyleSheet.create({
    MainHeader: {
        fontFamily: Fonts.Courgette,
        fontSize: sizes.mainHeaderFontSize,
        color: colors.authHeaderColor,
        backgroundColor: colors.authComponentBackground,
        textAlign: 'center'
    }
});

export default MainHeader;
