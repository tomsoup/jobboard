import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import * as actions from '../actions';

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      // center of map
      longitude: -122,
      latitude: 37,
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
    this.props.fetchJobs(this.state.region);
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
