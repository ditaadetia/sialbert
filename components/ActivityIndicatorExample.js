import React from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  render() {
    return (
      <View style={styles.sectionNavContainer}>
        <LottieView
          progress={this.state.progress}
          style={{
            width: 48,
            height: 48,
          }}
          source={require('../assets/loader.json')}
          autoPlay={true} loop={true}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
    },
});
