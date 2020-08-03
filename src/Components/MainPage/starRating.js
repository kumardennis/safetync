import React, { Component } from 'react';

import StarRating from 'react-native-star-rating';

import {
    Image,
    View,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import { Fonts } from '../../utils/Font';
import { Images } from '../../../Images/index';
import { colors, sizes } from '../../vars';

class StarRatingSystem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 3
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    render() {
        return (
            <View style={Styles.starContainer}>
                <StarRating
                    disabled={this.props.disabled}
                    emptyStar={Images.emptyStar}
                    fullStar={Images.fullStar}
                    iconSet={'Ionicons'}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={rating => this.onStarRatingPress(rating)}
                />
            </View>
        );
    }
}

const Styles = {
    starContainer: {
        width: '60%'
    }
};

export default StarRatingSystem;
