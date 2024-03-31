import { Image, Text } from "react-native";
import { ButtonCard, ButtonText, ClockCard, ContainerCard, ContentCard, DataProfile, ImagePoint, ProfileData, ProfileImage, ProfileName, TextAge, TextBold, ViewRow } from "./Style"
import { AntDesign } from '@expo/vector-icons';




export const Card = ({
    status = "Pendentes",
    onPressCancel,
    onPressAppointment,
    name, age, hour, typeAppointment}) => {

    return (
        <ContainerCard>
            {/* Imagem do Card */}
            <ProfileImage source={require('../../assets/nicole.png')} />


            <ContentCard>
                <DataProfile>   
                    <ProfileName>{name}</ProfileName>
                    <ProfileData>
                        <TextAge>{age}</TextAge>
                        <ImagePoint source={require('../../assets/point.png')} />
                        <TextBold>{typeAppointment}</TextBold>
                    </ProfileData>
                </DataProfile>
                <ViewRow>
                    <ClockCard status={status}>
                        <AntDesign name="clockcircle" size={18} color={status == "Pendestes" ? '#49B3BA' : '#4E4B59'} />
                        <TextBold status={status}>14:00</TextBold>
                    </ClockCard>


                    {/* valida e mostra o tipo de botao conforme a status */}

                    {
                        status == "cancelada" ? (
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