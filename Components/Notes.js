import { Input, Button} from '@rneui/base';
import { Card } from "@rneui/themed";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Image, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteItem from './NoteItem';
import { useState } from 'react';

export default function Notes({route, navigation}) {

  const [inputValue, setInputValue]= useState()
  const [notes, setNotes] = useState([{item:'Eating a banana', date:''}, {item:'Eating chips', date:''},{item:'Creating presentation', date:''}])

  const simpleNoteHandler = () => {
    setNotes([...notes, {item:inputValue}])
    console.log('this is simple note handler...')
    
  };
  const [alertsPerHour, setAlertsPerHour] = useState(0)
  //Today's date
  var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
 
      //Alert.alert(date + '-' + month + '-' + year);
      // You can turn it in to your desired format
      const todaysDate =  date + '-' + month + '-' + year;//format: d-m-y;

  console.log(notes[0].item)
  return (
    <View style={styles.container}>
      <Text style={styles.h1Style}> Your Alert is set to {route.params.alertsPerHour} </Text>
      <Card.Title>What you've been up to today</Card.Title>
     <View style={styles.addNotes}><TextInput style={styles.addNotesText} placeholder='What were you doing now?' onChangeText={newText => setInputValue(newText)}></TextInput> 
      <Button style={styles.addNotesButton} title="Add Item" onPress={simpleNoteHandler}/></View> 
        <Card.Divider/>
        <View style={styles.currentNotes}>
         {notes.map((item, i)=>
     <NoteItem key={i} note={item.item} date={todaysDate} />
      
     )}
         </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
   
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
  paddingRight:20,
paddingLeft:30,
    justifyContent: 'space-between',

  },
  addNotesText: {
   
    },
  addNotesButton: {
      
      },
currentNotes:{
  position:"relative",
  alignItems:"left",
  marginLeft: 15,
},
});

