import { Text } from '@rneui/base';
import { Card } from "@rneui/themed";
import { StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import { globalStyles } from '../styles/global';

export default function NoteItem({note, date, deleteHandler, item}) {
  return (
   <TouchableOpacity onPress={deleteHandler(item.key)}>
   <Card>
        <Text style={globalStyles.h2Style}>{date}</Text>
        <Text style={globalStyles.h1Style} >{note}</Text>
    </Card>
    </TouchableOpacity>
  )
}