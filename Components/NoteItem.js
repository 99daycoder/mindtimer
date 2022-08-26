import { Text, Input} from '@rneui/base';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function NoteItem({note, date}) {
  return (
    <View>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.note} >{note}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  note:{
    fontWeight: '500',
    marginBottom: 10,
  },
  date: {
    textDecorationLine: 'underline'
  },
});