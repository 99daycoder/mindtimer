import { Button, Card } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { View, Keyboard, TouchableWithoutFeedback, Text } from "react-native";
import { Divider } from "@rneui/themed";
import { globalStyles } from "../styles/global";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Slider from "@react-native-community/slider";


export default function Home({ navigation }) {
  const [alertsPerHour, setAlertsPerHour] = useState(1);
  const [inputValue, setInputValue] = useState(1);

  const [buttonText, setButtonText] = useState("Start Timer");
  const [alertStatus, setAlertStatus] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [time, setTime] = useState([
    {
      stopHour: 24,
      stopMinute: 0,
    },
  ]);  
  
  // Listener that runs when notification is recieved
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        let date = new Date();
        if (
          date.getHours() * 60 + date.getMinutes() >= time.stopHour * 60 + time.stopMinute
        ) {
          stopAlertHandler();
        }
      }
    );
    return () => subscription.remove();
  }, [time]);

  //Listener that runs when notification is pressed
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
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

  const alertHandler = () => {
    if (alertStatus == true) {
      stopAlertHandler();
    } else {
      startAlertHandler();
    }
  };

  const startAlertHandler = async () => {
    setButtonText("Stop Timer");
    setAlertStatus(true);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "MindTimer Notification",
        body: "Please log your activity",
        sound: true,
      },
      trigger: { seconds: parseInt(3600/inputValue), repeats: true },
    });
  };
  const stopAlertHandler = async () => {
    setAlertStatus(false);
    setButtonText("Start Timer");
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
  let date = new Date();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <StatusBar style="auto" />
        <Text style={globalStyles.h1Style}>Stop Alerts:</Text>
        <View style={globalStyles.sliderContainer}>
            <Text>Hour:</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              onValueChange={(newText) =>
                setTime( {...time, stopHour: newText} )
              }
              minimumValue={date.getHours()+1}
              maximumValue={24}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              step={1}
            />
          <Text style={globalStyles.h1Style}>
            {time.stopHour}:{(time.stopMinute === 0)? "00" : time.stopMinute}
          </Text>
          </View>
        <View style={globalStyles.startTime}>
        </View>

        <Divider style={globalStyles.divider} />

        <Text style={globalStyles.h1Style}>Number of Random bells per hour</Text>
        <View style={globalStyles.sliderContainer}>
          <Slider
            style={{ width: 200, height: 40 }}
            onSlidingComplete={() => setAlertsPerHour(inputValue)}
            onValueChange={(newText) => setInputValue(newText)}
            minimumValue={1}
            maximumValue={6}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            step={1}
          />
          <Text style={globalStyles.h1Style}>{alertsPerHour} bells</Text>
        </View>
        <Button
          title={buttonText}
          onPress={alertHandler}
          buttonStyle={globalStyles.button}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
