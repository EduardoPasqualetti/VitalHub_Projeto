import { Modal, Text } from "react-native"
import { BlueTitle, ContentModal,  RowContainerButton, TypeButton, SmallButton, TypeAppointment, ViewModal, InputAppointment } from "./Style"
import { ButtonTitle, LabelSchedule, Title, TitleProfile } from "../Title/Style"
import { useState } from "react"
import { Btn } from "../Button/Button"
import { LinkCancel } from "../Link/Style"


export const ModalSchedule = ({ navigation, visible, setShowModalSchedule , ...rest }) => {

  // const [showOptions, setShowOptions] = useState(false);
  // const [selectedOption, setSelectedOption] = useState('');

  // const opcoes = ['Pediatria', 'Clinico geral', 'Cardiologista'];

  // const onPressOption = (option) => {
  //   setSelectedOption(option);
  //   setShowOptions(false);
  // };s

  async function onPressHandle() {
    await setShowModalSchedule(false)
    navigation.replace("SelectClinic");
  }

  const[typeAppointment,setTypeAppointment] = useState(null)


  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade" animationsOutTiming={0}>
      
      <ViewModal>
        <ContentModal>
          <TitleProfile>Agendar consulta</TitleProfile>

          <TypeAppointment>

            {/* SELECIONAR QUAL O NIVEL DA CONSULTA */}
            <LabelSchedule>Qual o nível da consulta</LabelSchedule>
            <RowContainerButton>

              <SmallButton onPress={() => {setTypeAppointment("Rotina")}} isSelected={typeAppointment == "Rotina"}>
                <BlueTitle>Rotina</BlueTitle>
                </SmallButton>
              <SmallButton onPress={() => {setTypeAppointment("Exames")}} isSelected={typeAppointment == "Exames"}>
                <BlueTitle>Exames</BlueTitle>
                </SmallButton>
              <SmallButton onPress={() => {setTypeAppointment("Urgencia")}} isSelected={typeAppointment == "Urgencia"}>
                <BlueTitle>Urgencia</BlueTitle>
                </SmallButton>

            </RowContainerButton>

            {/* INFORMAR A LOCALIZACAO */}
            <LabelSchedule>Informe a localizacao desejada</LabelSchedule>
            <InputAppointment placeholder={"Informe a localizacao"}/>
            

          </TypeAppointment>
          <Btn onPress={() => {onPressHandle()}}>
            <ButtonTitle >CONTINUAR</ButtonTitle>
          </Btn>  

          <LinkCancel onPress={() => setShowModalSchedule(false)}>Cancelar</LinkCancel>

        </ContentModal>
      </ViewModal>
    </Modal>
  )
}
