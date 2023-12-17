import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  WHITE,
  BLACK,
  GRAY,
  NIGHT,
  MODAL_BORDER_DARK,
  PURPLE_DARK,
} from '../constants/Colors';
import {ETH, USDC} from '../constants/Images';
import CommonStyles from '../styles/CommonStyles';
import SpaceStyles from '../styles/SpaceStyles';
import TextStyles from '../styles/TextStyles';
import ViewStyles from '../styles/ViewStyles';
import Search1 from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';
import constants from '../constants';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';

// Ionicons.loadFont();

export default function ViewTokens({
  navigation,
  onSelectedItem1,
  rowNumber,
  onSelectedItem2,
  props,
}) {
  const [ArrayData, setArrayData] = useState([]);
  const [searchText, setSearchText] = useState();
  const WIDTH = constants.BaseStyle.DEVICE_WIDTH;
  const [ShowError, setShowError] = useState(null);
  const [CoinData, setCoinData] = useState();
  const [PriceLoading, setPriceLoading] = useState(false);
  // console.log('rowNumber ', rowNumber);
  useEffect(() => {
    fectiondata('a');
    //     console.log(route.params);
  }, []);

  const fectiondata = async e => {
    let res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${e}`,
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
        // console.log(json.coins);

        setArrayData(json.coins);
      })
      .catch(err => {
        setShowError('Not Found');
      });
  };
  // const OnsearchText = async e => {
  //   //     console.log(e.toUpperCase());
  //   //     console.log(e.length);
  //   let letter = e.toUpperCase();
  //   ArrayData.forEach(e => {
  //     //       if (letter === e.symbol) console.log(e.symbol);
  //     if (e.symbol.includes(letter)) {
  //       console.log(e.symbol);
  //     }
  //     //     console.log(e.symbol.includes(letter));
  //   });
  // };
  const OnGetCoinDetial = async item => {
    if (rowNumber == 1 || rowNumber == 2) setPriceLoading(true);
    let res = await fetch(`https://api.coingecko.com/api/v3/coins/${item.id}`, {
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
        // console.log('here ->>>>>>>.  ', json.market_data.current_price.usd);
        if (rowNumber === 1) {
          return onSelectedItem1({
            item: item,
            price: json.market_data.current_price.usd,
          });
        } else if (rowNumber === 2) {
          return onSelectedItem2({
            item: item,
            price: json.market_data.current_price.usd,
          });
        }
      })
      .catch(err => {
        console.log('Not Found', err);
        return err;
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={PriceLoading ? 1 : 0}
      onPress={() => {
        if (!PriceLoading) OnGetCoinDetial(item);
      }}>
      <View style={CommonStyles.TokenViewFlatlist}>
        <Image
          style={{
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignSelf: 'center',
            alignContent: 'center',
          }}
          source={{uri: item.large}}
        />
        <View
          style={{
            marginLeft: 5,
          }}>
          <Text style={[TextStyles.textRegular20, {color: WHITE}]}>
            {item.symbol}
          </Text>
          <Text style={[TextStyles.textRegular14, {color: GRAY}]}>
            {item.name}
          </Text>
        </View>
        <Text style={ViewStyles.market_cap_rank}>#{item.market_cap_rank}</Text>
      </View>
      <View style={[CommonStyles.lineView, {borderBottomColor: WHITE}]} />
    </TouchableOpacity>
  );

  const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
  return (
    // <DismissKeyboard>
    <View style={ViewStyles.container}>
      <Back
        onPress={() => {
          if (rowNumber == 1) {
            return onSelectedItem1();
          }
          if (rowNumber == 2) {
            return onSelectedItem2();
          } else {
            navigation.goBack();
          }
        }}
        style={{position: 'absolute', top: 40, left: 10}}
        name={'chevron-back'}
        color={WHITE}
        size={26}
      />

      <View style={CommonStyles.TokenHeader}>
        <Search1 name={'search1'} color={BLACK} size={18} />
        <TextInput
          autoCorrect={false}
          onChangeText={e => {
            // OnsearchText(e);
            fectiondata(e);
            setSearchText(e);
          }}
          style={[
            TextStyles.textSemiBold16,
            SpaceStyles.left2,
            {color: BLACK, paddingRight: WIDTH - 150},
          ]}
          placeholder={'Try "ETH"'}
          placeholderTextColor={GRAY}
          keyboardAppearance={'dark'}
          value={searchText}
        />
      </View>
      <View style={CommonStyles.selectTokenView}>
        {PriceLoading ? (
          <ActivityIndicator
            size={'large'}
            color={BLACK}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              right: '50%',
              bottom: '50%',
              zIndex: 1,
            }}
          />
        ) : null}

        <FlatList
          onScroll={() => {
            Keyboard.dismiss();
          }}
          data={ArrayData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: PriceLoading ? '#626567' : null,
          }}
          ListEmptyComponent={() => {
            return (
              <View style={SpaceStyles.top2}>
                {ShowError ? (
                  <Text style={CommonStyles.errorShowStyle}>
                    "{searchText}" {ShowError}
                  </Text>
                ) : (
                  <ActivityIndicator size={'large'} color={WHITE} />
                )}
              </View>
            );
          }}
        />
      </View>
    </View>
    // </DismissKeyboard>
  );
}
