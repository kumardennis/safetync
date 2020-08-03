import React, { Component } from 'react';

import { Image } from 'react-native';

import { colors, sizes } from '../../vars';

class UserImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 1
        };
    }

    componentDidMount() {
        this.props.scale ? this.setState({ scale: this.props.scale }) : null;
    }

    render() {
        return (
            <Image
                style={[
                    Styles.imageStyle,
                    {
                        width: sizes.userImageHeight * this.state.scale,
                        height: sizes.userImageWidth * this.state.scale,
                        borderRadius: 43 * this.state.scale
                    }
                ]}
                source={this.props.source}
            />
        );
    }
}

const Styles = {
    imageStyle: {
        width: sizes.userImageHeight,
        height: sizes.userImageWidth,
        borderWidth: 2,
        borderColor: colors.userImageBorder,
        marginHorizontal: 10,
        borderRadius: 43
    },
    imageContainer: {
        height: 'auto'
    }
};

export default UserImage;
