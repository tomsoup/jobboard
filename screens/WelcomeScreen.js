import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';


const SLIDE_DATA = [
  { text: 'Welcome to Tomder', color: '#03a9f4' },
  { text: 'Use this to save your memories', color: '#009688' },
  { text: 'This is the only spring of your life', color: '#FDE2E6' }
];

class WelcomeScreen extends Component {
  state = { token: null }


  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete() {
    // When we render with react-navigation, it iwll give use the navigation.props
    this.props.navigation.navigate('auth');
  }

  render() {
    // false and null will trigger the same statement without using lodash
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }
    // const { container } = styles;
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)} />
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
export default WelcomeScreen;
