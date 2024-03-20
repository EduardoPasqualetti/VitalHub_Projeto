import styled from "styled-components";

export const Container = styled.View`
flex-direction: row;
width: 320px;
height: 100px;
margin-top: 20px;
border-radius: 7px;
background-color:#fff ;
box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);
border: ${props => props.isSelected ? '3px solid #496BBA' : 'none'};
`

export const ImageDoctor = styled.Image`
width: 27%;
height: 85%;    
align-self: center;
border-radius: 7px;
margin-left: 10px;
`

export const ViewData = styled.View`
gap: 15px;
margin-left: 20px;
height: 60%;
width: 200px;
align-self: center;
`

export const TextEspec = styled.Text`
font-family: 'Quicksand_500Medium';
font-size: 14px;
`