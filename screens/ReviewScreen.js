import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {
  static navigationOptions = {
    title: 'Review Jobs',
    header: ({ navigate }) => {
      return {
        right: (
        <Button
          title="Setting"
          onPress={() => navigate('setting')}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0, 122, 255, 1)"
        />
    ),
    //Anrdoid
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    };
    }
  }

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <Text>
          ReviewScreen
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
export default ReviewScreen;
