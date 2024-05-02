import { Image, Modal } from "react-native"
import { ButtonTitle, TitleProfile } from "../Title/Style"
import { ButtonModal, Cancel, ContentModal, TextAge, TextEmail, ViewData, ViewModal } from "./Style"
import moment from 'moment'

export const ModalAppointment = ({patientInfo,appointmentData, navigation, visible, setShowModalAppointment, ...rest}) => {

    const onPressHandler = () => {
        navigation.navigate("InsertRecord",{name: name, email: email, idade: idade, idConsulta: idConsulta});
        setShowModalAppointment(false)
    };

    const calculateAge = (dateOfBirth) => {
        const today = moment();
        const birthDate = moment(dateOfBirth);
        const years = today.diff(birthDate, 'years');
        return years;
    };

    const name = patientInfo ? patientInfo.name : '';
    const email = patientInfo ? patientInfo.email : '';
    const idade = patientInfo ? calculateAge(patientInfo.dtNasc) : '';
    const idConsulta = patientInfo ? patientInfo.idConsulta : '';
    const foto = patientInfo ? patientInfo.foto : ''

    return(
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <ViewModal>
                <ContentModal>
                    <Image source={patientInfo ? {uri : patientInfo.photo} : null}/>

                    <TitleProfile>{name}</TitleProfile>

                    <ViewData>
                        <TextAge>{idade}</TextAge>
                        <TextEmail>{email}</TextEmail>
                    </ViewData>

                    <ButtonModal onPress={() => {onPressHandler()}} >
                        <ButtonTitle>INSERIR PRONTUARIO</ButtonTitle>
                    </ButtonModal>

                    <Cancel onPress={() => setShowModalAppointment(false)}>Cancelar</Cancel>

                </ContentModal>
            </ViewModal>
        </Modal>
    )
}