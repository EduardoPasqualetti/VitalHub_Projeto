import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';

export default function InputSelect({ textButton = '', setSelectedTime = null}) {
  const dataAtual = moment().format('YYYY-MM-DD');
  const [arrayOptions, setArrayOptions] = useState(null)

  function LoadOptions(){
    // Conferir quantas horas faltam ate 00h
    const horasRestantes = moment(dataAtual).add(24, 'hours').diff(moment(), 'hours')

    // Criar um laco que rode a quantidade de horas que faltam
    const options = Array.from({length : horasRestantes}, (_, index) => {
      let valor = new Date().getHours() + (index + 1);

      return `${valor}:00`
    })
    // Devolver para cada hora, uma nova opcao no select
    setArrayOptions(options)
  }

  useEffect(() => {
    LoadOptions();
  }, [])

  return (
    <View>
      {
        arrayOptions != null ? (
        <SelectDropdown 
          data={arrayOptions}
          defaultButtonText={textButton}
          onSelect={( index) => {
            setSelectedTime(index);
          }}  
          buttonStyle={styles.button}
          buttonTextStyle={styles.buttonText}
          renderDropdownIcon={() => <AntDesign name="caretdown" size={22} color="#34898F" />}
      /> ) : (
        <></>
      )
      }
      
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