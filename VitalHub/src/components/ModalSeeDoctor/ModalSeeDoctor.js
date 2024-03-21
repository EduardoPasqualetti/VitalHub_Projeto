import { Modal } from "react-native"
import { ButtonTitle, SubtitleRecord, TitleProfile } from "../Title/Style"
import { ContentModal, ViewModal } from "./Style"
import { ImageDoctor } from "../Images/Style"
import { ViewDataDoctor, ViewTitleRecord } from "../Container/Style"
import { Btn, BtnModalSeeDoctor } from "../Button/Button"
import { LinkCancelMargin } from "../Link/Style"

export const ModalSeeDoctor = ({ navigation, visible, setShowModalSeeDoctor, ...rest }) => {

    const onPressHandle = () => {
        navigation.navigate("SeeLocalAppointment");
        setShowModalSeeDoctor(false)
      }

    return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
        <ViewModal>
            <ContentModal>
                <ImageDoctor source={require("../../assets/doctor.png")}/>
                <TitleProfile>Dr.Claudio</TitleProfile>

                <ViewDataDoctor>
                    <SubtitleRecord>Cliníco geral</SubtitleRecord>
                    <SubtitleRecord>CRM-15286</SubtitleRecord>
                </ViewDataDoctor>

                <BtnModalSeeDoctor onPress={() => {onPressHandle()}}>
                    <ButtonTitle>VER LOCAL DA CONSULTA</ButtonTitle>
                </BtnModalSeeDoctor>

                <LinkCancelMargin onPress={() => setShowModalSeeDoctor(false)}>Cancelar</LinkCancelMargin>
            </ContentModal>
        </ViewModal>
    </Modal>
)
}