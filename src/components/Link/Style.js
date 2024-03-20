import styled from 'styled-components'


export const LinkMedium = styled.Text`
font-size: 16px;
margin-top: 12px;
color: #8C8A97;
font-family: 'MontserratAlternates_600SemiBold';
align-self: flex-start;
margin-left: 22px;
text-decoration: underline;
`

export const LinkCreate = styled.Text`
font-family: 'MontserratAlternates_600SemiBold';
font-size: 16px;
color: #4D659D;
text-decoration: underline;
`
export const LinkResend = styled(LinkCreate)`
margin-top: 50px;
`

export const LinkCancel = styled(LinkCreate)`
margin-top: 50px;
font-size: 18px;
align-self: center;
`

export const LinkCancelMargin = styled(LinkCancel)`
margin-bottom: 40px;
`
