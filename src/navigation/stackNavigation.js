// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import tabNavigation from './tabNavigation';
import newScreen from '../screens/newScreen';
import ViewTokens from '../components/viewTokens';
const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="tabNavigation" component={tabNavigation} />
      <Stack.Screen name="newScreen" component={newScreen} />
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          gestureEnabled: false,
          headerShown: false,
        }}
        name="ViewTokens"
        component={ViewTokens}
      />
    </Stack.Navigator>
  );
}

export default App;
