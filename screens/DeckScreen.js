import React, { Component } from 'react';
import { Text, View } from 'react-native';

class DeckScreen extends Component {

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <Text>
          DeckScreen
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  }
};
export default DeckScreen;
