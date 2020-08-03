import React from 'react';
import { View, Text } from 'react-native';
import authStyles from './Styles/styles';
import DropdownAlert from 'react-native-dropdownalert';

import {
    MainHeader,
    SubHeader,
    AuthInput,
    AuthSubmit,
    AuthFooterButton,
    Subnote,
    ErrorNote
} from '../../Components/AuthPage/index';

import { Images } from '../../../Images/index';
import { colors, durations } from '../../vars';
import { connect } from 'react-redux';

import ValidationComponent from 'react-native-form-validator';

class SignIn extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleInput = (text, field) => {
        switch (field) {
            case 'username':
                this.setState({ username: text });
                break;
            case 'password':
                this.setState({ password: text });
                break;
        }
    };

    handleSignIn = () => {
        this.validate({
            username: { required: true },
            password: { required: true }
        });

        if (this.isFormValid()) {
            let body = {};
            body.username = this.state.username;
            body.password = this.state.password;

            let url = 'http://192.168.56.1:5000/signin';

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body })
            })
                .then(response => response.text())
                .then(data => {
                    if (data === 'matched') {
                        this.props.isLoggedDispatch(true);
                    } else {
                        this.props.isLoggedDispatch(false);
                        this.dropDownAlertRef.alertWithType(
                            'error',
                            'Oops!',
                            'You might have inserted wrong data'
                        );
                    }
                });
        } else {
            this.dropDownAlertRef.alertWithType(
                'error',
                'Error',
                'Oops! Looks like there are errors in the form'
            );
        }
    };

    render() {
        return (
            <View style={authStyles.authContainer}>
                <View style={authStyles.authHeaderContainer}>
                    <View style={authStyles.authHeader}>
                        <MainHeader>Safetync</MainHeader>
                    </View>
                    <View style={authStyles.authSubHeader}>
                        <SubHeader>Log In</SubHeader>
                    </View>
                </View>

                <View style={authStyles.authBodyContainer}>
                    <View style={authStyles.authInput}>
                        <AuthInput
                            ref='username'
                            source={Images.usernamePic}
                            placeholder={'Username...'}
                            onChangeText={text =>
                                this.handleInput(text, 'username')
                            }
                            keyboardType={'default'}
                            returnKeyType={'next'}
                        />
                        {this.isFieldInError('username') &&
                            this.getErrorsInField(
                                'username'
                            ).map((errorMessage, key) => (
                                <ErrorNote key={key} text={errorMessage} />
                            ))}
                    </View>
                    <View style={authStyles.authInput}>
                        <AuthInput
                            source={Images.passwordPic}
                            placeholder={'Password...'}
                            secureTextEntry={true}
                            onChangeText={text =>
                                this.handleInput(text, 'password')
                            }
                            keyboardType={'default'}
                            returnKeyType={'next'}
                        />
                        {this.isFieldInError('password') &&
                            this.getErrorsInField(
                                'password'
                            ).map((errorMessage, key) => (
                                <ErrorNote key={key} text={errorMessage} />
                            ))}
                    </View>
                </View>

                <View style={authStyles.authSubmit}>
                    <AuthSubmit
                        title={'Login'}
                        bgcolor={colors.authSubmitLogin}
                        onPress={() => this.handleSignIn()}
                    />
                </View>
                <Subnote
                    text={
                        '*We will not share your private information publicly.'
                    }
                />
                <View style={authStyles.authFooterContainer}>
                    <AuthFooterButton
                        linkTo={'signup'}
                        navigation={this.props.navigation}
                        title={'Not a member yet?'}
                    />
                </View>
                <DropdownAlert
                    ref={ref => (this.dropDownAlertRef = ref)}
                    closeInterval={durations.mediumDuration}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.authReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        isLoggedDispatch: response => {
            dispatch({
                type: 'IS_SIGNED_IN',
                payload: response
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
