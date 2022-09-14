import { Button, Input, Card } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { globalStyles } from "../styles/global";
import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';
import Slider from '@react-native-community/slider';


export default function Home({ navigation }) {
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        navigation.navigate("Notes");
      }
    );
    return () => subscription.remove();
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const [alertsPerHour, setAlertsPerHour] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [expoPushToken, setExpoPushToken] = useState('');
  
  const startAlertHandler = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "MindTimer Notification",
        body: "Please log your activity",
        data: { data: "goes here" },
      },
      trigger: { seconds: parseInt(inputValue), repeats: true },
    });
  };
  const stopAlertHandler = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setAlertsPerHour(0);
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <StatusBar style="auto" />
        {alertsPerHour > 0 ? (
          <Card.Title>
            You are currently seeing alerts every {alertsPerHour} seconds
          </Card.Title>
        ) : (
          <Card.Title>Your alerts are currently off</Card.Title>
        )}
        <Slider
          style={{ width: 200, height: 40 }}
          onSlidingComplete={() => setAlertsPerHour(inputValue)}
          onValueChange={(newText) => setInputValue(newText)}
          minimumValue={10}
          maximumValue={70}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          step={10}
        />
        <Button
          title="Start Alerts"
          onPress={startAlertHandler}
          buttonStyle={globalStyles.button}
        />
        <Button
          title="Stop Alerts"
          onPress={stopAlertHandler}
          buttonStyle={globalStyles.button}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
