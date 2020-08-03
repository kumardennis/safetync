import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TabItem from './tab';

import { Images } from '../../../Images/index';

import { colors, sizes } from '../../vars';

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: ''
        };
    }

    getTab = tab => {
        this.setState(
            {
                tab: tab
            },
            () => {
                this.props.getScreen(this.state.tab);
            }
        );
    };

    render() {
        return (
            <View style={Styles.tabsContainer}>
                <View style={Styles.tabStyle}>
                    <TabItem
                        getTab={this.getTab}
                        source={Images.newsfeed}
                        label={'News'}
                    />
                </View>
                <View style={Styles.tabStyle}>
                    <TabItem
                        getTab={this.getTab}
                        source={Images.alert}
                        label={'Alert'}
                    />
                </View>
                <View style={Styles.tabStyle}>
                    <TabItem source={Images.camera} label={'Camera'} />
                </View>
                <View style={Styles.tabStyle}>
                    <TabItem source={Images.inbox} label={'Inbox'} />
                </View>
                <View style={Styles.tabStyle}>
                    <TabItem
                        getTab={this.getTab}
                        source={Images.profile}
                        label={'Profile'}
                    />
                </View>
            </View>
        );
    }
}

const Styles = {
    tabStyle: {
        height: 56
    },

    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.tabsBackground
    }
};

export default Tabs;
