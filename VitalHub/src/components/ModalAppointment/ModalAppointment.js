    import { Image, Modal, Text } from "react-native"
    import { ButtonTitle, TitleProfile } from "../Title/Style"
    import { ButtonModal, Cancel, ContentModal, TextAge, TextEmail, ViewData, ViewModal } from "./Style"
import { Home } from "../../screens/Home/Home"

    export const ModalAppointment = ({patientInfo, appointmentData, clinicaid, medicoClinica, consulta, situacao, visible, navigation, setShowModalAppointment, typeProfile = "paciente", ...rest}) => {

        async function handleClose( screen ) {
            await setShowModalAppointment(false)

            if (screen == "SeeLocalAppointment") {
                navigation.replace( screen, {clinica : consulta.medicoClinica.clinicaid} )
            } else {
                navigation.replace( screen )
            }

        }

<<<<<<< HEAD
    export const ModalAppointment = ({patientInfo, appointmentData, clinicaid, medicoClinica, consulta, situacao, visible, navigation, setShowModalAppointment, typeProfile = "paciente", ...rest}) => {

        // async function handleClose( screen ) {
        //     await setShowModalAppointment(false)

        //     if (screen == "SeeLocalAppointment") {
        //         navigation.replace( screen, {clinica : consulta.medicoClinica.clinicaid} )
        //     } else {
        //         navigation.replace( screen )
        //     }
        // }

=======
>>>>>>> Developer

        const onPressHandler = () => {
            navigation.navigate("InsertRecord");
            setShowModalAppointment(false)
        };

        const name = patientInfo ? patientInfo.name : '';
        const email = patientInfo ? patientInfo.email : '';

        return(
            <Modal {...rest} visible={visible} transparent={true} animationType="fade">
                <ViewModal>
                    <ContentModal>
                        <Image source={require('../../assets/nicole.png')}/>

                        <TitleProfile>{name}</TitleProfile>

                        <ViewData>
                            <TextAge>17</TextAge>
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

