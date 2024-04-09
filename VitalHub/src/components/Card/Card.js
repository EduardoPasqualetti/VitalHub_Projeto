import { Image, Text } from "react-native";
import { ButtonCard, ButtonText, ClockCard, ContainerCard, ContentCard, DataProfile, ImagePoint, ProfileData, ProfileImage, ProfileName, TextAge, TextBold, ViewRow } from "./Style"
import { AntDesign } from '@expo/vector-icons';




export const Card = ({
    status = "Pendentes",
    onPressCancel,
    onPressAppointment,
    name,
    typeAppointment,
    photo,
    ageCrm
}) => {

    let prioridade

if (typeAppointment === 0) {
     prioridade = 'Rotina'
} else if (typeAppointment === 1) {
    prioridade = 'Exame'
} else  prioridade = 'Urgencia'

    return (
        <ContainerCard>
            {/* Imagem do Card */}
            <ProfileImage source={photo} />


            <ContentCard>
                <DataProfile>
                    <ProfileName>{name}</ProfileName>
                    <ProfileData>
                        <TextAge>{ageCrm}</TextAge>
                        <ImagePoint source={require('../../assets/point.png')} />
                        <TextBold>{prioridade}</TextBold>
                    </ProfileData>
                </DataProfile>
                <ViewRow>
                    <ClockCard status={status}>
                        <AntDesign name="clockcircle" size={18} color={status == "Pendentes" ? '#49B3BA' : '#4E4B59'} />
                        <TextBold status={status}>14:00</TextBold>
                    </ClockCard>


                    {/* valida e mostra o tipo de botao conforme a status */}

                    {
                        status === "Cancelados" ? (
                            <>
                            </>
                        ) : status == "Pendentes" ? (
                            <ButtonCard onPress={onPressCancel} >
                                <ButtonText status={status}>Cancelar</ButtonText>
                            </ButtonCard>
                        ) : (
                            <ButtonCard onPress={onPressAppointment}>
                                <ButtonText status={status}>Ver Prontuário</ButtonText>
                            </ButtonCard>
                        )
                    }


                </ViewRow>
            </ContentCard>

        </ContainerCard>
    )
}