import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { facebookLogin } from '../actions';

class AuthScreen extends Component {
  // ONce this componenethas been rendered to the screen
  componentDidMount() {
    this.props.facebookLogin();
    // AsyncStorage.removeItem('fb_token');
    // this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      // provided by react navigation
      this.props.navigation.navigate('map');
    }
  }

  render() {
    const { container } = styles;
    return (
      <View style={container} />
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

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps, { facebookLogin })(AuthScreen);
