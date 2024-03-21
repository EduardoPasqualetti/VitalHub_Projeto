import styled from "styled-components";

export const Container = styled.View`
flex-direction: row;
width: 320px;
height: 100px;
margin-top: 20px;
border-radius: 7px;
background-color:#fff ;
box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);
padding-top: 18px;
border: ${props => props.isSelected ? '3px solid #496BBA' : 'none'};
`

export const View1 = styled.View`
width: 62%;
align-items: flex-start;
gap: 17px;
padding-left: 15px;
`
export const View2 = styled.View`
width: 40%;
align-items: flex-end;
padding-right: 19px;
gap: 17px;
`

export const ViewStar = styled.View`
flex-direction: row;
gap: 5px;
height: 20px;
align-items: center;
`
export const ViewCalendar = styled.View`
flex-direction: row;
gap: 5px;
height: 22px;   
width: 100px;
align-items: center;
background-color: #E8FCFD;
gap: 10px;
justify-content: center;
`

export const TextName = styled.Text`
font-family: 'MontserratAlternates_600SemiBold';    
font-size: 16px;
`
export const TextLoc = styled.TextInput` 
font-family: 'Quicksand_600SemiBold';
font-size: 16px;
`   
export const TextAv = styled.Text`
font-family: 'Quicksand_600SemiBold';
font-size: 18px;
color: #F9A620;
`
export const TextCalendar = styled.Text`
font-family: 'Quicksand_600SemiBold';
color: #49B3BA;
font-size: 15px;
`