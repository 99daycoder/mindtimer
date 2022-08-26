import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, Input} from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

export default function Home({navigation}) {

  const simpleAlertHandler = () => {
    setAlertsPerHour(inputValue)
    //function to make simple alert
    Alert.alert(`Hello your alerts are set!`);
    navigation.navigate('Notes',{alertsPerHour} )
    //push to a new page here
  };
  const [alertsPerHour, setAlertsPerHour] = useState(0)
  const [inputValue, setInputValue]= useState(0)

  return (
    <View style={styles.container}>
      <Input
      placeholder='How Many Alerts Per Hour?'onChangeText={newText => setInputValue(newText)}/>
      <StatusBar style="auto" />
      <Text>{alertsPerHour}</Text>
      <Button onPress={simpleAlertHandler}>Start Alerts</Button>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '80%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


  h1Style: {
    
    fontWeight: '300',
    color:'red'
  },
  h2Style: {
    
    fontWeight: '100',
  },
  h3Style: {
    
    fontWeight: '500',
  },
});

