import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import AuthScreen from './src/screens/AuthScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default class App extends React.Component {
  render() {
    const ReviewStackNavigator = StackNavigator({
      review: ReviewScreen,
      settings: SettingsScreen,
    });
    const MainTabNavigator = TabNavigator({
      map: MapScreen,
      deck: DeckScreen,
      review: ReviewStackNavigator,
    });
    const RootTabNavigator = TabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      main: MainTabNavigator,
    });

    return (
      <RootTabNavigator />
    );
  }
}
