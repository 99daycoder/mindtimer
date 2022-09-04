import { Text } from '@rneui/base';
import { Card } from "@rneui/themed";
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function NoteItem({ note, deleteHandler }) {
  return (

    <Card style={globalStyles.row}>
      <View style={globalStyles.cardRow}>
      <Text style={globalStyles.h2Style}>{note.date}</Text>
      <Text style={globalStyles.h1Style}>{note.item}</Text>
      <TouchableOpacity onPress={() => deleteHandler(note.key)}>
        <Ionicons name={'trash'} size={30}/>
      </TouchableOpacity>
      
      
      </View>
    </Card>
  )
}