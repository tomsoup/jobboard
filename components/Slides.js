import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
        return (
          <Button
            buttonStyle={styles.buttonStyle}
            title="Bon Voyage"
            raised
            onPress={this.props.onComplete}
          />
        );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => {
      const { slideText, slideStyle } = styles;
      const { text, color } = slide;
      return (
      <View key={text} style={[slideStyle, { backgroundColor: color }]}>
        <Text style={slideText}>
          {slide.text}
        </Text>
        {this.renderLastSlide(index)}
      </View>
      );
    });
  }

  render() {
    const { container } = styles;
    return (
      <ScrollView
        pagingEnabled
        horizontal
        style={container}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  slideText: {
    fontSize: 30,
    color: '#fff'
  },
  slideStyle: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 50
  }
};
export default Slides;
