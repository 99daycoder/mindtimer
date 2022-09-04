import { Text } from '@rneui/base';
import { Card } from "@rneui/themed";
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';

export default function NoteItem({ note, deleteHandler }) {
  return (
    <Card>
      <TouchableOpacity onPress={() => deleteHandler(note.key)}>
        <Ionicons name={'trash'} size={30}/>
      </TouchableOpacity>
      <Text style={globalStyles.h2Style}>{note.date}</Text>
      <Text style={globalStyles.h1Style}>{note.item}</Text>
    </Card>
  )
}