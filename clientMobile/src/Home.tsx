import React, {useState} from 'react';
import {Button, Text} from '@rneui/themed';
import CurrentWeather from './CurrentWeather';
import {useRecoilState} from 'recoil';
import {weatherState} from './weather-atoms';
import {WEATHER_API} from './api-contracts';
import {Input} from '@rneui/base';
import {ScrollView, SafeAreaView, View, StyleSheet} from 'react-native';

export function Home() {
  const [error, setError] = useState('');
  const [, setWeatherAtom] = useRecoilState(weatherState);
  const styles = getStyles(error !== '');
  // const addrRef = useRef<Input>(null);
  const [postCode, setPostCode] = useState<string>('');

  const changePostCode = (text: string) => {
    setPostCode(text);
  };

  const loadInfo = async () => {
    try {
      if (postCode.length > 5) {
        setError('');
        // const postCode = addrRef.current.props.value ?? '';
        const url = WEATHER_API.replace('${postCode}', postCode);
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        setWeatherAtom(data);
      } else {
        setError('Must be full post code');
      }
    } catch (err) {
      setError('Unable to retreive information');
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.contentView}>
        <Text style={styles.subHeader}>Basic Buttons</Text>
        <View style={styles.buttonsContainer}>
          <Input
            placeholder="Enter postcode"
            onChangeText={changePostCode}
            leftIcon={{type: 'font-awesome', name: 'address-card'}}
          />
          <Button
            title={'Get weather'}
            containerStyle={styles.cta}
            onPress={loadInfo}
          />
        </View>
        <View style={styles.errorPanel}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <CurrentWeather />
      </SafeAreaView>
    </ScrollView>
  );
}

function getStyles(isError: boolean) {
  return StyleSheet.create({
    contentView: {
      flex: 1,
      padding: 20,
    },
    buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 20,
    },
    subHeader: {
      // backgroundColor: '#2089dc',
      color: 'white',
      textAlign: 'center',
      paddingVertical: 5,
      marginBottom: 10,
    },
    cta: {
      width: 200,
      marginHorizontal: 50,
      marginVertical: 10,
    },
    errorPanel: {
      display: isError ? 'flex' : 'none',
      borderRadius: 7.5,
      padding: 15,
      backgroundColor: '#ff3333',
    },
    errorText: {
      color: '#ffffff',
      opacity: 0.7,
      // padding: 15,
    },
  });
}
