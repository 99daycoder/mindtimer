import { Text } from '@rneui/base';
import { Card } from "@rneui/themed";
import { StyleSheet} from 'react-native';
import { globalStyles } from '../styles/global';

export default function NoteItem({note, date}) {
  return (
    <Card>
        <Text style={globalStyles.h2Style}>{date}</Text>
        <Text style={globalStyles.h1Style} >{note}</Text>
    </Card>
  )
}