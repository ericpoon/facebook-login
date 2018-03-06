import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#24d7ba' },
  { text: 'Set your location, then swipe away', color: '#3fbcff' },
  { text: 'Land to your dream job', color: '#ea8b2c' },
];

class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  };

  render() {
    return (
      <Slides
        data={SLIDE_DATA}
        enterButtonText={'Start Exploring!'}
        onComplete={this.onSlidesComplete}
      />
    );
  }
}

export default WelcomeScreen;
