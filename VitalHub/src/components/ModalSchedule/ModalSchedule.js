import { Modal, Text } from "react-native"
import { BlueTitle, ContentModal, RowContainerButton, TypeButton, SmallButton, TypeAppointment, ViewModal, InputAppointment, BtnModal } from "./Style"
import { ButtonTitle, LabelSchedule, Title, TitleProfile } from "../Title/Style"
import { useEffect, useState } from "react"
import { LinkCancel } from "../Link/Style"
import { SelectList } from "react-native-dropdown-select-list"

export const ModalSchedule = ({ navigation, visible, setShowModalSchedule, city, ...rest }) => {

  const [agendamento, setAgendamento] = useState()

  async function onPressContinue() {
    if (agendamento == null) {
      alert("Informacoes necessarias")

    } else if (agendamento.localizacao == null || agendamento.prioridadeId == null) {
      alert("Informacoes necessarias")
    } else {
      await setShowModalSchedule(false)
      navigation.replace("SelectClinic", { agendamento: agendamento });
    }
  }

  function dePara(retornoApi) {
    if (city != null) {
      let arrayOptions = [];
      retornoApi.forEach((e) => {
        arrayOptions.push({ value: e.endereco.cidade });
      });

      return arrayOptions;
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

            <LabelSchedule>Informe a localizacao desejada</LabelSchedule>
            <SelectList
              boxStyles={{ width: "100%", height: 70, alignItems: "center", marginTop: 5, borderColor: '#60BFC5', borderWidth: 2 }}
              fontFamily="Quicksand_500Medium"
              searchPlaceholder="Pesquise"
              placeholder="Selecione uma cidade"
              maxHeight={100}
              dropdownStyles={{borderWidth: 2, borderColor: '#60BFC5'}}
              dropdownTextStyles={{ fontSize: 18, color: '#34898F'}}
              inputStyles={{ fontSize: 18, color: '#34898F' }}
              setSelected={(txt) => setAgendamento({
                ...agendamento,
                localizacao: txt
              })}
              notFoundText='Nenhum dado encontrado'
              data={dePara(city)}
              save="endereco.cidade"
              
            />


          </TypeAppointment>
          <BtnModal onPress={() => onPressContinue()}>
            <ButtonTitle >CONTINUAR</ButtonTitle>
          </BtnModal>

          <LinkCancel onPress={() => setShowModalSchedule(false)}>Cancelar</LinkCancel>

        </ContentModal>
      </ViewModal>
    </Modal>
  )
}
