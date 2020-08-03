import React, { Component } from 'react';
import RadialGradient from 'react-native-radial-gradient';
import { Tabs } from '../../Components/MainPage/index';
import { NewsFeed, Profile, Alert } from './index';
import { View } from 'react-native';
import mainStyles from './Styles/styles';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createSwitchNavigator({
    News: NewsFeed,
    Profile: Profile,
    Alert: Alert
});

const TabContainer = createAppContainer(TabNavigator);

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: ''
        };
    }

    getScreen = screen => {
        this.setState({
            screen: screen
        });
    };

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
                style={mainStyles.mainContainer}
            >
                <TabContainer screenProps={{ screen: this.state.screen }} />
                <View style={mainStyles.tabsView}>
                    <Tabs getScreen={this.getScreen} />
                </View>
            </RadialGradient>
        );
    }
}

export default MainPage;
