import styled from "styled-components";

export const Container = styled.View`
flex-direction: row;
width: 320px;
height: 110px;
margin-top: 20px;
border-radius: 7px;
background-color:#fff ;
box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);
padding-top: 18px;
border: ${props => props.isSelected ? '3px solid #496BBA' : 'none'};
`

export const View1 = styled.View`
width: 72%;
align-items: flex-start;
gap: 18px;
padding-left: 15px;
`
export const View2 = styled.View`
width: 28%;
align-items: flex-end;
padding-right: 10px;
gap: 17px;
`

export const ViewStar = styled.View`
flex-direction: row;
gap: 5px;
height: 30px;
align-items: center;
`
export const ViewCalendar = styled.View`
flex-direction: row;
gap: 5px;
height: 22px;   
width: 100%;
align-items: center;
background-color: #E8FCFD;
justify-content: center;
`

export const TextName = styled.Text`
font-family: 'MontserratAlternates_600SemiBold';    
font-size: 16px;
`
export const TextLoc = styled.TextInput` 
font-family: 'Quicksand_600SemiBold';
font-size: 15px;
`   
export const TextAv = styled.Text`
font-family: 'Quicksand_600SemiBold';
font-size: 18px;
color: #F9A620;
`
export const TextCalendar = styled.Text`
font-family: 'Quicksand_600SemiBold';
color: #49B3BA;
font-size: 14px;
`