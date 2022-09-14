import { Button, Card } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { View, Keyboard, TouchableWithoutFeedback, Text } from "react-native";
import { Divider } from "@rneui/themed";
import { globalStyles } from "../styles/global";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Slider from "@react-native-community/slider";
let date = new Date();
export default function Home({ navigation }) {
  const [alertsPerHour, setAlertsPerHour] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  const [buttonText, setButtonText] = useState("Start Timer");
  const [alertStatus, setAlertStatus] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState([
    {
      startHour: 10,
      startMinute: 0,
      endHour: 20,
      endMinute: 0,
    },
  ]);  
  
  // Listener that runs when notification is recieved
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Current time", date.getMinutes());
        console.log("this is time object", time);

        //if END time == 16:30
        if (
          date.getHours() < time.startHour &&
          date.getMinutes() < time.startMinute &&
          date.getHours() > time.endHour &&
          date.getMinutes() > time.endMinute
        ) {
          console.log("Stop the watch");
          stopAlertHandler();
        }
      }
    );
    return () => subscription.remove();
  }, []);

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
        data: { data: "goes here" },
      },
      trigger: { seconds: parseInt(inputValue), repeats: true },
    });
  };
  const stopAlertHandler = async () => {
    setAlertStatus(false);
    setButtonText("Start Timer");
    await Notifications.cancelAllScheduledNotificationsAsync();
    setAlertsPerHour(0);
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
      console.log(token);
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
        <Text>Start Time:</Text>
        <View style={globalStyles.sliderContainer}>
          <View style={globalStyles.clockElements}>
            <Text>Hour:</Text>
            <Slider
              style={{ width: 100, height: 40 }}
              onSlidingComplete={() => setAlertsPerHour(inputValue)}
              onValueChange={(newText) =>
                setTime({ ...time, startHour: newText })
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
                setTime({ ...time, startMinute: newText })
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
            {time.startHour}:{time.startMinute}
          </Text>
        </View>

        <Divider style={globalStyles.divider} />

        <Text>End Time:</Text>
        <View style={globalStyles.sliderContainer}>
          <View style={globalStyles.clockElements}>
            <Text>Hour:</Text>
            <Slider
              style={{ width: 100, height: 40 }}
              onSlidingComplete={() => setAlertsPerHour(inputValue)}
              onValueChange={(newText) =>
                setTime({ ...time, endHour: newText })
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
                setTime({ ...time, endMinute: newText })
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
            {time.endHour}:{time.endMinute}
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
