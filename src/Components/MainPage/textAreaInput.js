import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class TextAreaInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
    }

    handleText = text => {
        this.setState({
            input: text
        });
    };

    render() {
        return (
            <View style={Styles.inputContainer}>
                <TextInput
                    style={[this.props.styles.textStyle, Styles.input]}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={colors.authPlaceholderColor}
                    maxLength={300}
                    multiline={true}
                    onChange={this.handleText}
                />
            </View>
        );
    }
}

const Styles = {
    inputContainer: {
        marginVertical: 20,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.mainFontColor,
        borderRadius: 10
    },
    input: {
        backgroundColor: colors.authComponentBackground,
        height: sizes.inputHeight,
        borderRadius: 10,
        textAlignVertical: 'top'
    }
};

export default TextAreaInput;
