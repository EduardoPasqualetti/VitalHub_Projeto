import { ActivityIndicator, Alert, Modal } from "react-native"
import { ContentModal, TextData, TitleData, ViewData, ViewModal } from "./Style"
import { ButtonTitle, SubTitleModalResume, TitleProfile } from "../Title/Style"
import { LinkCancelMargin } from "../Link/Style"
import { Btn } from "../Button/Button"

import * as Notifications from "expo-notifications"
import { useEffect, useState } from "react"
import api from "../../service/Service"
import { UserDecodeToken } from "../../Utils/Auth/auth"
import moment from 'moment'

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
    const [spinner, setSpinner] = useState(false);

    const handleCallNotifications = async () => {

        const { status } = await Notifications.getPermissionsAsync()

        if (status !== "granted") {
            Alert.alert("Voce nao permitiu as notificacoes estarem ativas")
            return
        }

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
        console.log(token.jti);
    }

    async function onPressConfirm() {
        setSpinner(true)
        try {
            const response = await api.post('/Consultas/Cadastrar', {
                situacaoId: 'E4356B3C-3FA0-496B-85BD-4E8C493F2D2C',
                pacienteId: idPaciente,
                medicoClinicaId: dadosAgendamento.medicoId,
                prioridadeId: dadosAgendamento.prioridadeId,
                dataConsulta: `${dataConsulta}T${horarioConsulta}:00.000Z`

            })
            if (response) {
                await setShowModalResume(false)
                navigation.replace("Main")
                handleCallNotifications()
            }

        } catch (error) {
            Alert.alert('Erro ao Cadastrar a consulta')
        }
        setSpinner(false)
    }

    useEffect(() => {
        profileLoad()
    }, [])

    function formatarData(data) {
        return moment(data).format('DD/MM/YYYY');
    }

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade" animationsOutTiming={0}>
            <ViewModal>
                <ContentModal>
                    <TitleProfile>Agendar Consulta</TitleProfile>

                    <SubTitleModalResume>Consulte os dados selecionados para a sua consulta</SubTitleModalResume>

                    <ViewData fieldHeight={50}>
                        <TitleData>Data da consulta</TitleData>
                        <TextData>{formatarData(dataConsulta)} {horarioConsulta}</TextData>
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
                    <Btn disabled={spinner} onPress={() => { onPressConfirm() }}>
                        {
                            spinner ? (<ActivityIndicator size="small" color="#ffffff" />) : <ButtonTitle>CONFIRMAR</ButtonTitle>
                        }
                    </Btn>
                    <LinkCancelMargin onPress={() => setShowModalResume(false)}>Cancelar</LinkCancelMargin>
                </ContentModal>
            </ViewModal>
        </Modal>
    )
}