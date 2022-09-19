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
  const [alertsPerHour, setAlertsPerHour] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  const [buttonText, setButtonText] = useState("Start Timer");
  const [alertStatus, setAlertStatus] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [time, setTime] = useState([
    {
      stopHour: 10,
      stopMinute: 1,
    },
  ]);  
  
  // Listener that runs when notification is recieved
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        let date = new Date();
        console.log("time",date.getHours() * 60 + date.getMinutes(), "stop time",time.stopHour * 60 + time.stopMinute)
        if (
          date.getHours() * 60 + date.getMinutes() >= time.stopHour * 60 + time.stopMinute
        ) {
          console.log("stop")
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
        ios: { sound: true },
      },
      trigger: { seconds: parseInt(inputValue), repeats: true },
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <StatusBar style="auto" />
        <Text>Stop Alerts:</Text>
        <View style={globalStyles.sliderContainer}>
          <View style={globalStyles.clockElements}>
            <Text>Hour:</Text>
            <Slider
              style={{ width: 100, height: 40 }}
              onSlidingComplete={() => setAlertsPerHour(inputValue)}
              onValueChange={(newText) =>
                setTime( {...time, stopHour: newText} )
              }
              minimumValue={1}
              maximumValue={24}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              step={1}
            />
          </View>
          <View style={globalStyles.clockElements}>
            <Text>Minutes</Text>
            <Slider
              style={{ width: 100, height: 40 }}
              onSlidingComplete={() => setAlertsPerHour(inputValue)}
              onValueChange={(newText) =>
                setTime({ ...time, stopMinute: newText })
              }
              minimumValue={0}
              maximumValue={50}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              step={10}
            />
          </View>
        </View>
        <View style={globalStyles.startTime}>
          <Text>
            {time.stopHour}:{(time.stopMinute === 0)? "00" : time.stopMinute}
          </Text>
        </View>

        <Divider style={globalStyles.divider} />

        <Text>Number of Random bells per hour</Text>
        <View style={globalStyles.sliderContainer}>
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
          <Text>{alertsPerHour} seconds</Text>
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
