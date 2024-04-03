    import { Image, Modal, Text } from "react-native"
    import { ButtonTitle, TitleProfile } from "../Title/Style"
    import { Btn } from "../Button/Button"
    import { LinkCancel } from "../Link/Style"
    import { ButtonModal, Cancel, ContentModal, TextAge, TextEmail, ViewData, ViewModal } from "./Style"

    export const ModalAppointment = ({patientInfo,appointmentData, navigation, visible, setShowModalAppointment, ...rest}) => {

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

