import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  FlatList,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  BORDER,
  MODAL_BORDER_DARK,
  NOTIFICATION_DARK,
  NOTIFICATION_LIGHT,
  WHITE,
  BLUE,
  THEME_BLUE,
  MODAL_BORDER,
  GRAY,
  RED,
  THEME_RED,
  GREEN,
  THEME_GREEN,
  LIGHT_GRAY,
  BLACK,
  PURPLE_DARK,
  PURPLE,
} from '../constants/Colors';
import moment from 'moment';

import ViewStyles from '../styles/ViewStyles';
import {Calculator, convert, alert, trending} from '../constants/Images';
import TextStyles from '../styles/TextStyles';
import CommonStyles from '../styles/CommonStyles';
import SpaceStyles from '../styles/SpaceStyles';
import ViewTokens from '../components/viewTokens';
import constants, {ThemeContext} from '../constants';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import Carousel, {Pagination} from 'react-native-snap-carousel';
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function Home({navigation, route}) {
  const sliderWidth = constants.BaseStyle.DEVICE_WIDTH;
  const theCurrentDay = new Date();
  const [marketStatus, setmarketStatus] = useState();
  const [index, setIndex] = useState(0);
  const [ArrayData, setArrayData] = useState([]);
  const [showView, setShowView] = useState(1);
  const [rowNumber, setRowNumber] = useState();
  const [showModal, setShowModal] = useState(false);
  const [Data1, setData1] = useState();
  const [Data2, setData2] = useState();
  const [Data1Price, setData1Price] = useState(1);
  const [onChangePrice1, setOnChangePrice1] = useState();
  const [Data2Price, setData2Price] = useState(1);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    OnGetdata();
  }, []);
  const OnGetdata = async () => {
    let res = await fetch(`https://api.coingecko.com/api/v3/search/trending`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   firstParam: 'yourValue',
      // }),
    })
      .then(async res => {
        let json = await res.json();
        // console.log(json.coins);

        setArrayData(json.coins);
      })
      .catch(err => {
        setShowError('Not Found');
      });
  };

  // console.log(data?.logoURI);
  const {theme, myColors} = useContext(ThemeContext.ThemeContext);
  const themeTextColor = {
    color: myColors.primaryTextColor,
  };
  const themeSecondaryTextColor = {
    color: myColors.secondaryTextColor,
  };
  let carouselData = [
    {
      id: 1,
      title: `${
        moment(theCurrentDay).format('H') >= 5 &&
        moment(theCurrentDay).format('H') < 12
          ? 'Good morning Azeem'
          : moment(theCurrentDay).format('H') >= 12 &&
            moment(theCurrentDay).format('H') < 18
          ? 'Good afternoon Azeem'
          : moment(theCurrentDay).format('H') >= 18 &&
            moment(theCurrentDay).format('H') < 21
          ? 'Good evening Azeem'
          : 'Good night Azeem'
      }`,
      description: `It's ${moment(new Date()).format(
        'h:mm a',
      )} and the Stock Market is currently ${
        marketStatus === 'open' ? 'open' : 'closed'
      }.`,
    },
    {
      id: 2,
      title: 'Protect your account',
      description: 'Enable two-factor auth (2FA) for added security.',
      //       icon: <CloudKey width={60} height={60} color={theme === 'light' ? BLUE : THEME_BLUE} />,
      onPress: () => {},
    },
  ];

  const renderCarouselItems = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={item?.onPress}>
        <View
          style={[
            CommonStyles.accountVerificationView,
            {
              backgroundColor:
                theme === 'light' ? NOTIFICATION_LIGHT : NOTIFICATION_DARK,
              borderColor: theme === 'light' ? LIGHT_GRAY : MODAL_BORDER_DARK,
              //shadowColor: theme === 'light' ? '#ccc' : null,
              // shadowOffset: {
              //   width: 0,
              //   height: 1,
              // },
              // shadowRadius: ifIphoneX(5, 3),
              // shadowOpacity: 0.6,
              // elevation: 1,
            },
            SpaceStyles.top2,
            SpaceStyles.bottom1,
          ]}>
          <View style={[SpaceStyles.alignSpaceBlock]}>
            <View style={{width: 240}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[TextStyles.textBold15, themeSecondaryTextColor]}>
                  {item?.title}
                </Text>
              </View>
              <Text
                style={[
                  TextStyles.textSemiBold15DarkBlack,
                  Platform.OS === 'ios'
                    ? ifIphoneX(SpaceStyles.top1, null)
                    : SpaceStyles.top1,
                  themeTextColor,
                ]}>
                {item?.description}
              </Text>
            </View>
            <View>{item?.icon}</View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item}) => (
    <TouchableOpacity>
      <View style={CommonStyles.TokenViewFlatlist}>
        <Image
          style={{
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignSelf: 'center',
            alignContent: 'center',
          }}
          source={{uri: item.item.large}}
        />
        <View
          style={{
            marginLeft: 5,
          }}>
          <Text style={[TextStyles.textRegular20, {color: WHITE}]}>
            {item.item.name}
          </Text>
          <Text style={[TextStyles.textRegular14, {color: GRAY}]}>
            {item.item.symbol}
          </Text>
        </View>
        <View style={ViewStyles.market_cap_rank}>
          <Text style={ViewStyles.market_cap_rankPrice}>
            #{item.item.market_cap_rank}
          </Text>
        </View>
      </View>
      <View style={[CommonStyles.lineView, {borderBottomColor: WHITE}]} />
    </TouchableOpacity>
  );

  useEffect(() => {
    setTotalPrice((onChangePrice1 * Data1Price) / Data2Price);
  }, [onChangePrice1]);

  return (
    <DismissKeyboard>
      <View style={ViewStyles.container}>
        <FlatList
          ListHeaderComponent={() => (
            <>
              <Pagination
                dotsLength={carouselData.length}
                activeDotIndex={
                  carouselData.length - 1 < index ? index - 1 : index
                }
                dotContainerStyle={{
                  marginTop: 0,
                  marginHorizontal: 3,
                  marginBottom: 1,
                }}
                containerStyle={{
                  paddingTop: 8,
                  paddingBottom: 0,
                }}
                // carouselRef={ref => (Carousel = ref)}
                dotStyle={{
                  borderRadius: 1,
                  width: 20,
                  height: 2,
                  backgroundColor: theme === 'light' ? BLACK : WHITE,
                }}
                inactiveDotStyle={{
                  backgroundColor: theme === 'light' ? MODAL_BORDER : GRAY,
                }}
                inactiveDotOpacity={0.7}
                inactiveDotScale={1}
                animatedDuration={0}
              />
              <Carousel
                layout={'default'}
                // ref={ref => (Carousel = ref)}
                data={carouselData}
                renderItem={renderCarouselItems}
                sliderWidth={sliderWidth}
                itemWidth={sliderWidth - 50}
                removeClippedSubviews={false}
                onBeforeSnapToItem={index => setIndex(index)}
              />
              <View style={CommonStyles.swapContainer}>
                <View
                  style={[
                    SpaceStyles.alignSpaceBlock,
                    SpaceStyles.spaceHorizontal,
                    SpaceStyles.top2,
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowView(1);
                    }}>
                    <View
                      style={[
                        SpaceStyles.rowFlex,
                        {
                          backgroundColor: showView == 1 ? '#da8ee7' : null,
                          padding: 5,
                          borderRadius: 10,
                        },
                      ]}>
                      <Image
                        style={SpaceStyles.ImageStyleInTokenS}
                        source={trending}
                      />
                      <Text
                        style={[
                          TextStyles.textBold18,
                          SpaceStyles.left2,
                          {color: WHITE},
                        ]}>
                        Trending
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setShowView(2)}
                    style={{
                      backgroundColor: showView == 2 ? '#da8ee7' : null,
                      padding: 5,
                      borderRadius: 10,
                    }}>
                    <View style={SpaceStyles.rowFlex}>
                      <Image
                        style={[SpaceStyles.ImageStyleInTokenS, {width: 35}]}
                        source={Calculator}
                      />
                      <Text
                        style={[
                          TextStyles.textBold18,
                          SpaceStyles.left2,
                          {color: WHITE},
                        ]}>
                        Calculator
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    SpaceStyles.alignSpaceBlock,
                    SpaceStyles.spaceHorizontal,
                    SpaceStyles.top2,
                  ]}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: showView == 3 ? '#da8ee7' : null,
                      padding: 5,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      setShowView(3);
                    }}>
                    <View style={SpaceStyles.rowFlex}>
                      <Image
                        style={SpaceStyles.ImageStyleInTokenS}
                        source={convert}
                      />
                      <Text
                        style={[
                          TextStyles.textBold18,
                          SpaceStyles.left2,
                          {color: WHITE},
                        ]}>
                        Convert
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: showView == 4 ? '#da8ee7' : null,
                      padding: 5,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      setShowView(4);
                    }}>
                    <View style={SpaceStyles.rowFlex}>
                      <Image
                        style={SpaceStyles.ImageStyleInTokenS}
                        source={alert}
                      />
                      <Text
                        style={[
                          TextStyles.textBold18,
                          SpaceStyles.left2,
                          {color: WHITE},
                        ]}>
                        Price Alert
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {showView === 1 ? (
                <View style={ViewStyles.textView2}>
                  <Text style={[TextStyles.textExtraBold24, {color: WHITE}]}>
                    Trending
                  </Text>
                  <FlatList
                    onScroll={() => {
                      Keyboard.dismiss();
                    }}
                    style={{top: 20}}
                    data={ArrayData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => {
                      return (
                        <View style={SpaceStyles.top2}>
                          <ActivityIndicator size={'large'} color={WHITE} />
                        </View>
                      );
                    }}
                  />
                </View>
              ) : null}
              {showView === 3 ? (
                <View style={ViewStyles.textView2}>
                  <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView onPress={Keyboard.dismiss}>
                      <Text
                        style={[TextStyles.textExtraBold24, {color: WHITE}]}>
                        Convert
                      </Text>
                      <View style={SpaceStyles.top2}>
                        <View
                          style={[
                            CommonStyles.swapContainer,
                            {backgroundColor: null},
                          ]}>
                          <View
                            style={[
                              SpaceStyles.alignSpaceBlock,
                              SpaceStyles.spaceHorizontal,
                              SpaceStyles.top2,
                            ]}>
                            <TouchableOpacity
                              onPress={() => {
                                // navigation.navigate('ViewTokens', {
                                //   id: 10,
                                // });

                                setShowModal(true);
                                setRowNumber(1);
                              }}>
                              <View style={SpaceStyles.rowFlex}>
                                <Image
                                  style={SpaceStyles.ImageStyleInTokenS}
                                  source={
                                    Data1 ? {uri: Data1.item.thumb} : null
                                  }
                                />
                                {Data1 ? (
                                  <View
                                    style={{
                                      marginLeft: 5,
                                    }}>
                                    <Text
                                      style={[
                                        TextStyles.textRegular20,
                                        {color: WHITE},
                                      ]}>
                                      {Data1.item.symbol}
                                    </Text>
                                    <Text
                                      style={[
                                        TextStyles.textRegular14,
                                        {color: GRAY},
                                      ]}>
                                      {Data1.item.name}
                                    </Text>
                                  </View>
                                ) : null}

                                <Text
                                  style={[
                                    TextStyles.textRegular20,
                                    SpaceStyles.left5,
                                    {color: WHITE},
                                  ]}>
                                  {Data1
                                    ? `$${Data1.price.toFixed(2)}   X`
                                    : 'Tap to Select the coin'}
                                </Text>
                              </View>
                            </TouchableOpacity>
                            {Data1 ? (
                              <TextInput
                                placeholder={'1'}
                                style={[TextStyles.textBold24, {color: WHITE}]}
                                placeholderTextColor={GRAY}
                                keyboardAppearance={'dark'}
                                keyboardType={'numeric'}
                                textAlign={'right'}
                                onChangeText={text => {
                                  // console.log("Text ", text);
                                  setOnChangePrice1(text);
                                }}
                                value={onChangePrice1}
                              />
                            ) : null}
                          </View>
                          <View
                            style={[
                              CommonStyles.lineView,
                              {borderBottomColor: LIGHT_GRAY},
                            ]}
                          />
                          <View
                            style={[
                              SpaceStyles.alignSpaceBlock,
                              SpaceStyles.spaceHorizontal,
                            ]}>
                            <Text
                              style={[TextStyles.textMedium14, {color: GRAY}]}>
                              To
                            </Text>
                          </View>
                          <View
                            style={[
                              SpaceStyles.alignSpaceBlock,
                              SpaceStyles.spaceHorizontal,
                              SpaceStyles.top2,
                            ]}>
                            <TouchableOpacity
                              onPress={() => {
                                setShowModal(true);
                                setRowNumber(2);
                              }}>
                              <View style={SpaceStyles.rowFlex}>
                                <Image
                                  style={SpaceStyles.ImageStyleInTokenS}
                                  source={
                                    Data2 ? {uri: Data2.item.thumb} : null
                                  }
                                />
                                {Data1 && Data2 ? (
                                  <View
                                    style={{
                                      marginLeft: 5,
                                    }}>
                                    <Text
                                      style={[
                                        TextStyles.textRegular20,
                                        {color: WHITE},
                                      ]}>
                                      {Data2.item.symbol}
                                    </Text>
                                    <Text
                                      style={[
                                        TextStyles.textRegular14,
                                        {color: GRAY},
                                      ]}>
                                      {Data2.item.name}
                                    </Text>
                                  </View>
                                ) : null}
                                {Data1 && !Data2 ? (
                                  <Text
                                    style={[
                                      TextStyles.textRegular20,
                                      SpaceStyles.left5,
                                      {color: WHITE},
                                    ]}>
                                    Tap to Select next the coin
                                  </Text>
                                ) : null}
                              </View>
                            </TouchableOpacity>
                            <TextInput
                              placeholder={
                                Data1 && Data2 ? `$${Data2?.price}` : null
                              }
                              style={[TextStyles.textSemiBold16, {color: WHITE}]}
                              placeholderTextColor={GRAY}
                              keyboardAppearance={'dark'}
                              // keyboardType={'numeric'}
                              textAlign={'right'}
                              editable={false}
                            />
                          </View>
                          {Data1 && Data2 ? (
                            <View
                              style={[
                                SpaceStyles.alignSpaceBlock,
                                SpaceStyles.spaceHorizontal,
                                SpaceStyles.top2,
                              ]}>
                              <Text
                                style={[
                                  TextStyles.textBold24,
                                  {color: GRAY},
                                ]}>
                                Total {Data2.item.symbol}
                              </Text>
                              <View style={SpaceStyles.rowFlex}>
                                <Text
                                  style={[
                                    TextStyles.textBold24,
                                    SpaceStyles.left2,
                                    {color: WHITE},
                                  ]}>
                                 ${totalPrice.toFixed(2)}
                                </Text>
                              </View>
                            </View>
                          ) : null}
                        </View>
                      </View>
                    </ScrollView>
                  </KeyboardAvoidingView>
                </View>
              ) : null}
              {showView === 4 ? (
                <View style={ViewStyles.textView2}>
                  <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView onPress={Keyboard.dismiss}>
                      <Text
                        style={[TextStyles.textExtraBold24, {color: WHITE}]}>
                        Price Alert
                      </Text>
                      <View style={SpaceStyles.top2}>
                        <View
                          style={[
                            CommonStyles.swapContainer,
                            {backgroundColor: null},
                          ]}>
                          <View
                            style={[
                              SpaceStyles.alignSpaceBlock,
                              SpaceStyles.spaceHorizontal,
                              SpaceStyles.top2,
                            ]}>
                            <TouchableOpacity>
                              <View>
                                <Text
                                  style={[
                                    TextStyles.textRegular15,
                                    SpaceStyles.center,
                                    {color: WHITE},
                                  ]}>
                                  Tap to login and then make price alert!
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </KeyboardAvoidingView>
                </View>
              ) : null}
            </>
          )}
          data={[]}
          renderItem={() => <View />}
        />
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <ViewTokens
            rowNumber={rowNumber}
            onSelectedItem1={async e => {
              setShowModal(false);
              setData1(e);
              console.log('1-> ', e.price);
              setData1Price(e.price);
            }}
            onSelectedItem2={async e => {
              setShowModal(false);
              setData2(e);
              console.log('2-> ', e.price);
              setData2Price(e.price);
              setOnChangePrice1(1);
            }}
          />
        </Modal>
      </View>
    </DismissKeyboard>
  );
}
