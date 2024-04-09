import styled from 'styled-components'

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#34898F'
})`
width: 90%;
height: 60px;
padding: 16px;
margin-top: 25px;
border: #49B3BA;
border-width: 2px;
border-radius: 5px;
color: #34898F;
font-size: 16px;
font-family: 'MontserratAlternates_600SemiBold'
`

export const InputCode = styled.TextInput.attrs({
    placeholderTextColor: '#34898F'
})`
width: 21%;
height: 100%;
border: #77CACF;
border-width: 2px;
border-radius: 7px;
font-size: 45px;
padding-left: 22px;
`

export const InputExame = styled.Text`
text-align: left;
width: 100%;
font-family: 'Quicksand_600SemiBold';
color: #33303E;
font-size: 19px;
`