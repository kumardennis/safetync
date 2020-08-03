'use strict';

import { StyleSheet } from 'react-native';

import { colors, sizes } from '../../../vars';
import { Fonts } from '../../../utils/Font';

const mainStyles = StyleSheet.create({
    newsfeedContainer: {
        width: '100%'
    },
    tabsView: {
        bottom: 0,
        width: '100%'
    },
    mainContainer: {
        height: '100%'
    },
    mapContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20
    },
    alertContainer: {
        width: '100%',
        padding: 10
    },
    textStyle: {
        color: colors.mainFontColor,
        fontSize: sizes.mainFontSize,
        fontFamily: Fonts.Nunito,
        letterSpacing: sizes.letterSpacing
    },
    alertType: {
        marginVertical: 20
    },
    alertTypeItems: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    horizontalLine: {
        textAlign: 'center',
        textAlignVertical: 'center',
        marginVertical: 20,
        color: colors.authFontColor,
        alignSelf: 'center'
    },
    textAreaContainer: {
        marginVertical: 20
    },
    imagePickerContainer: {
        justifyContent: 'center',
        marginVertical: 20
    },
    pickerContainer: {
        alignItems: 'center'
    },
    createAlert: {
        marginVertical: 20
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    starContainer: {
        alignItems: 'center',
        marginVertical: 20
    }
});

export default mainStyles;
