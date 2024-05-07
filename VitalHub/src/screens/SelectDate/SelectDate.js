
import { useEffect, useState } from "react";
import FullCalender from "../../components/CalendarSelectDate/CalendarSelectDate";
import { ContainerSelectDate } from "../../components/Container/Style"
import { Title } from "../SelectClinic/Style"
import { ButtonTitle, LabelSchedule } from "../../components/Title/Style";
import { BtnFull } from "../../components/Button/Button";
import { LinkCancelMargin } from "../../components/Link/Style";
import InputSelect from "../../components/InputSelect/InputSelect";
import { ModalResumeAppointment } from "../../components/ModalResumeAppointment/ModalResumeAppointment";
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule";

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
        console.log(route)
        if (selectedDate == null || selectedTime == null) {
            alert("Necessario selecionar dia e horario da consulta")
        } else
            setShowModalResume(true)
    }


    return (

        <ContainerSelectDate>
            <Title>Selecionar Data</Title>
            <FullCalender
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <LabelSchedule>Selecione um horário disponível</LabelSchedule>

            <InputSelect
                textButton='Selecionar horário'
                setSelectedTime={setSelectedTime}
            />

            <BtnFull onPress={() => onPressContinue()} >
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

            <LinkCancelMargin onPress={() => onPressCancel()}>Cancelar</LinkCancelMargin>
        </ContainerSelectDate>
    )
}