import { Text } from '@rneui/base';
import { Card } from "@rneui/themed";
import { StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';

export default function NoteItem({note, deleteHandler}) {
  return (
   <TouchableOpacity onPress={() => deleteHandler(note.key)}>
   <Card>
        <Text style={globalStyles.h2Style}>{note.date}</Text>
        <Text style={globalStyles.h1Style}>{note.item}</Text>
    </Card>
    </TouchableOpacity>
  )
}