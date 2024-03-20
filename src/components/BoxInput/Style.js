import styled from "styled-components";

export const FieldContent = styled.View`

width: ${props => `${props.fieldWidth}%`};

gap: 12px;

margin-bottom: ${props => `${props.marginBottom}px`};
`


export const InputLabel = styled.Text`
text-align: left;
width: 100%;
font-family: 'Quicksand_600SemiBold';
color: #33303E;
font-size: 18px;
`

export const InputText = styled.TextInput.attrs(props => ({
    placeholderTextColor: '#4E4B59'
 }) )
`
width: 100%;
height: ${props => `${props.fieldHeight}px` };
border-radius: 7px;
background-color: #F5F3F3;
color: #4E4B59;
font-family: 'MontserratAlternates_500Medium';
font-size: 16px;
padding: 30px;
`

export const InputTextModificate = styled.TextInput.attrs(props => ({
    placeholderTextColor: '#34898F'
}) )
`
width: 100%;
height: ${props => `${props.fieldHeight}px` };
border: #49B3BA;
border-width: 2px;
border-radius: 7px;
background-color: #FFF;
color: #34898F;
font-family: 'MontserratAlternates_600SemiBold';
font-size: 16px;
padding: 30px;
`