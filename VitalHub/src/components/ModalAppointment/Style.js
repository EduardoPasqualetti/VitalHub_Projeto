import styled from "styled-components";
import { Btn } from "../Button/Button";
import { LinkCancel } from "../Link/Style";

export const ViewModal = styled.View`
flex: 1;
background-color: rgba(0, 0, 0, 0.5);
align-items: center;
justify-content: center;

`

export const ContentModal = styled.View`
background-color: white;
padding: 20px;
border-radius: 10px;
width: 90%;
height: 55%;
align-items: center;
`

export const ImageModalAp = styled.Image`
margin-top: 20px;
`


export const ViewData = styled.View`
flex-direction: row;
gap: 20px;
margin-top: 15px;
`

export const TextAge = styled.Text`
font-family: 'Quicksand_500Medium';
font-size: 16px;
`

export const TextEmail = styled.Text`
font-family: 'Quicksand_500Medium';
font-size: 16px;
`

export const ButtonModal = styled(Btn)`
margin-top: 30px; 
`

export const Cancel = styled(LinkCancel)`
margin-top: 30px;
`