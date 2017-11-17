import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

class SettingScreen extends Component {
  static navigationOptions = {
    headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
    },
    tabBarIcon: ({ tintColor }) => {
        return (
          <Icon name="favorite" size={25} color={tintColor} />
        );

    }
  }

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <Button
          title='Reset Liked Jobs'
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor="#f44336"
          onPress={this.props.clearLikedJobs}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};

export default connect(null, { clearLikedJobs })(SettingScreen);
