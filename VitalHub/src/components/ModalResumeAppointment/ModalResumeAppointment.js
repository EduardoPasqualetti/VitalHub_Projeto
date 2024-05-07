import { Modal } from "react-native"
import { ContentModal, TextData, TitleData, ViewData, ViewModal } from "./Style"
import { ButtonTitle, SubTitleModalResume, TitleProfile } from "../Title/Style"
import { LinkCancelMargin } from "../Link/Style"
import { Btn } from "../Button/Button"

import * as Notifications from "expo-notifications"
import { useEffect, useState } from "react"
import api from "../../service/Service"
import { UserDecodeToken } from "../../Utils/Auth/auth"

Notifications.requestPermissionsAsync()


Notifications.setNotificationHandler({
    handleNotification: async () => ({

        shouldShowAlert: true,

        shouldPlaySound: true,

        shouldSetBadge: false
    })
})

export const ModalResumeAppointment = ({ dadosAgendamento, dataConsulta, horarioConsulta, navigation, visible, setShowModalResume, ...rest }) => {
    const [idPaciente, setIdPaciente] = useState()

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

    async function profileLoad() {
        const token = await UserDecodeToken();

        setIdPaciente(token.jti)
        // console.log(token.jti);
    }
    
    async function onPressConfirm() {
        try {
            console.log("rodou");
            const response = await api.post('/Consultas/Cadastrar', { 
                situacaoId: 'C1D85201-F0E6-4302-8FF3-F8F36F9FFAC3',    
                pacienteId: idPaciente,
                medicoClinicaId: dadosAgendamento.medicoClinicaId,
                prioridadeId: dadosAgendamento.prioridadeId,
                dataConsulta: `${dataConsulta}T${horarioConsulta}:00.000Z`
            }) 
            if (response) {
                await setShowModalResume(true)
                navigation.replace("Main")
                handleCallNotifications()
            }

        } catch (error) {
            console.log(error + ' erro na função onPressConfirm()');
        }
    }

    useEffect(() => {
        profileLoad()
    }, [])

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade" animationsOutTiming={0}>
            <ViewModal>
                <ContentModal>
                    <TitleProfile>Agendar Consulta</TitleProfile>

                    <SubTitleModalResume>Consulte os dados selecionados para a sua consulta</SubTitleModalResume>

                    <ViewData fieldHeight={50}>
                        <TitleData>Data da consulta</TitleData>
                        <TextData>{dataConsulta} - {horarioConsulta}</TextData>
                    </ViewData>
                    <ViewData fieldHeight={80}>
                        <TitleData>Médico(a) da consulta</TitleData>
                        <TextData>{dadosAgendamento.medicoLabel}</TextData>
                        <TextData>{dadosAgendamento.especialidade}</TextData>
                    </ViewData>
                    <ViewData fieldHeight={50}>
                        <TitleData>Local da consulta</TitleData>
                        <TextData>{dadosAgendamento.localizacao}</TextData>
                    </ViewData>
                    <ViewData fieldHeight={50}>
                        <TitleData>Tipo da consulta</TitleData>
                        <TextData>{dadosAgendamento.prioridadeLabel}</TextData>
                    </ViewData>
                    <Btn >
                        <ButtonTitle onPress={() => onPressConfirm()}>CONFIRMAR</ButtonTitle>
                    </Btn>

                    <LinkCancelMargin onPress={() => setShowModalResume(false)}>Cancelar</LinkCancelMargin>
                </ContentModal>
            </ViewModal>
        </Modal>
    )
}