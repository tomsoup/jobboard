import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Platform } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import * as actions from '../actions';

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
        return (
          <Icon name="my-location" size={25} color={tintColor} />
        );
      }
  }

  state = {
    mapLoaded: false,
    region: {
      // center of map
      longitude: -74.0060,
      latitude: 40.7128,
      // zoom level
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    const { container } = styles;
    return (
      <View style={container}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          scrollEnabled={false}
          cacheEnabled={Platform.OS === 'android'}
        />
      <View style={styles.buttonContainer} >
        <Button
          large
          title="What's Here?"
          backgroundColor='#009688'
          icon={{ name: 'search' }}
          onPress={this.onButtonPress}
        />
      </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
};
export default connect(null, actions)(MapScreen);
