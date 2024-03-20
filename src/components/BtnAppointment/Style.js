import { css, styled } from "styled-components"

export const ButtonTab = styled.TouchableHighlight`
  padding: 12px 14px;
  border-radius: 7px;
  width: 31%;
  height: 45px;
  justify-content: center;
  align-items: center;

/* Se o botao estiver clicado, aplica-se o fundo azul, caso contrario fundo transparente */

  ${props => props.clickButton ? css`
    background-color: #496BBA;
  `: css`
    background-color: transparent;
    border: 2px solid #607ec5;
  `}
`

export const ButtonText = styled.Text`
  font-size: 13px;
  font-family: 'MontserratAlternates_600SemiBold';


  ${props => props.clickButton ? css`
    color:#fbfbfb
  `: css`
    color: #607ec5;
  `}
`