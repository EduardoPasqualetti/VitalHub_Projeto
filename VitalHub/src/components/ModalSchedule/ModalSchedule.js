import { Modal, Text } from "react-native"
import { BlueTitle, ContentModal, RowContainerButton, TypeButton, SmallButton, TypeAppointment, ViewModal, InputAppointment } from "./Style"
import { ButtonTitle, LabelSchedule, Title, TitleProfile } from "../Title/Style"
import { useEffect, useState } from "react"
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

                prioridadeId: '1A97B012-4B63-403D-8E11-864EE1537E02',
                prioridadeLabel: 'Rotina'
              })} isSelected={agendamento ? agendamento.prioridadeLabel == "Rotina" : false}>
                <BlueTitle>Rotina</BlueTitle>
              </SmallButton>

              <SmallButton onPress={() => {
                setAgendamento({
                  ...agendamento,

                  prioridadeId: 'C568D663-7FAD-4696-896F-D0890D7BD1DA',
                  prioridadeLabel: 'Exames'
                })
              }} isSelected={agendamento ? agendamento.prioridadeLabel == "Exames" : false}>
                <BlueTitle>Exames</BlueTitle>
              </SmallButton>

              <SmallButton onPress={() => {
                setAgendamento({
                  ...agendamento,
                  prioridadeId: '6F9EDEB1-2CC7-4681-BE83-A377C0F3C8DE',
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
