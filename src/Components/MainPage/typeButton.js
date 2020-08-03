import React, { Component } from 'react';
import { TouchableOpacity, Text, View, ImageBackground } from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class TypeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            selected: false
        };
    }

    handlePress = () => {
        this.setState({
            selected: !this.state.selected
        });
    };

    render() {
        return (
            <ImageBackground
                blurRadius={2}
                style={Styles.image}
                source={this.props.source}
                imageStyle={{ borderRadius: 10 }}
            >
                <TouchableOpacity
                    onPress={this.handlePress}
                    style={[
                        Styles.button,
                        this.state.selected
                            ? { backgroundColor: colors.selectedTypeButton }
                            : {
                                  backgroundColor:
                                      colors.selectedTypeButtonBackground
                              }
                    ]}
                >
                    <Text style={[this.props.styles.textStyle, Styles.text]}>
                        {this.props.label}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const Styles = {
    image: {
        width: sizes.typeButtonWidth,
        height: sizes.typeButtonHeight,
        marginVertical: 5
    },
    button: {
        borderRadius: 10,
        height: sizes.typeButtonHeight,
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

export default TypeButton;
