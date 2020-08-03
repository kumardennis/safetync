import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import { CustomMap, CustomMap2 } from './CustomMap';
import { Fonts } from '../../utils/Font';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GoogleMapsPlacesAPIKey } from '../../apikey';
import Geocoder from 'react-native-geocoding';
import Slider from '@react-native-community/slider';
import { Images } from '../../../Images/index';
import { colors, sizes } from '../../vars';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            district: '',
            alertRadius: 100,
            queryGeolocation: '',
            coordinates: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005 * (screenWidth / screenHeight)
            }
        };
        this.homePlace = {
            description: 'Home',
            geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
        };
        this.workPlace = {
            description: 'Work',
            geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
        };
        this.initialLatitudeDelta = this.state.coordinates.latitudeDelta;
        this.initialLongitudeDelta = this.state.coordinates.longitudeDelta;
    }

    getDistrictFromCoordinates = (lat, lng) => {
        {
            Geocoder.from(lat, lng)
                .then(json => {
                    var addressComponent = json.results[0].address_components;

                    let sublocality_name = '';
                    for (let loc in addressComponent) {
                        locality = addressComponent[loc];
                        if (locality.types.includes('sublocality_level_1')) {
                            sublocality_name = locality;

                            break;
                        } else if (locality.types.includes('sublocality')) {
                            sublocality_name = locality;
                        } else if (
                            locality.types.includes(
                                'administrative_area_level_3'
                            )
                        ) {
                            sublocality_name = locality;
                        } else if (locality.types.includes('route')) {
                            sublocality_name = locality;
                        }
                    }
                    this.setState(
                        {
                            district: sublocality_name
                        },
                        () => {
                            this.props.getGeolocation(
                                this.state.district,
                                this.state.coordinates,
                                this.state.alertRadius
                            );
                        }
                    );
                })
                .catch(error => console.warn(error));
        }
    };

    onSelectRegion = (data, details) => {
        this.setState(
            {
                queryGeolocation: details.formatted_address
            },
            () => {
                Geocoder.from(this.state.queryGeolocation)
                    .then(json => {
                        var location = json.results[0].geometry.location;
                        this.setState(
                            {
                                coordinates: {
                                    ...this.state.coordinates,
                                    latitude: location.lat,
                                    longitude: location.lng
                                }
                            },
                            () => {
                                this.getDistrictFromCoordinates(
                                    this.state.coordinates.latitude,
                                    this.state.coordinates.longitude
                                );
                            }
                        );
                    })
                    .catch(error => console.warn(error));
            }
        );
    };

    onRegionChange = region => {
        this.setState(
            {
                coordinates: region
            },
            () => {
                this.getDistrictFromCoordinates(
                    this.state.coordinates.latitude,
                    this.state.coordinates.longitude
                );
            }
        );
    };

    onSliderValueChange = slider => {
        this.setState({
            alertRadius: slider * 1000
        });
    };

    onSliderValueComplete = slider => {
        const coordinates = this.get4PointsAroundCircumference(
            this.state.coordinates.latitude,
            this.state.coordinates.longitude,
            this.state.alertRadius
        );
        this._map.fitToCoordinates(coordinates);
        this.props.getGeolocation(
            this.state.district,
            this.state.coordinates,
            this.state.alertRadius
        );
    };

    get4PointsAroundCircumference = (latitude, longitude, radius) => {
        const earthRadius = 6378000;
        const lat0 = latitude + (-radius / earthRadius) * (180 / Math.PI);
        const lat1 = latitude + (radius / earthRadius) * (180 / Math.PI);
        const lng0 =
            longitude +
            ((-radius / earthRadius) * (180 / Math.PI)) /
                Math.cos((latitude * Math.PI) / 180);
        const lng1 =
            longitude +
            ((radius / earthRadius) * (180 / Math.PI)) /
                Math.cos((latitude * Math.PI) / 180);

        return [
            {
                latitude: lat0,
                longitude: longitude
            }, //bottom
            {
                latitude: latitude,
                longitude: lng0
            }, //left
            {
                latitude: lat1,
                longitude: longitude
            }, //top
            {
                latitude: latitude,
                longitude: lng1
            } //right
        ];
    };

    componentDidMount() {
        Geocoder.init(GoogleMapsPlacesAPIKey);

        Geolocation.getCurrentPosition(data => {
            this.setState(
                {
                    coordinates: {
                        ...this.state.coordinates,
                        longitude: data.coords.longitude,
                        latitude: data.coords.latitude
                    }
                },
                () =>
                    this.getDistrictFromCoordinates(
                        this.state.coordinates.latitude,
                        this.state.coordinates.longitude
                    )
            );
        });
    }

    render() {
        return (
            <View>
                <MapView
                    ref={ref => (this._map = ref)}
                    style={Styles.map}
                    showsMyLocationButton={true}
                    customMapStyle={CustomMap}
                    showsMyLocationButton={true}
                    zoomControlEnabled={true}
                    region={this.state.coordinates}
                    onRegionChangeComplete={this.onRegionChange}
                >
                    <MapView.Circle
                        ref={ref => (this._circle = ref)}
                        key={(
                            this.state.coordinates.longitude +
                            this.state.coordinates.latitude
                        ).toString()}
                        center={{
                            latitude: this.state.coordinates.latitude,
                            longitude: this.state.coordinates.longitude
                        }}
                        radius={this.state.alertRadius}
                        strokeWidth={1.5}
                        strokeColor={'#db70b8'}
                        fillColor={'rgba(230,238,255,0.15)'}
                    />
                </MapView>
                <View style={Styles.markerFixed}>
                    <Image style={Styles.marker} source={Images.marker} />
                </View>
                <View style={Styles.calloutView}>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2}
                        autoFocus={false}
                        returnKeyType={'search'}
                        keyboardAppearance={'light'}
                        listViewDisplayed='false'
                        fetchDetails={true}
                        renderDescription={row => row.description}
                        onPress={this.onSelectRegion}
                        getDefaultValue={() => ''}
                        query={{
                            key: GoogleMapsPlacesAPIKey,
                            language: 'en',
                            types: 'geocode'
                        }}
                        styles={{
                            textInputContainer: {
                                backgroundColor: 'transparent',
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                                color: '#fff'
                            },
                            description: {
                                color: '#ffffff'
                            },
                            poweredContainer: {
                                display: 'none'
                            },
                            textInput: {
                                backgroundColor: 'transparent',
                                marginLeft: 10,
                                width: '90%',
                                marginRight: 10,
                                height: 40,
                                color: 'white'
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            }
                        }}
                        currentLocation={true}
                        currentLocationLabel='Current location'
                        nearbyPlacesAPI='GooglePlacesSearch'
                        GooglePlacesSearchQuery={{
                            rankby: 'distance'
                        }}
                        GooglePlacesDetailsQuery={{
                            fields: 'formatted_address'
                        }}
                        filterReverseGeocodingByTypes={[
                            'locality',
                            'administrative_area_level_3'
                        ]}
                        predefinedPlaces={[this.homePlace, this.workPlace]}
                        debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />
                </View>
                <Slider
                    style={Styles.slider}
                    minimumValue={0.1}
                    maximumValue={5}
                    step={0.1}
                    minimumTrackTintColor='#FFFFFF'
                    maximumTrackTintColor='#FFFFFF'
                    onValueChange={slider => this.onSliderValueChange(slider)}
                    onSlidingComplete={slider =>
                        this.onSliderValueComplete(slider)
                    }
                />
                <Text style={Styles.text}>
                    Alert Radius : {(this.state.alertRadius / 1000).toFixed(1)}{' '}
                    KM
                </Text>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    map: {
        height: 400,
        width: 400
    },
    calloutView: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        width: '50%',
        position: 'absolute',
        left: 10,
        right: 0,
        top: 10
    },
    marker: {
        height: 48,
        width: 48
    },
    markerFixed: {
        left: '51%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '43%'
    },
    slider: {
        width: 300,
        height: 30,
        borderColor: 'grey',
        borderWidth: 10,
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    text: {
        color: '#fff',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        fontSize: 20
    }
});

export default Maps;
