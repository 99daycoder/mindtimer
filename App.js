import { Button, Text} from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1Style}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button>This is button</Button>
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

