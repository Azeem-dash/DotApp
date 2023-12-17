import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/navigation/tabNavigation';
import Main from './src/Main';

import WalletConnectProvider, {
  useWalletConnect,
} from 'react-native-walletconnect';

export default function App() {
  return (
    <WalletConnectProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </WalletConnectProvider>
  );
}
