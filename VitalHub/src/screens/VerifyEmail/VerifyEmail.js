import { useEffect, useRef, useState } from "react"
import { Btn, BtnReturn, IconClose } from "../../components/Button/Button"
import { Container, ContentCode } from "../../components/Container/Style"
import { InputCode } from "../../components/Input/Style"
import { LinkResend } from "../../components/Link/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, TextUser, Title } from "../../components/Title/Style"
import api from "../../service/Service"

export const VerifyEmail = ({ navigation, route }) => {
    const[codigo, setCodigo] = useState('')
    const inputs = [useRef(null),useRef(null),useRef(null),useRef(null)]

    async function focusNextInput( index ) {
        // Se o index é menor do que a quantidade de campo
        if (index < inputs.length -1) {
            inputs[index + 1].current.focus()
        } else {
            
        }
    }

    async function focusPrevInput( index ) {
        if (index > 0) {
            inputs[ index -1 ].current.focus()
        } else {
            
        }
    }

    async function ValidateCode() {
        if (codigo != '' && codigo.length === 4) {
             try {
            await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoDeSenha?email=${route.params.emailRecuperacao}&code=${codigo}`)
            
            navigation.replace("ResetPwd", {emailRecuperacao : route.params.emailRecuperacao})
        } catch (error) {
            console.log(error);
        }
        } else {
            alert("Informe o codigo corretamente")
        }
       
    }

    useEffect(() => {
        inputs[0].current.focus()
    },[])

    return (
        <Container>
            
            <BtnReturn onPress={() => navigation.navigate("Login")}>
                 <IconClose  source={require("../../assets/close.png")}/>
            </BtnReturn>

            <Logo source={require('../../assets/logo.png')}></Logo>

            <Title>Verifique seu e-mail</Title>

            <TextRec>Digite o código de 4 dígitos enviado para</TextRec>
            <TextUser>{route.params.emailRecuperacao}</TextUser>

            <ContentCode>
                {
                    [0,1,2,3].map( (index) => (
                        <InputCode
                            key={index}
                            ref={inputs[index]}
                            keyboardType="numeric"
                            placeholder="0"
                            maxLenght={1} 
                            caretHidden={true}
                            onChangeText={ (text) => {
                                /// Verificar se o texto não é vazio (pra voltra pro campo anterior)
                                if (text == "") {
                                    focusPrevInput(index)
                                } else{
                                    const newCode = [...codigo] //Separa os valores dentro do array
                                    newCode[index] = text //Corrige o valor de acordo com a posição
                                    setCodigo( newCode.join(''))

                                    /// Verificar se o campo tem 1 caracter
                                    focusNextInput(index)
                                }

                            }}
                            />
                    ))
                }
            </ContentCode>

            <Btn onPress={() => ValidateCode()}>
                <ButtonTitle>ENTRAR</ButtonTitle>
            </Btn>

            <LinkResend>Reenviar Código</LinkResend>

        </Container>
    )
} 