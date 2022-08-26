import { Text, Input} from '@rneui/base';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function NoteItem({note}) {
  return (
    <View>
        <Text>{note}</Text>
    </View>
  )
}
