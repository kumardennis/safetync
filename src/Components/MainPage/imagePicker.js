import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

import ImagePicker from 'react-native-image-picker';

class ImagePick extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    pickImage = () => {
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    };

    render() {
        return (
            <ImageBackground
                blurRadius={1}
                style={Styles.image}
                source={this.props.source}
                imageStyle={{ borderRadius: 10 }}
                resizeMode={'cover'}
            >
                <TouchableOpacity
                    style={Styles.button}
                    onPress={this.pickImage}
                >
                    <Text style={[this.props.styles.textStyle, Styles.text]}>
                        Pick Image
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const Styles = {
    image: {
        width: sizes.imagePickerButtonWidth,
        height: sizes.imagePickerButtonHeight,
        marginVertical: 20
    },
    button: {
        borderRadius: 10,
        height: sizes.imagePickerButtonHeight,
        backgroundColor: colors.authComponentBackground,
        borderColor: colors.mainFontColor,
        borderWidth: 1.5,
        justifyContent: 'center',
        padding: 20
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center'
    }
};

const options = {
    title: 'Select Avatar',
    mediaType: 'photo',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default ImagePick;
