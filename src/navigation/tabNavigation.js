import * as React from 'react';
import {WHITE, BLACK, GRAY, NIGHT} from '../constants/Colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Market from '../containers/Market';
import Settings from '../containers/Settings';
import Home from '../containers/Home';

import {
  swap,
  swapActive,
  chat,
  chatActive,
  settings,
  settingsActive,
  ETH,
} from '../constants/Images';
import {Button, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SpaceStyles from '../styles/SpaceStyles';
import TextStyles from '../styles/TextStyles';
import {useWalletConnect} from 'react-native-walletconnect';
import Search1 from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


import ViewTokens from '../components/viewTokens';
const Tab = createBottomTabNavigator();

const WalletConnectExample = () => {
  const {createSession, killSession, session, signTransaction} =
    useWalletConnect();
  const hasWallet = !!session.length;
  return (
    <>
      {!hasWallet && <Button title="Tab to Connect" onPress={createSession} />}
      {!!hasWallet && (
        <Button
          title="Sign Transaction"
          onPress={() =>
            signTransaction({
              from: '0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3',
              to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
              data: '0x',
              gasPrice: '0x02540be400',
              gas: '0x9c40',
              value: '0x00',
              nonce: '0x0114',
            })
          }
        />
      )}
      {!!hasWallet && (
        <Button title="Tab to Disconnect" onPress={killSession} />
      )}
    </>
  );
};

export default function MyTabs({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Market') {
            iconName = focused
              ? 'cellular-sharp'
              : 'cellular-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }
          return <Ionicons name={iconName} color={WHITE} size={25} />;
        },
        tabBarLabelStyle: {display: 'none'},
        tabBarStyle: {
          backgroundColor: NIGHT,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: BLACK,
        },
      })}
      tabBarIcon={false}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: NIGHT,
            shadowColor: 'transparent',
          },
          headerLeft: () => (
            <TouchableOpacity
              style={[SpaceStyles.spaceHorizontal, SpaceStyles.rowFlex]}
              onPress={() => alert('This is the Home Screen')}>
              {/* <Image source={wallet} /> */}
              <Text style={[TextStyles.textBold24, {color: WHITE}]}>Home</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={SpaceStyles.spaceHorizontal}
              onPress={() => navigation.navigate('ViewTokens')}>
              <Search1 name={'search1'} color={WHITE} size={25} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: NIGHT,
            shadowColor: 'transparent',
          },
          headerLeft: () => (
            <TouchableOpacity
              style={[SpaceStyles.spaceHorizontal, SpaceStyles.rowFlex]}
              onPress={() => alert('This is the Home Screen')}>
              {/* <Image source={wallet} /> */}
              <Text style={[TextStyles.textBold24, {color: WHITE}]}>Market</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: NIGHT,
            shadowColor: 'transparent',
          },
          headerTintColor: WHITE,
        }}
      />
    </Tab.Navigator>
  );
}
