import styled from "styled-components";

export const ViewModal = styled.View`
flex: 1;
align-items: center;
justify-content: center;
background-color: rgba(0, 0, 0, 0.3);
`

export const ContentModal = styled.View`
background-color: white;
padding: 20px;
border-radius: 10px;
width: 90%;
height: 80%;
align-items: center;
`

export const ViewData = styled.View`
width: 100%;
margin-top: 25px;
justify-content: space-between;
margin-left: 30px;
height: ${props => `${props.fieldHeight}px` };
`

export const TitleData = styled.Text`
font-family: 'Quicksand_600SemiBold';
font-size: 17px;
`

export const TextData = styled.Text`
font-family: 'Quicksand_500Medium';
color: #4E4B59;
font-size: 15px;
`