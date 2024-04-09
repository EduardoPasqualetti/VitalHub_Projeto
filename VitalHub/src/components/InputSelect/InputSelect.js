import React from 'react';
import { StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';

export default function InputSelect({ textButton = '', handleSelectedFn = null, data}) {
  return (
    <View>
      
      <SelectDropdown 
          data={data}
          defaultButtonText={textButton}
          onSelect={( index) => {
              handleSelectedFn(index);
          }}  
          buttonStyle={styles.button}
          buttonTextStyle={styles.buttonText}
          renderDropdownIcon={() => <AntDesign name="caretdown" size={22} color="#34898F" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderRadius: 7,
    borderColor: '#60BFC5',
    borderWidth: 2,
    width: '100%',
    height: 60,
    paddingLeft: 16,
    paddingRight: 10
  },
  buttonText: {
    color: '#34898F',
    fontSize: 17,
    fontFamily: 'MontserratAlternates_600SemiBold',
    textAlign: 'left',
  }
});