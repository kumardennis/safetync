import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import mainStyles from './Styles/styles';
import {
    Maps,
    TypeButton,
    TextAreaInput,
    ImagePick
} from '../../Components/MainPage/index';
import { AuthSubmit } from '../../Components/AuthPage/index';
import { Images } from '../../../Images/index';
import { colors } from '../../vars';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: this.props.screenProps.screen,
            fields: {
                geolocation: {
                    district: '',
                    coordinates: '',
                    alertRadius: ''
                },
                alertType: [],
                description: ''
            }
        };
    }

    getGeolocation = (district, coordinates, alertRadius) => {
        this.setState({
            fields: {
                geolocation: {
                    district,
                    coordinates,
                    alertRadius
                }
            }
        });
    };

    getAlertType = alertTypeSelected => {
        alertTypes = this.state.alertType;
        if (alertTypeSelected) {
            console.log('object');
        }
        this.setState({
            alertType
        });
    };

    insertPost = () => {
        let url = 'http://192.168.56.1:5000/postinsert';

        let body = {};
        body.field4 = 'value4';

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ body })
        // })
        //     .then(response => response.text())
        //     .then(data => console.log(data));
    };

    componentDidUpdate(prevProps) {
        if (!(this.state.change === this.props.screenProps.screen)) {
            this.setState(
                {
                    change: this.props.screenProps.screen
                },
                () => {
                    this.props.navigation.navigate(this.state.change);
                }
            );
        }
    }

    render() {
        return (
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={mainStyles.alertContainer}
            >
                <Text style={mainStyles.textStyle}>
                    Please specify the location and radius.
                </Text>
                <View
                    keyboardShouldPersistTaps='handled'
                    style={mainStyles.mapContainer}
                >
                    <Maps getGeolocation={this.getGeolocation} />
                </View>

                <Text style={mainStyles.horizontalLine}>
                    ____________________
                </Text>
                <View style={mainStyles.alertType}>
                    <Text style={mainStyles.textStyle}>What type of alert</Text>
                    <View style={mainStyles.alertTypeItems}>
                        <TypeButton
                            source={Images.pets}
                            styles={mainStyles}
                            getAlertType={this.getAlertType}
                            label={'Lost/Found Pets'}
                        />
                        <TypeButton
                            source={Images.suspicious}
                            styles={mainStyles}
                            getAlertType={this.getAlertType}
                            label={'Suspicious Activities'}
                        />
                        <TypeButton
                            source={Images.lostandfound}
                            styles={mainStyles}
                            getAlertType={this.getAlertType}
                            label={'Lost/Found Items'}
                        />
                        <TypeButton
                            source={Images.missing}
                            styles={mainStyles}
                            getAlertType={this.getAlertType}
                            label={'Missing People'}
                        />
                        <TypeButton
                            source={Images.theft}
                            styles={mainStyles}
                            getAlertType={this.getAlertType}
                            label={'Thefts'}
                        />
                    </View>
                </View>
                <Text style={mainStyles.horizontalLine}>
                    ____________________
                </Text>
                <View style={mainStyles.textAreaContainer}>
                    <Text style={mainStyles.textStyle}>
                        Please describe the case.
                    </Text>
                    <TextAreaInput
                        styles={mainStyles}
                        placeholder={'Tell people about it...'}
                    />
                </View>
                <Text style={mainStyles.horizontalLine}>
                    ____________________
                </Text>
                <View style={mainStyles.imagePickerContainer}>
                    <Text style={mainStyles.textStyle}>
                        Please upload some pictures if desired.
                    </Text>
                    <View style={mainStyles.pickerContainer}>
                        <ImagePick
                            source={Images.camerabg}
                            styles={mainStyles}
                        />
                    </View>
                </View>
                <Text style={mainStyles.horizontalLine}>
                    ____________________
                </Text>
                <View style={mainStyles.createAlert}>
                    <AuthSubmit
                        onPress={() => this.insertPost()}
                        title={'Create Alert!'}
                        bgcolor={colors.createAlertColor}
                    />
                </View>
            </ScrollView>
        );
    }
}

export default Alert;
