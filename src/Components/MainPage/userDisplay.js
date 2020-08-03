import React, { Component } from 'react';

import { TouchableOpacity } from 'react-native';

import UserImage from './userImage';
import UserName from './userName';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class UserDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity style={Styles.userDisplay}>
                <UserImage source={this.props.source} />
                <UserName username={this.props.username} />
            </TouchableOpacity>
        );
    }
}

const Styles = {
    userDisplay: {
        flexDirection: 'row',
        padding: 5,
        width: '100%',
        alignItems: 'center'
    }
};

export default UserDisplay;
