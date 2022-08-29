import { Button, Input, Card } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { View, Alert, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Home({ navigation }) {
  let id = useRef()
  let input = useRef()

  const startAlertHandler = () => {
    input.current.clear();
    Keyboard.dismiss();

    id.current = setInterval(function () {
      Alert.alert(`Please Log your activity!!`);
      navigation.navigate('Notes')
    }, inputValue * 1000);

  }
  const stopAlertHandler = () => {
    clearInterval(id.current)
    setAlertsPerHour(0)
  }

  const [alertsPerHour, setAlertsPerHour] = useState(0)
  const [inputValue, setInputValue] = useState(0)

  return (
    <View style={globalStyles.container}>
      <Input
        ref={input}
        placeholder='How Many Alerts Per Second?'
        onEndEditing={() => setAlertsPerHour(inputValue)}
        onChangeText={newText => setInputValue(newText)} />
      <StatusBar style="auto" />
      {(alertsPerHour > 0) ?
        <Card.Title>You are currently seeing alerts every {alertsPerHour} seconds</Card.Title>
        :
        <Card.Title>Your alerts are currently off</Card.Title>}
      <Button
        title="Start Alerts"
        onPress={startAlertHandler}
        buttonStyle={globalStyles.button} />
      <Button
        title="Stop Alerts"
        onPress={stopAlertHandler}
        buttonStyle={globalStyles.button} />
    </View>
  );
}


