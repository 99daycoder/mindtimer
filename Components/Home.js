import { Button, Input, Card } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';
import { View, Alert, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Home({ navigation }) {
  let input = useRef()
  const [alertsPerHour, setAlertsPerHour] = useState(0)
  const [inputValue, setInputValue] = useState(0)

  async function scheduleAndCancel() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'MindTimer Notification',
        body: "Please log your activity",
        data: { data: 'goes here' }
      },
      trigger: { seconds: parseInt(inputValue), repeats: true },
    });

  }

  const startAlertHandler = () => {
    input.current.clear();
    Keyboard.dismiss();

    // Alert.alert(`Please Log your activity!!`);
    scheduleAndCancel()
    // navigation.navigate('Notes')

  }
  const stopAlertHandler = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setAlertsPerHour(0)
  }

  return (
    <View style={globalStyles.container}>
      <Input
        ref={input}
        placeholder='How Many Seconds Between Alerts?'
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


