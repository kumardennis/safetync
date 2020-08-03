import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import mainStyles from './Styles/styles';
import {
    UserImage,
    UserName,
    StarRatingSystem
} from '../../Components/MainPage/index';

import { Images } from '../../../Images/index';
import { colors, sizes } from '../../vars';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: this.props.screenProps.screen
        };
    }

    componentDidUpdate(prevProps) {
        if (!(this.state.change === this.props.screenProps.screen)) {
            this.setState(
                {
                    change: this.props.screenProps.screen
                },
                () => {
                    this.props.navigation.navigate(this.state.change);
                }
            );
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={mainStyles.imageContainer}>
                    <UserImage scale={4} source={Images.user1} />
                </View>
                <View style={mainStyles.imageContainer}>
                    <UserName username={'keeth_wonka'} />
                </View>
                <View style={mainStyles.imageContainer}>
                    <Text
                        style={[
                            mainStyles.textStyle,
                            { fontSize: sizes.bigFontSize }
                        ]}
                    >
                        Keeth Wonka
                    </Text>
                </View>
                <View style={mainStyles.starContainer}>
                    <StarRatingSystem disabled={false} />
                </View>
            </ScrollView>
        );
    }
}

export default Profile;
