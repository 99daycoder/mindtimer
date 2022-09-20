import { Input, Button } from '@rneui/base';
import { Card } from "@rneui/themed";
import { View, Keyboard, FlatList } from 'react-native';
import NoteItem from './NoteItem';
import { useState, useRef, useEffect } from 'react';
import { globalStyles } from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notes() {
  let input = useRef()
  const [inputValue, setInputValue] = useState()
  const [notes, setNotes] = useState()

  

    useEffect(() => {
      (!notes)? setNotes([]) : null
     getData()
    }, [])

    useEffect(() => {
      storeData(notes)  
    }, [notes])

    // Store notes to local storage
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@storage_Key', jsonValue)
      } catch (e) {
        // saving error
      }
    }
  // Get value of notes
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      console.log('JSON_VALUE is..', jsonValue )
      console.log('local storage is..', jsonValue.length )
     
       setNotes(JSON.parse(jsonValue)) 
    } catch(e) {
      // error reading value
    }
  }
  const simpleNoteHandler = () => {
    //Today's date
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    // You can turn it in to your desired format
    const todaysDate = date + '-' + month + '-' + year;//format: d-m-y;
    setNotes([...notes, { item: inputValue, date: todaysDate, key: Math.random().toString(4) }])
    input.current.clear();
    Keyboard.dismiss();
  }

  function deleteHandler(key) {
    setNotes(notes.filter(note => note.key != key))
  }

  return (
    <View style={globalStyles.container}>
      <Card.Title>What you've been up to today</Card.Title>
      <View style={globalStyles.row}>
        <Input
          ref={input}
          containerStyle={{ width: '70%' }}
          style={globalStyles.inputRow}
          placeholder='Enter what your doing?'
          onChangeText={newText => setInputValue(newText)}>
        </Input>
        <Button title="Add Item" onPress={simpleNoteHandler} buttonStyle={globalStyles.buttonRow} /></View>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <NoteItem deleteHandler={deleteHandler} note={item} />
        )}
      />
    </View>
  );
}


