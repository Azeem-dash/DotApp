import {Platform, StyleSheet} from 'react-native';
import constants from '../constants';
import {
  BLUE,
  LIGHT_GRAY,
  WHITE,
  GRAY,
  DARK_BLACK,
  GREEN,
  RED,
  NIGHT,
} from '../constants/Colors';
import {ifIphoneX} from 'react-native-iphone-x-helper';

const HEIGHT = constants.BaseStyle.DEVICE_HEIGHT / 100;
const WIDTH = constants.BaseStyle.DEVICE_WIDTH / 100;
const isIOS = Platform.OS === 'ios';
const ViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NIGHT,
  },
  logoImage: {
    alignSelf: 'center',
    marginTop: HEIGHT * 20,
    marginBottom: HEIGHT * 10,
  },
  logoImageSmall: {
    alignSelf: 'center',
    marginTop: HEIGHT * 2,
  },
  imageHand: {
    width: WIDTH * 11,
    marginTop: 8,
  },
  imagePercent: {
    width: WIDTH * 11,
    marginTop: 8,
  },
  textView: {
    width: WIDTH * 70,
    marginBottom: HEIGHT * 3,
  },
  textView2: {
    padding: 10,
    margin: 10,
  },
  market_cap_rank: {
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
    top:20,
    color: GRAY
  },
  market_cap_rankPrice:{
    fontSize:16,
    fontWeight:'300',
    color:WHITE,
    textAlign: 'center',
    alignSelf: 'center',
    // position: 'absolute',
  },
  emailText: {
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    width: WIDTH * 70,
    height: HEIGHT * 7,
    bottom: HEIGHT * 9,
    paddingTop: HEIGHT * 2,
  },
  bottomButtonJoinView: {
    // position: 'absolute',
    bottom: 0,
    backgroundColor: BLUE,
    width: WIDTH * 100,
    height: HEIGHT * 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomJoinView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: BLUE,
    width: WIDTH * 100,
    height: HEIGHT * 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomGreenView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: GREEN,
    width: WIDTH * 100,
    height: HEIGHT * 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomRedView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: RED,
    width: WIDTH * 100,
    height: HEIGHT * 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBottomView: {
    position: 'absolute',
    bottom: 0,
    width: WIDTH * 100,
    height: HEIGHT * 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //login screen
  textInputView: {
    borderRadius: 4,
    borderWidth: 1,
    // borderColor: LIGHT_GRAY,
    height: HEIGHT * 6,
    paddingHorizontal: WIDTH * 5,
    marginTop: HEIGHT * 2,
    justifyContent: 'center',
  },
  textInput: {
    width: WIDTH * 80,
    color: DARK_BLACK,
    ...constants.Fonts.medium16,
  },
  headerView: {
    marginTop: isIOS ? ifIphoneX(HEIGHT * 6.5, HEIGHT * 5.5) : HEIGHT * 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: WIDTH * 5,
  },
  subHeaderView: {
    marginTop: HEIGHT * 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: WIDTH * 5,
  },
  imageSubHeaderView: {
    marginTop: HEIGHT * 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: WIDTH * 5,
  },
  headerLoginView: {
    marginTop: isIOS ? HEIGHT * 6 : 10,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAppView: {
    marginTop: isIOS ? ifIphoneX(HEIGHT * 6, HEIGHT * 4) : 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  //signup screen
  halfInputView: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
    height: HEIGHT * 6,
    paddingHorizontal: WIDTH * 5,
    marginTop: HEIGHT * 3,
    justifyContent: 'center',
    width: WIDTH * 43,
  },
  textHalfInput: {
    width: WIDTH * 32,
    color: DARK_BLACK,
    ...constants.Fonts.medium16,
  },
});
export default ViewStyles;
