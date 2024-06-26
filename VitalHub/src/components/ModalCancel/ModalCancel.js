import { ActivityIndicator, Alert, Modal } from "react-native"
import { ButtonTitle, TextRec, Title } from "../Title/Style"
import { Btn } from "../Button/Button"
import { LinkCancel } from "../Link/Style"
import { ContentModal, ViewModal } from "./Style"

// Importar a biblioteca
import * as Notifications from "expo-notifications"
import api from "../../service/Service"
import { useState } from "react"

// Solicitar as permissoes de notificacao ao iniciar o app
Notifications.requestPermissionsAsync()

// Como as notificacoes devem ser tratadas quando recebidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // Mostra o alerta quando a notificacao for recebida
    shouldShowAlert: true,
    // Reproduz ou nao o som ao receber a notificacao
    shouldPlaySound: true,


    // Configura o numero de notificacoes no icone do app
    shouldSetBadge: false
  })
})

export const ModalCancel = ({ idConsulta, visible, setShowModalCancel, ...rest }) => {
  const [spinner, setSpinner] = useState(false);

  const handleCallNotifications = async () => {

    const { status } = await Notifications.getPermissionsAsync()

    if (status !== "granted") {
      Alert.alert("Voce nao permitiu as notificacoes estarem ativas")
      return
    }


    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Consulta Cancelada",
        body: "Voce cancelou a consulta com sucesso",
        sound: true
      },
      trigger: {
        seconds: 1
      }
    })
  }

  async function onPressHandle() {
    handleCallNotifications(),
      setShowModalCancel(false)
    UpdateStatus()
  }


  async function UpdateStatus() {
    setSpinner(true)
    try {
      await api.put(`/Consultas/Status?idConsulta=${idConsulta}&status=Cancelados`)
    } catch (error) {
      Alert.alert("Erro ao cancelar a consulta")
    }
    setSpinner(false)
  }


  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      <ViewModal>
        <ContentModal>
          <Title>Cancelar consulta</Title>
          <TextRec>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</TextRec>

          <Btn disabled={spinner} onPress={() => onPressHandle()}>
            {
              spinner ? (<ActivityIndicator size="small" color="#ffffff" />) : <ButtonTitle>CONFIRMAR</ButtonTitle>
            }
          </Btn>

          <LinkCancel onPress={() => setShowModalCancel(false)}>Cancelar</LinkCancel>
        </ContentModal>
      </ViewModal>
    </Modal>
  )
}

