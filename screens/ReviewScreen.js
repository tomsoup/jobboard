import React, { Component } from 'react';
import { Text, View, Platform, Linking, ScrollView } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({
    navigation, tintColor
  }) => {
    return {
    title: 'Review Jobs',
    headerRight: <Button
            title="Setting"
            onPress={() => navigation.navigate('setting')}
            backgroundColor="rgba(0,0,0,0)"
            color="rgba(0, 122, 255, 1)"
            />,
    //Anrdoid
    tabBarIcon: <Icon name="favorite" size={25} color={tintColor} />,
  };
  }
  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const { company, formattedRelativeTime, url, latitude, longitude, jobtitle, jobkey } = job;
      const initialRegion = {
        latitude, longitude, latitudeDelta: 0.045, longitudeDelta: 0.02
      };
      return (
        <Card
          title={
            jobtitle
          }
          key={jobkey}
        >
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
          <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={styles.italics}>
                {company}
              </Text>
              <Text>
                {formattedRelativeTime}
              </Text>

            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03a9f4"
              onPress={() => { Linking.openURL(url); }}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  italics: {
      fontStyle: 'italic'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStateToProps = (state) => {
  return { likedJobs: state.likedJobs };
};

export default connect(mapStateToProps, {})(ReviewScreen);
