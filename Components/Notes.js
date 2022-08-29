import { Input, Button } from '@rneui/base';
import { Card } from "@rneui/themed";
import { View, Keyboard, FlatList } from 'react-native';
import NoteItem from './NoteItem';
import { useState, useRef } from 'react';
import { globalStyles } from '../styles/global';

export default function Notes() {

  let input = useRef()
  const [inputValue, setInputValue] = useState()
  const [notes, setNotes] = useState([{ item: 'Eating a banana', date: '' }, { item: 'Eating chips', date: '' }, { item: 'Creating presentation', date: '' }])

  const simpleNoteHandler = () => {
    setNotes([...notes, { item: inputValue }])
    input.current.clear();
    Keyboard.dismiss();
  };

  //Today's date
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  const todaysDate = date + '-' + month + '-' + year;//format: d-m-y;

  return (
    <View style={globalStyles.container}>
      <Card.Title>What you've been up to today</Card.Title>
      <View style={globalStyles.row}>
        <Input
          ref={input}
          containerStyle = {{ width: '70%' }}
          style={globalStyles.inputRow}
          placeholder='What were you doing now?'
          onChangeText={newText => setInputValue(newText)}>
        </Input>
        <Button title="Add Item" onPress={simpleNoteHandler} buttonStyle={globalStyles.buttonRow}/></View>
        <FlatList
              data={notes}
              renderItem={({ item }) => (
                <NoteItem key={todaysDate} note={item.item} date={todaysDate} />
              )}
            />
    </View>
  );
}


