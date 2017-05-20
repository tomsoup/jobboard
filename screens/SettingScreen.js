import React, { Component } from 'react';
import { Text, View } from 'react-native';

class SettingScreen extends Component {

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <Text>
          SettingScreen
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
export default SettingScreen;
