    import { Image, Modal, Text } from "react-native"
    import { ButtonTitle, TitleProfile } from "../Title/Style"
    import { Btn } from "../Button/Button"
    import { LinkCancel } from "../Link/Style"
    import { ButtonModal, Cancel, ContentModal, TextAge, TextEmail, ViewData, ViewModal } from "./Style"
import { Home } from "../../screens/Home/Home"

    export const ModalAppointment = ({appointmentData, navigation, visible, setShowModalAppointment, ...rest}) => {

        const onPressHandler = () => {
            navigation.navigate("InsertRecord");
            setShowModalAppointment(false)
        };

        const {nome, idade} = appointmentData || {};

        async function handleClose( screen ) {
            await setShowModalAppointment(false)

            if ( screen == "rota local consulta" ) {
                navigation.replace( screen, { clinicaid : consulta.medicoClinica.clinicaid } )
            }
            else {
                navigation.replace( Home )
            }
        }

        return(
            <Modal {...rest} visible={visible} transparent={true} animationType="fade">
                <ViewModal>
                    <ContentModal>
                        <Image source={require('../../assets/nicole.png')}/>

                        <TitleProfile>Gabriel Victor</TitleProfile>

                        <ViewData>
                            <TextAge>17</TextAge>
                            <TextEmail>gabriel@gmail.com</TextEmail>
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

