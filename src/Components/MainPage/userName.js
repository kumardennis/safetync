import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class UserName extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <Text style={Styles.usernameStyle}>{this.props.username}</Text>
            </View>
        );
    }
}

const Styles = {
    usernameStyle: {
        fontSize: sizes.mainFontSize,
        color: colors.mainFontColor,
        fontFamily: Fonts.Nunito,
        marginHorizontal: 10
    }
};

export default UserName;
