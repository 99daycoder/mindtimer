import { Button, Text, Input} from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './Notes';


export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <View><Text style={styles.h1Style}>Random Bells per hour?</Text>
      <Input
      placeholder='How Many Alerts / Hour?'/>
      </View>
      <StatusBar style="auto" />
      <Button onPress={() => navigation.navigate('Notes')} >Start Timer</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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

