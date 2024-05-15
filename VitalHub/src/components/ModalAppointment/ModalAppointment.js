import { Image, Modal, Text } from "react-native"
import { ButtonTitle, TitleProfile } from "../Title/Style"
import { Btn } from "../Button/Button"
import { LinkCancel } from "../Link/Style"
import { ButtonModal, Cancel, ContentModal, TextAge, TextEmail, ViewData, ViewModal } from "./Style"
import moment from 'moment'
import { useEffect } from "react"
import { ImageModal } from "../Images/Style"

export const ModalAppointment = ({ patientInfo, appointmentData, navigation, visible, setShowModalAppointment, ...rest }) => {

    const onPressHandler = () => {
        navigation.navigate("InsertRecord", { data: patientInfo, idade: idade });
        setShowModalAppointment(false)
    };

    const calculateAge = (dateOfBirth) => {
        const today = moment();
        const birthDate = moment(dateOfBirth);
        const years = today.diff(birthDate, 'years');
        return years;
    };
    const idade = patientInfo ? calculateAge(patientInfo.dtNasc) : '';

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <ViewModal>
                {
                    patientInfo ? (
                        <ContentModal>
                            <ImageModal resizeMode='cover' source={{uri: patientInfo.photo}}/>
                            <TitleProfile>{patientInfo.name}</TitleProfile>

                            <ViewData>
                                <TextAge>{idade} anos</TextAge>
                                <TextEmail>{patientInfo.email}</TextEmail>
                            </ViewData>

                            <ButtonModal onPress={() => { onPressHandler() }} >
                                <ButtonTitle>INSERIR PRONTUARIO</ButtonTitle>
                            </ButtonModal>

                            <Cancel onPress={() => setShowModalAppointment(false)}>Cancelar</Cancel>

                        </ContentModal>
                    ) : (
                        <></>
                    )
                }
            </ViewModal>
        </Modal>
    )
}

