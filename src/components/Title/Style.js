import styled from 'styled-components'

export const Title = styled.Text`
font-size: 25px;
color: #33303e;
font-family: "MontserratAlternates_600SemiBold";
margin-bottom: 10px;

`   

export const ButtonTitle = styled(Title)`
color: #FFFFFF;
font-size: 16px;
margin-top: 12px;
`

export const ButtonGoogleTitle = styled(ButtonTitle)`
color: #496BBA;
`


export const TextAccount = styled.Text`
font-size: 16px;
font-family: 'MontserratAlternates_600SemiBold';
color: #4E4B59;
`

export const TextRec = styled.Text`
font-size: 19px;
font-family: 'Quicksand_500Medium';
color: #5F5C6B;
margin-top: 20px;
text-align: center;
width: 95%;
`
export const TextUser = styled(TextRec)`
color: #496BBA;
margin-top: 3px;
    `

export const TitleProfile = styled(TextAccount)`

margin-top: 20px;
font-size: 24px;
`

export const SubTitleProfile = styled(TextRec)`
font-size: 18px;
color: #4E4B59;
margin-bottom: 40px;
margin-top: 10px;
`


export const SubtitleRecord = styled.Text`
font-size: 16px;
font-family: 'Quicksand_500Medium';
color: #4E4B59;
`

export const BtnProfile = styled(ButtonTitle)`
font-family: 'MontserratAlternates_700Bold';

`

export const LabelSchedule = styled.Text`
font-family: 'Quicksand_600SemiBold';
margin-bottom: 10px;
font-size: 16px;
margin-top: 20px;
`

export const SubTitleModalResume = styled(TextRec)`
margin-top: 20px;
font-family: 'Quicksand_500Medium';
margin-bottom: 20px;
`

export const TitleCancelPhoto = styled.Text`
font-family: 'MontserratAlternates_500Medium';
color: #C81D25;
`