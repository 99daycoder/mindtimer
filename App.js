import { Button, Text, Input} from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';



export default function App() {
  return (
    <View style={styles.container}>
      <View><Text style={styles.h1Style}>Random Bells per hour?</Text>
      <Input
      placeholder='How Many Alerts / Hour?'/>
      </View>
      <StatusBar style="auto" />
      <Button>Start Timer</Button>
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

