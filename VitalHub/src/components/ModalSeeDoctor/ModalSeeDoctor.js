import { Modal } from "react-native"
import { ButtonTitle, SubtitleRecord, TitleProfile } from "../Title/Style"
import { ContentModal, ViewModal } from "./Style"
import { ImageModal } from "../Images/Style"
import { ViewDataDoctor, ViewTitleRecord } from "../Container/Style"
import { Btn, BtnModalSeeDoctor } from "../Button/Button"
import { LinkCancelMargin } from "../Link/Style"

export const ModalSeeDoctor = ({ doctorInfo, navigation, visible, setShowModalSeeDoctor, ...rest }) => {

    function onPressHandle(){
        setShowModalSeeDoctor(false)
        navigation.navigate("SeeLocalAppointment", { clinicaid: doctorInfo.clinica });
    }

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            {
                doctorInfo ? (

                    <ViewModal>
                        <ContentModal>
                            <ImageModal source={{ uri: doctorInfo.photo }} />
                            <TitleProfile>{doctorInfo.name}</TitleProfile>

                            <ViewDataDoctor>
                                <SubtitleRecord>{doctorInfo.especialidade}</SubtitleRecord>
                                <SubtitleRecord>CRM{doctorInfo.crm}</SubtitleRecord>
                            </ViewDataDoctor>

                            <BtnModalSeeDoctor onPress={() => { onPressHandle() }}>
                                <ButtonTitle>VER LOCAL DA CONSULTA</ButtonTitle>
                            </BtnModalSeeDoctor>

                            <LinkCancelMargin onPress={() => setShowModalSeeDoctor(false)}>Cancelar</LinkCancelMargin>
                        </ContentModal>
                    </ViewModal>
                ) : (
                    <></>
                )
            }

        </Modal>
    )
}