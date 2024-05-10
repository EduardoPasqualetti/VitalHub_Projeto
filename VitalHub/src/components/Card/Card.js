import { Image, Text } from "react-native";
import { ButtonCard, ButtonText, ClockCard, ContainerCard, ContentCard, DataProfile, ImagePoint, ProfileData, ProfileImage, ProfileName, TextAge, TextBold, ViewRow } from "./Style"
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from "react";




export const Card = ({
    status = "Pendentes",
    onPressCancel,
    onPressAppointment,
    name,
    typeAppointment,
    photo,
    age,
    crm,
    timeConsulta,
    doctor = false
}) => {

    let prioridade

    if (typeAppointment === 0) {
        prioridade = 'Rotina'
    } else if (typeAppointment === 1) {
        prioridade = 'Exame'
    } else prioridade = 'Urgencia'



    return (
        <ContainerCard>
            {/* Imagem do Card */}
            <ProfileImage source={photo} />


            <ContentCard>
                <DataProfile>
                    <ProfileName>{name}</ProfileName>
                    <ProfileData>
                        {
                            doctor ? 
                            <TextAge>CRM {crm}</TextAge> 
                            : 
                            <TextAge>{age} anos</TextAge>
                        }
                       
                        <ImagePoint source={require('../../assets/point.png')} />
                        <TextBold>{prioridade}</TextBold>
                    </ProfileData>
                </DataProfile>
                <ViewRow>
                    <ClockCard status={status}>
                        <AntDesign name="clockcircle" size={18} color={status == "Pendentes" ? '#49B3BA' : '#4E4B59'} />
                        <TextBold status={status}>{timeConsulta.split('T')[1].split(':')[0]}:{timeConsulta.split('T')[1].split(':')[1]}</TextBold>
                    </ClockCard>

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