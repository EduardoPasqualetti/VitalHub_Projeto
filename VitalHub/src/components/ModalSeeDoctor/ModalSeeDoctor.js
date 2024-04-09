import { Modal } from "react-native"
import { ButtonTitle, SubtitleRecord, TitleProfile } from "../Title/Style"
import { ContentModal, ViewModal } from "./Style"
import { ImageDoctor } from "../Images/Style"
import { ViewDataDoctor, ViewTitleRecord } from "../Container/Style"
import { Btn, BtnModalSeeDoctor } from "../Button/Button"
import { LinkCancelMargin } from "../Link/Style"

export const ModalSeeDoctor = ({doctorInfo, navigation, visible, setShowModalSeeDoctor, ...rest }) => {

    const onPressHandle = () => {
        setShowModalSeeDoctor(false)
       
        navigation.navigate("SeeLocalAppointment", {clinicaid : idClinica});
      }
    const idClinica = doctorInfo ? doctorInfo.clinica : ''
    const name = doctorInfo ? doctorInfo.name : '';
    const crm = doctorInfo ? doctorInfo.crm : '';
    const especialidade = doctorInfo ? doctorInfo.especialidade : '';

    return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
        <ViewModal>
            <ContentModal>
                <ImageDoctor source={require("../../assets/doctor.png")}/>
                <TitleProfile>{name}</TitleProfile>

                <ViewDataDoctor>
                    <SubtitleRecord>{especialidade}</SubtitleRecord>
                    <SubtitleRecord>CRM{crm}</SubtitleRecord>
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