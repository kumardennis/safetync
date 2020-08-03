import React, { Component } from 'react';

import { sizes } from '../../vars';
import { UserDisplay, SubjectImage } from '../../Components/MainPage/index';
import RadialGradient from 'react-native-radial-gradient';
import { Images } from '../../../Images';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <RadialGradient
                colors={[
                    'rgba(96,113,145,1)',
                    'rgba(51,62,81,1)',
                    'rgba(8,0,0,1)'
                ]}
                stops={[0.0, 0.39, 0.99]}
                radius={300}
                style={Styles.postStyle}
            >
                <UserDisplay
                    source={this.props.source}
                    username={this.props.username}
                />
                <SubjectImage
                    styles={this.props.styles}
                    source={this.props.subjectImage}
                    case={this.props.case}
                    resolveIcon={this.props.resolveIcon}
                />
            </RadialGradient>
        );
    }
}

const Styles = {
    postStyle: {
        width: '100%',
        height: sizes.postHeight,
        marginVertical: 10,
        padding: 2
    }
};

export default Post;
