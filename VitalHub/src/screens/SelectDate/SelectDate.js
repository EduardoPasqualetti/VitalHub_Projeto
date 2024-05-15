import { useState } from "react";
import { Alert } from "react-native";
import { ContainerSelectDate } from "../../components/Container/Style"
import { Title } from "../SelectClinic/Style";
import FullCalender from "../../components/CalendarSelectDate/CalendarSelectDate";
import { ButtonTitle, LabelSchedule } from "../../components/Title/Style";
import { BtnFull } from "../../components/Button/Button";
import InputSelect from "../../components/InputSelect/InputSelect";
import { ModalResumeAppointment } from "../../components/ModalResumeAppointment/ModalResumeAppointment";
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule";
import { LinkCancel } from "../../components/Link/Style";


export const SelectDate = ({ navigation, route }) => {
    const [selectedDate, setSelectedDate] = useState();
    const [selectedTime, setSelectedTime] = useState();

    const [showModalResume, setShowModalResume] = useState(false)
    const [showModalSchedule, setShowModalSchedule] = useState(false)


    function onPressCancel() {
        setShowModalSchedule(true)
        navigation.navigate("Main");
    }

    function onPressContinue() {
        if (selectedDate == null || selectedTime == null) {
            Alert.alert("Necessario selecionar dia e horario da consulta")
        } else
            setShowModalResume(true)
    }


    return (
        <ContainerSelectDate>
            <Title>Selecionar Data</Title>
            <FullCalender
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate} />
            <LabelSchedule>Selecione um horário disponível</LabelSchedule>
            <InputSelect
                textButton='Selecionar horário'
                setSelectedTime={setSelectedTime}
            />
            <BtnFull onPress={() => onPressContinue()}>
                <ButtonTitle>CONFIRMAR</ButtonTitle>
            </BtnFull>
            <ModalResumeAppointment
                visible={showModalResume}
                navigation={navigation}
                setShowModalResume={setShowModalResume}
                dataConsulta={selectedDate}
                horarioConsulta={selectedTime}
                dadosAgendamento={route.params.agendamento}
            />

            <ModalSchedule
                visible={showModalSchedule}
                navigation={navigation}
                setShowModalSchedule={setShowModalSchedule}
            />
            <LinkCancel onPress={() => onPressCancel()}>Cancelar</LinkCancel>
        </ContainerSelectDate>
    )
}