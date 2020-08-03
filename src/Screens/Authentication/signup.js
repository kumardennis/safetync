import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import authStyles from './Styles/styles';
import DropdownAlert from 'react-native-dropdownalert';
import io from 'socket.io-client';

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

import ValidationComponent from 'react-native-form-validator';

class SignUp extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            phone: '',
            email: '',
            confirmPassword: ''
        };
    }

    componentDidMount() {
        // const socket = io('http://192.168.56.1:5000', {
        //     secure: true,
        //     transports: ['websocket']
        // });
        // socket.on('connect', () => {
        //     socket.emit('testingSocket', { field1: 'value1' });
        //     console.log(socket.connected);
        //     socket.on('clientTest', json => {
        //         console.log('received json: ', json);
        //     });
        // });
    }

    handleInput = (text, field) => {
        switch (field) {
            case 'email':
                this.setState({ email: text });
                break;
            case 'username':
                this.setState({ username: text });
                break;
            case 'password':
                this.setState({ password: text });
                break;
            case 'confirmPassword':
                this.setState({ confirmPassword: text });
                break;
            case 'phone':
                this.setState({ phone: text });
                break;
        }
    };

    handleSignUp = () => {
        this.validate({
            username: { required: true },
            password: { required: true },
            confirmPassword: { required: true },
            phone: { required: true, numbers: true },
            email: { email: true, required: true }
        });

        // let test_url = 'http://127.0.0.1:8000';

        // fetch(test_url, {
        //     method: 'GET'
        // }).then(resp => console.log('json', resp.text()));

        if (this.isFormValid()) {
            let body = {};
            body.email = this.state.email;
            body.username = this.state.username;
            if (this.state.password === this.state.confirmPassword) {
                body.password = this.state.password;
            } else {
                this.dropDownAlertRef.alertWithType(
                    'error',
                    'Oops!',
                    'Password could not be confirmed'
                );
            }
            body.phone = this.state.phone;

            console.log(body);

            let url = 'http://localhost:8000/signup';

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(user => console.log(user))
                .then(data =>
                    this.dropDownAlertRef.alertWithType('info', 'Info', 'data')
                )
                .catch(error => {
                    console.log('found error', error);
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
                        <SubHeader>Sign Up</SubHeader>
                    </View>
                </View>
                <View style={authStyles.authBodyContainer}>
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 6,
                            justifyContent: 'center'
                        }}
                    >
                        <View style={authStyles.authInput}>
                            <AuthInput
                                source={Images.emailPic}
                                placeholder={'E-mail...'}
                                onChangeText={text =>
                                    this.handleInput(text, 'email')
                                }
                                keyboardType={'email-address'}
                                returnKeyType={'next'}
                            />
                            {this.isFieldInError('email') &&
                                this.getErrorsInField(
                                    'email'
                                ).map((errorMessage, key) => (
                                    <ErrorNote key={key} text={errorMessage} />
                                ))}
                        </View>
                        <View style={authStyles.authInput}>
                            <AuthInput
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
                        <View style={authStyles.authInput}>
                            <AuthInput
                                source={Images.passwordPic}
                                placeholder={'Confirm Password...'}
                                secureTextEntry={true}
                                onChangeText={text =>
                                    this.handleInput(text, 'confirmPassword')
                                }
                                keyboardType={'default'}
                                returnKeyType={'next'}
                            />
                            {this.isFieldInError('confirmPassword') &&
                                this.getErrorsInField(
                                    'confirmPassword'
                                ).map((errorMessage, key) => (
                                    <ErrorNote key={key} text={errorMessage} />
                                ))}
                        </View>
                        <View style={authStyles.authInput}>
                            <AuthInput
                                source={Images.phonePic}
                                placeholder={'Phone...'}
                                onChangeText={text =>
                                    this.handleInput(text, 'phone')
                                }
                                keyboardType={'numeric'}
                                returnKeyType={'done'}
                            />
                            {this.isFieldInError('phone') &&
                                this.getErrorsInField(
                                    'phone'
                                ).map((errorMessage, key) => (
                                    <ErrorNote key={key} text={errorMessage} />
                                ))}
                        </View>
                    </ScrollView>
                </View>
                <View style={authStyles.authSubmit}>
                    <AuthSubmit
                        title={'Make My Account'}
                        bgcolor={colors.authSubmitSignup}
                        onPress={() => this.handleSignUp()}
                    />
                </View>
                <Subnote
                    text={
                        '*We will not share your private information publicly.'
                    }
                />
                <View style={authStyles.authFooterContainer}>
                    <AuthFooterButton
                        linkTo={'signin'}
                        navigation={this.props.navigation}
                        title={'Already a member?'}
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

export default SignUp;
