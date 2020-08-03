import React, { Component } from 'react';

import {
    Image,
    View,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import { Fonts } from '../../utils/Font';

import { colors, sizes } from '../../vars';

class SubjectImage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity>
                <ImageBackground
                    imageStyle={{ borderRadius: 10 }}
                    style={Styles.imageStyle}
                    source={this.props.source}
                >
                    <View style={Styles.caseContainer}>
                        <Text
                            style={[
                                Styles.caseStyle,
                                this.props.styles.textStyle
                            ]}
                        >
                            {this.props.case}
                        </Text>
                    </View>
                    <Image
                        style={Styles.resolveStyle}
                        source={this.props.resolveIcon}
                    />
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

const Styles = {
    imageStyle: {
        fontSize: sizes.mainFontSize,
        color: colors.mainFontColor,
        fontFamily: Fonts.Nunito,
        marginHorizontal: 10,
        marginVertical: 10,
        height: sizes.subjectImageHeight,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'black',
        position: 'relative'
    },
    caseContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: colors.subjectLayer,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2
    },
    caseStyle: {
        padding: 10
    },
    resolveStyle: {
        position: 'absolute',
        height: sizes.resolveIconStyle,
        width: sizes.resolveIconStyle,
        bottom: 10,
        right: 10
    }
};

export default SubjectImage;
