import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class TabItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    testPress = () => {
        this.props.getTab(this.props.label);
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this.testPress}
                style={Styles.tabContainer}
            >
                <Image style={Styles.iconStyle} source={this.props.source} />
                <Text style={Styles.lableStyle}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }
}

const Styles = {
    iconStyle: {
        height: 35,
        width: 35,
        alignSelf: 'center'
    },
    lableStyle: {
        fontSize: sizes.smallFontSize,
        color: colors.mainFontColor,
        fontFamily: Fonts.Nunito
    },
    tabContainer: {
        backgroundColor: colors.tabsBackground
    }
};

export default TabItem;
