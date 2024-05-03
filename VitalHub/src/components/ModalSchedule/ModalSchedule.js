import { Modal } from "react-native"
import { BlueTitle, ContentModal, RowContainerButton, SmallButton, TypeAppointment, ViewModal, InputAppointment } from "./Style"
import { ButtonTitle, LabelSchedule, Title, TitleProfile } from "../Title/Style"
import { useState } from "react"
import { Btn } from "../Button/Button"
import { LinkCancel } from "../Link/Style"


export const ModalSchedule = ({ navigation, visible, setShowModalSchedule, ...rest }) => {


  const [agendamento, setAgendamento] = useState()


  async function onPressContinue() {
    if (agendamento == null ) {
      alert("Informacoes necessarias")

    }else if(agendamento.localizacao == null || agendamento.prioridadeId == null){
      alert("Informacoes necessarias")
    } else {
      await setShowModalSchedule(false)
      navigation.replace("SelectClinic", { agendamento: agendamento });
    }
  }


  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade" animationsOutTiming={0}>

      <ViewModal>
        <ContentModal>
          <TitleProfile>Agendar consulta</TitleProfile>

          <TypeAppointment>
            <LabelSchedule>Qual o nível da consulta</LabelSchedule>
            <RowContainerButton>

              <SmallButton onPress={() => setAgendamento({
                ...agendamento,

                prioridadeId: '89925C39-3C30-4E9A-A14C-0B9201A98234',
                prioridadeLabel: 'Rotina'
              })} isSelected={agendamento ? agendamento.prioridadeLabel == "Rotina" : false}>
                <BlueTitle>Rotina</BlueTitle>
              </SmallButton>

              <SmallButton onPress={() => {
                setAgendamento({
                  ...agendamento,

                  prioridadeId: '58608199-2C20-4975-9B45-94623153F506',
                  prioridadeLabel: 'Exames'
                })
              }} isSelected={agendamento ? agendamento.prioridadeLabel == "Exames" : false}>
                <BlueTitle>Exames</BlueTitle>
              </SmallButton>

              <SmallButton onPress={() => {
                setAgendamento({
                  ...agendamento, // Manter todas as informacoes presentes no state

                  prioridadeId: 'DC9551A6-F632-44CF-9FCD-61959AA039D7',
                  prioridadeLabel: 'Urgencia'
                })
              }} isSelected={agendamento ? agendamento.prioridadeLabel == "Urgencia" : false}>
                <BlueTitle>Urgencia</BlueTitle>
              </SmallButton>

            </RowContainerButton>

            {/* INFORMAR A LOCALIZACAO */}
            <LabelSchedule>Informe a localizacao desejada</LabelSchedule>
            <InputAppointment placeholder={"Informe a localizacao"} value={agendamento ? agendamento.localizacao : null} onChangeText={(txt) => setAgendamento({
              ...agendamento,

              localizacao: txt
            })} />


          </TypeAppointment>
          <Btn onPress={() => onPressContinue()}>
            <ButtonTitle >CONTINUAR</ButtonTitle>
          </Btn>

          <LinkCancel onPress={() => setShowModalSchedule(false)}>Cancelar</LinkCancel>

        </ContentModal>
      </ViewModal>
    </Modal>
  )
}