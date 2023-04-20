import {Card} from '@rneui/base';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {weatherState} from './weather-atoms';

export default function CurrentWeather() {
  const weatherValue = useRecoilValue(weatherState);

  if (!weatherValue) {
    return (
      <View>
        <Text>Unable to retreive any current weather</Text>
      </View>
    );
  }
  return (
    <View>
      <Card>
        <Card.Title>Current Weather</Card.Title>
        <View style={weatherStylesheet.cardMain}>
          <Text>Temp</Text>
          <Text>
            {weatherValue.report.temperature.amount}{' '}
            {weatherValue.report.temperature.units}
          </Text>
        </View>
      </Card>
    </View>
  );
}

const weatherStylesheet = StyleSheet.create({
  cardMain: {
    alignItems: 'center',
  },
});
