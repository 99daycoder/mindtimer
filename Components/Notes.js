import { Text, Input, Button} from '@rneui/base';
import { Card } from "@rneui/themed";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteItem from './NoteItem';
import { useState } from 'react';



export default function Notes({route, navigation}) {

  const [inputValue, setInputValue]= useState()
  const [notes, setNotes] = useState(['Eating a banana', 'WC', 'Netflix', 'earting crisp', 'playing PS4'])

  const simpleNoteHandler = () => {
    setNotes([...notes, inputValue])
    
  };
  const [alertsPerHour, setAlertsPerHour] = useState(0)
  return (
    <View style={styles.container}>
      <Text style={styles.h1Style}> Your Alert is set to {route.params.alertsPerHour} </Text>
     <View style={styles.addNotes}><Input placeholder='What were you doing now?' onChangeText={newText => setInputValue(newText)}></Input> 
      <Button title="Add Item" onPress={simpleNoteHandler}/></View> 
      <Card.Title>What you've been up to</Card.Title>
        <Card.Divider/>
        <View style={{position:"relative",alignItems:"center"}}>
         
          {notes.map((item, i)=>
     <NoteItem key={i} note={item}/>
      
     )}
         </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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
  addNotes: {
  display: "flex",
  flexDirection: 'row',
  marginLeft: 20,
  maxWidth: '80%'

  }
});

