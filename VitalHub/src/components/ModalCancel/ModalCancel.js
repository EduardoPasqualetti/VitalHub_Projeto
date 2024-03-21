import { Modal } from "react-native"
import { ButtonTitle, TextRec, Title } from "../Title/Style"
import { Btn } from "../Button/Button"
import { LinkCancel } from "../Link/Style"
import { ContentModal, ViewModal } from "./Style"

// Importar a biblioteca
import * as Notifications from "expo-notifications"

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

export const ModalCancel = ({ visible, setShowModalCancel, ...rest }) => {

    // Funcao para lidar com a chamada da notificacao
  const handleCallNotifications = async () => {

    // Pega o status da permissao
    const { status } = await Notifications.getPermissionsAsync()

    // Verifica se o usuario concedeu a permissao para o uso de notificacoes
    if (status !== "granted") {
      alert("Voce nao permitiu as notificacoes estarem ativas")
      return
    }

    
    

    // obter o token de envio de notificacao
    // const token = await Notifications.getExpoPushTokenAsync()

    // Agendar uma notificacao para ser exibida apos 5 segundos
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
  }


    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <ViewModal>
                <ContentModal>
                    <Title>Cancelar consulta</Title>
                    <TextRec>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</TextRec>

                    <Btn onPress={() => onPressHandle()}>
                        <ButtonTitle>CONFIRMAR</ButtonTitle>
                    </Btn>

                    <LinkCancel onPress={() => setShowModalCancel(false)}>Cancelar</LinkCancel>
                </ContentModal>
            </ViewModal>
        </Modal>
    )
}

