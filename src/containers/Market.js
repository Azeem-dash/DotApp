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
  NIGHT,
} from '../constants/Colors';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';
import ViewStyles from '../styles/ViewStyles';
import {Calculator, trending, fav} from '../constants/Images';
import TextStyles from '../styles/TextStyles';
import CommonStyles from '../styles/CommonStyles';
import SpaceStyles from '../styles/SpaceStyles';
import ViewTokens from '../components/viewTokens';
import constants, {ThemeContext} from '../constants';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import MarketDown from 'react-native-vector-icons/Feather';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function Market({navigation, route}) {
  const sliderWidth = constants.BaseStyle.DEVICE_WIDTH;
  const theCurrentDay = new Date();
  const [marketStatus, setmarketStatus] = useState();
  const [index, setIndex] = useState(0);
  const [ArrayData, setArrayData] = useState([]);
  const [showView, setShowView] = useState(1);
  useEffect(() => {
    OnGetdata();
  }, []);
  const OnGetdata = async () => {
    let res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   firstParam: 'yourValue',
        // }),
      },
    )
      .then(async res => {
        let json = await res.json();
        // console.log(json);

        setArrayData(json);
      })
      .catch(err => {
        // setShowError('Not Found');
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

  const renderItem = ({item}) => {
    let priceColor =
      item.price_change_percentage_7d_in_currency == 0
        ? WHITE
        : item.price_change_percentage_7d_in_currency > 0
        ? GREEN
        : RED;
    return (
      <TouchableOpacity>
        <View style={CommonStyles.TokenViewFlatlist}>
          <View>
            <Image
              style={{
                height: 35,
                width: 35,
                justifyContent: 'center',
                // alignSelf: 'center',
                alignContent: 'center',
              }}
              source={{uri: item.image}}
            />
          </View>

          <View
            style={{
              marginLeft: 5,
            }}>
            <Text style={[TextStyles.textRegular20, {color: WHITE}]}>
              {item.name.toUpperCase()}
            </Text>
            <Text style={[TextStyles.textRegular14, {color: GRAY}]}>
              {item.symbol.toUpperCase()}
            </Text>

            <Text style={[TextStyles.textRegular14, {color: priceColor}]}>
              {item.price_change_percentage_24h == 0 ? (
                <Text>0</Text>
              ) : item.price_change_percentage_24h > 0 ? (
                <MarketDown
                  size={15}
                  color={priceColor}
                  name={'arrow-up-right'}
                />
              ) : (
                <MarketDown
                  size={15}
                  color={priceColor}
                  name={'arrow-down-right'}
                />
              )}
              {item.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
          <View>
            <LineChart
              withHorizontalLabels={false}
              withVerticalLabels={false}
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
              data={{
                datasets: [
                  {
                    data: item.sparkline_in_7d.price,
                  },
                ],
              }}
              width={90}
              height={60}
              chartConfig={{
                color: () => priceColor,
                backgroundGradientFrom: NIGHT,
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: NIGHT,
                backgroundGradientToOpacity: 0,
                // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2, // optional, def
              }}
              bezier
              style={{paddingRight: 0}}
            />
          </View>
          <View style={ViewStyles.market_cap_rank}>
            <Text style={ViewStyles.market_cap_rankPrice}>
              ${item.current_price.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={[CommonStyles.lineView, {borderBottomColor: WHITE}]} />
      </TouchableOpacity>
    );
  };
  return (
    <DismissKeyboard>
      <View style={ViewStyles.container}>
        <FlatList
          ListHeaderComponent={() => (
            <>
              <View style={CommonStyles.swapContainer}>
                <View
                  style={[
                    SpaceStyles.alignSpaceBlock,
                    SpaceStyles.spaceHorizontal,
                    SpaceStyles.top2,
                  ]}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: showView == 1 ? '#da8ee7' : null,
                      padding: 5,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      setShowView(1);
                    }}>
                    <View style={SpaceStyles.rowFlex}>
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
                        Top 100
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: showView == 2 ? '#da8ee7' : null,
                      padding: 5,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      setShowView(2);
                    }}>
                    <View style={SpaceStyles.rowFlex}>
                      <Image
                        style={[SpaceStyles.ImageStyleInTokenS, {width: 35}]}
                        source={fav}
                      />
                      <Text
                        style={[
                          TextStyles.textBold18,
                          SpaceStyles.left2,
                          {color: WHITE},
                        ]}>
                        Watchlist
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
              {showView === 2 ? (
                <View style={ViewStyles.textView2}>
                  <Text style={[TextStyles.textExtraBold24, {color: WHITE}]}>
                    Watchlist
                  </Text>
                  <View style={SpaceStyles.top2}>
                    <TouchableOpacity>
                      <View>
                        <Text
                          style={[
                            TextStyles.textRegular15,
                            SpaceStyles.center,
                            {color: WHITE},
                          ]}>
                          Tap to login and then add in Watchlist!
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </>
          )}
          data={[]}
          renderItem={() => <View />}
        />
      </View>
    </DismissKeyboard>
  );
}
