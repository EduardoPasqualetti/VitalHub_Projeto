import styled from "styled-components";
import { Title } from "../Title/Style";


export const ContainerCard = styled.View`
width: 90%;
height: 120px;
flex-direction: row;
border-radius: 7px;
gap: 10px;
background-color:#fff ;
box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);
align-self: center;
margin-bottom: 20px;
`

export const ProfileImage = styled.Image`
    height: 80%;
    width: 80px;
    align-self: center;
    border-radius: 7px;
    margin-left: 15px;
`   

export const ContentCard = styled.View`
width: 70%;
height: 80%;
align-self: center;
`

export const DataProfile = styled.View`
height: 60%;
justify-content: space-evenly;
`
export const ProfileName = styled(Title)`
font-size: 16px;
`

export const ProfileData = styled.View`
flex-direction: row;
gap: 10px;
align-items: center;
`

export const TextAge = styled.Text`
font-size: 15px;
color: #8C8A97;
font-family: 'Quicksand_400Regular';
`

export const TextBold = styled(TextAge)`
font-family: 'Quicksand_600SemiBold';
color: ${(props) => props.status == "agendada" ? "#49B3BA" : "#4E4B59"};
`

export const ViewRow = styled.View`
height: 40%;
flex-direction: row;
padding-right: 15px;
align-items: flex-end;
justify-content: space-between;
`

export const ClockCard = styled.View`
background-color: ${props => props.status == 'agendada' ? '#E8FCFD' : '#F1F0F5'};
height: 25px;
width: 100px;
flex-direction: row;
justify-content: center;
gap: 10px;
align-items: center;
border-radius: 5px;
`

export const ButtonCard = styled.TouchableOpacity`

`

export const ButtonText = styled.Text`
font-family: 'MontserratAlternates_500Medium';
font-size: 14px;
color: ${(props) => props.status == "agendada" ? "#c81d25" : "#344f8f"};
`

export const ImagePoint = styled.Image`
width: 5px;
height: 5px;
`