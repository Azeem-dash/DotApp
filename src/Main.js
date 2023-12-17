import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './navigation/tabNavigation';
import StackNavigation from './navigation/stackNavigation';

export default function Main() {
  return <StackNavigation />;
}
