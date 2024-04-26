import { Modal, Text } from "react-native"
import { BlueTitle, ContentModal, RowContainerButton, TypeButton, SmallButton, TypeAppointment, ViewModal, InputAppointment } from "./Style"
import { ButtonTitle, LabelSchedule, Title, TitleProfile } from "../Title/Style"
import { useEffect, useState } from "react"
import { Btn } from "../Button/Button"
import { LinkCancel } from "../Link/Style"


export const ModalSchedule = ({ navigation, visible, setShowModalSchedule, ...rest }) => {
  const [typeAppointment, setTypeAppointment] = useState()
  const [loc, setLoc] = useState()


  async function onPressHandle() {
    await setShowModalSchedule(false)
    navigation.replace("SelectClinic", {type: typeAppointment, loc: loc});

  }



  useEffect(() => {
    console.log(typeAppointment);
    console.log(loc);
  },[typeAppointment])


  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade" animationsOutTiming={0}>

      <ViewModal>
        <ContentModal>
          <TitleProfile>Agendar consulta</TitleProfile>

          <TypeAppointment>
            <LabelSchedule>Qual o nível da consulta</LabelSchedule>
            <RowContainerButton>

              <SmallButton onPress={() => { setTypeAppointment("Rotina") }} isSelected={typeAppointment == "Rotina"}>
                <BlueTitle>Rotina</BlueTitle>
              </SmallButton>
              <SmallButton onPress={() => { setTypeAppointment("Exames") }} isSelected={typeAppointment == "Exames"}>
                <BlueTitle>Exames</BlueTitle>
              </SmallButton>
              <SmallButton onPress={() => { setTypeAppointment("Urgencia") }} isSelected={typeAppointment == "Urgencia"}>
                <BlueTitle>Urgencia</BlueTitle>
              </SmallButton>

            </RowContainerButton>

            {/* INFORMAR A LOCALIZACAO */}
            <LabelSchedule>Informe a localizacao desejada</LabelSchedule>
            <InputAppointment placeholder={"Informe a localizacao"} onChangeText={setLoc}/>


          </TypeAppointment>
          <Btn onPress={() => { onPressHandle() }}>
            <ButtonTitle >CONTINUAR</ButtonTitle>
          </Btn>

          <LinkCancel onPress={() => setShowModalSchedule(false)}>Cancelar</LinkCancel>

        </ContentModal>
      </ViewModal>
    </Modal>
  )
}
