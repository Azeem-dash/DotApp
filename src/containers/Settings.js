import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import ViewStyles from '../styles/ViewStyles';
import TextStyles from '../styles/TextStyles';
import CommonStyles from '../styles/CommonStyles';
import SpaceStyles from '../styles/SpaceStyles';
import Chat from '../assets/chat.svg';
import Logout from '../assets/logOut.svg';
import SettingIcon from 'react-native-vector-icons/AntDesign';
import LoginIocn from 'react-native-vector-icons/AntDesign';


// import Auth0 from 'react-native-auth0';
import {
  WHITE,
  NOTIFICATION_DARK,
  MODAL_BORDER_DARK,
  RED,
  GRAY,
  BLACK,
  THEME_PURPLE,
  THEME_BLUE,
} from '../constants/Colors';
export default function Settings() {
  const MenuItem = ({title, icon, onPress, chevron}) => {
    return (
      <TouchableHighlight underlayColor={NOTIFICATION_DARK} onPress={onPress}>
        <>
          <View style={CommonStyles.accountMenuItem}>
            <View style={CommonStyles.menuItemRow}>
              {icon}
              <Text
                style={[
                  TextStyles.textMedium15,
                  {marginLeft: 20, color: WHITE},
                ]}>
                {title}
              </Text>
            </View>
          </View>
          <View
            style={[
              CommonStyles.menuItemBorder,
              {borderBottomColor: MODAL_BORDER_DARK},
            ]}
          />
        </>
      </TouchableHighlight>
    );
  };
  return (
    <ScrollView keyboardDismissMode={'on-drag'} style={ViewStyles.container}>
      <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.bottom1]}>
        <View style={SpaceStyles.top1}>
          <MenuItem
            // chevron
            onPress={() => {
              console.log('good');
            }}
            icon={<SettingIcon name={'setting'} color={WHITE} size={25} />}
            title={'Setting'}
          />
          <MenuItem
            // chevron
            icon={<LoginIocn name={'login'} color={WHITE} size={25}  />}
            title={'Log In'}
            onPress={() => {
              console.log('good');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
