import * as React from 'react';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from './Routes/bottomNav'

const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf')
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <BottomNav />
    </NavigationContainer>
  );
}

export default App;