import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  row: {
    display: "flex",
    flexDirection: 'row',

  },
  inputRow: {
    width: '50%',
  },
  h1Style: {
    fontFamily: 'nunito-bold',
    fontWeight: '300',
    padding: 2
  },
  h2Style: {
    fontFamily: 'nunito-regular',
    fontWeight: '100',
    textDecorationLine: 'underline',
    padding: 2
  },
  h3Style: {
    fontFamily: 'nunito-regular',
    fontWeight: '500',
    padding: 2
  },
  button: {
    backgroundColor: 'rgba(78, 116, 289, 1)',
    borderRadius: 3,
    marginVertical: 10,
    marginHorizontal: 50,
  },
  buttonRow: {
    backgroundColor: 'rgba(78, 116, 289, 1)',
    borderRadius: 3,
  },
  cardRow: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  sliderContainer:{
    jdisplay: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});