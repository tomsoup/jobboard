import React, { Component } from 'react';
import {
  Animated,
  View,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
  //if user did not pass in onswipe Props, component will use the static Props
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: 'id'
  }
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      //if true, whenever user touches on this "card", this panResponder would be responsible
       onStartShouldSetPanResponder: (evt, gestureState) => true,
       // Whenever user start to drag or interact after onStartShouldSetPanResponder
       onPanResponderMove: (evt, gestureState) => {
         position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      // Whenever they lift or leave the screen
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.forceResetPosition();
        }
      }
    });

    // Most documentation will set panResponder as state,
    // however, we never setState for panResponderand beacuse it shouldn't be updated at all.
    this.state = {
      panResponder,
      position,
      index: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    //This will compare the data array in memory
    if (nextProps.data !== this.props.data) {
      this.setState({
        index: 0
      });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  onSwipeComplete(direction) {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    //documentation recommend the follow method to alter state. even though it is mutating it
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({
      index: this.state.index + 1
    });
  }


  getCardStyle() {
    const { position } = this.state;
    //The goal of interpolate is to tie an input scale to an outscale
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }


  forceSwipe(direction) {
    //Turnay statement
    // If direction is equal to right, it will return value between ? and :
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
      // the callback function will run after start() is complete
    }).start(() => {
      this.onSwipeComplete(direction);
    });
  }

  forceResetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  renderCards() {
    const deckSize = this.props.data.length;
    const { index } = this.state;

    if (index >= deckSize) {
      return this.props.renderNoMoreCards();
    }

    const deck = this.props.data.map((item, i) => {
      if (i < index) {
        return null;
      }
      if (i === index) {
        return (
          <Animated.View
            key={item[this.props.keyProp]}
            style={[styles.cardStyle, this.getCardStyle()]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View key={item.id} style={[styles.cardStyle, { top: 10 * (i - index), zIndex: -1 }]}>
          {this.props.renderCard(item)}
        </Animated.View>
      );
    });

    return Platform.OS === 'android' ? deck : deck.reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};

export default Swipe;
