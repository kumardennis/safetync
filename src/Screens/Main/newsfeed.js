import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import mainStyles from './Styles/styles';
import { Post } from '../../Components/MainPage/index';
import RadialGradient from 'react-native-radial-gradient';
import { Images } from '../../../Images/index';
import { colors } from '../../vars';

class NewsFeed extends Component {
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
            <ScrollView style={mainStyles.newsfeedContainer}>
                <RadialGradient
                    style={mainStyles.mainContainer}
                    colors={['rgba(21,21,21,1)', 'rgba(0,0,0,1)']}
                    stops={[0.0, 0.49]}
                    radius={500}
                >
                    <Post
                        styles={mainStyles}
                        source={Images.user1}
                        username={'keeth_wonka'}
                        case={Case1}
                        subjectImage={Images.subject1}
                        resolveIcon={Images.correct}
                    />
                    <Post
                        styles={mainStyles}
                        source={Images.user2}
                        username={'paulson.ron'}
                        case={Case2}
                        subjectImage={Images.subject2}
                        resolveIcon={Images.wrong}
                    />
                    <Post
                        styles={mainStyles}
                        source={Images.user3}
                        username={'granny_daddy'}
                        case={Case2}
                        subjectImage={Images.subject3}
                        resolveIcon={Images.wrong}
                    />
                </RadialGradient>
            </ScrollView>
        );
    }
}

const Case1 =
    'Hi! My little rat ran away from the house yesterday. Please contact me if found.';

const Case2 =
    'Hello, I have found a lost wallet, ID to Mr. Kistjan Rand. Please contact me to receive the wallet!';

const Case3 =
    "Caught these people lurking around in backyard, keep your's safe!";

export default NewsFeed;
