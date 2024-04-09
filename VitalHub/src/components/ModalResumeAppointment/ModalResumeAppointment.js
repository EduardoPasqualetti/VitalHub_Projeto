import { Modal } from "react-native"
import { ContentModal, TextData, TitleData, ViewData, ViewModal } from "./Style"
import { ButtonTitle, SubTitleModalResume, TitleProfile } from "../Title/Style"
import { LinkCancelMargin } from "../Link/Style"
import { Btn } from "../Button/Button"

import * as Notifications from "expo-notifications"

Notifications.requestPermissionsAsync()


Notifications.setNotificationHandler({
    handleNotification: async () => ({

        shouldShowAlert: true,

        shouldPlaySound: true,

        shouldSetBadge: false
    })
})

export const ModalResumeAppointment = ({ dataConsulta, horarioConsulta, navigation, visible, setShowModalResume, ...rest }) => {

    const handleCallNotifications = async () => {

        const { status } = await Notifications.getPermissionsAsync()

        if (status !== "granted") {
            alert("Voce nao permitiu as notificacoes estarem ativas")
            return
        }



        // const token = await Notifications.getExpoPushTokenAsync()g

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Consulta Agendada",
                body: "Sua consulta foi agendada com sucesso, podendo ser vizualizada em Agendadadas.",
                sound: true
            },
            trigger: {
                seconds: 1
            }
        })
    }


    async function onPressHandle() {
        await setShowModalResume(false)
        navigation.replace("Main")
        handleCallNotifications()
    }

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade" animationsOutTiming={0}>
            <ViewModal>
                <ContentModal>
                    <TitleProfile>Agendar Consulta</TitleProfile>

                    <SubTitleModalResume>Consulte os dados selecionados para a sua consulta</SubTitleModalResume>

                    <ViewData fieldHeight={50}>
                        <TitleData>Data da consulta</TitleData>
                        <TextData>{dataConsulta} {horarioConsulta}</TextData>
                    </ViewData>
                    <ViewData fieldHeight={80}>
                        <TitleData>Médico(a) da consulta</TitleData>
                        <TextData>Dra Alessandra</TextData>
                        <TextData>Demartologa, Esteticista</TextData>
                    </ViewData>
                    <ViewData fieldHeight={50}>
                        <TitleData>Local da consulta</TitleData>
                        <TextData>São Paulo, SP</TextData>
                    </ViewData>
                    <ViewData fieldHeight={50}>
                        <TitleData>Tipo da consulta</TitleData>
                        <TextData>Rotina</TextData>
                    </ViewData>
                    <Btn onPress={() => onPressHandle()}>
                        <ButtonTitle>CONFIRMAR</ButtonTitle>
                    </Btn>

                    <LinkCancelMargin onPress={() => setShowModalResume(false)}>Cancelar</LinkCancelMargin>
                </ContentModal>
            </ViewModal>
        </Modal>
    )
}