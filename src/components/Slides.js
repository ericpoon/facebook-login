import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderEnterButton = () => {
    const { enterButtonText, onComplete } = this.props;
    return (
      <Button
        title={enterButtonText}
        raised
        buttonStyle={styles.enterButton}
        containerViewStyle={styles.enterButtonContainer}
        onPress={onComplete}
      />
    );
  };

  renderSlides = () => {
    const { data } = this.props;
    return data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[styles.slide, { backgroundColor: slide.color }]}
        >
          <Text style={styles.slideText}>{slide.text}</Text>
          {index === data.length - 1 && this.renderEnterButton()}
        </View>
      );
    });
  };

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  slideText: {
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
    color: 'white',
  },
  enterButton: {
    backgroundColor: '#1d8ae8',
  },
  enterButtonContainer: {
    marginTop: 20,
  },
};

export default Slides;
