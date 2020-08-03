'use strict';

import { StyleSheet } from 'react-native';

const authStyles = StyleSheet.create({
    authHeader: {},
    authSubHeader: {
        alignSelf: 'center'
    },
    authHeaderContainer: {
        flex: 3,
        justifyContent: 'space-evenly'
    },
    authBodyContainer: {
        flex: 6,
        justifyContent: 'center'
    },
    authFooterContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    authContainer: {
        width: '100%',
        height: '100%'
    },
    authInput: {
        marginVertical: 10,
        alignItems: 'center'
    },
    authSubmit: {
        flex: 1.5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default authStyles;
