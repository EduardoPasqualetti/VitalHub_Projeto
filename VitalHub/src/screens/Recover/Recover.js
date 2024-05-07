import { Container } from "../../components/Container/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Btn, BtnReturn, IconReturn } from "../../components/Button/Button"
import { useState } from "react"
import api from "../../service/Service"
import { ActivityIndicator, Alert } from "react-native"

export const Recover = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [spinner, setSpinner] = useState(false)

    async function SendEmail() {
        if (email != '' && email.length > 10 && email.includes('@')) {
            setSpinner(true)
            try {
                await api.post(`/RecuperarSenha?email=${email}`)
                navigation.replace("VerifyEmail", { emailRecuperacao: email })
            } catch (error) {
                Alert("Erro ao tentar recuperar senha")
            }
            setSpinner(false)
        }
        else
            alert("Email invalido, informe-o corretamente")
    }
    return (
        <Container>

            <BtnReturn onPress={() => navigation.navigate("Login")}>
                <IconReturn source={require("../../assets/return.png")} />
            </BtnReturn>

            <Logo source={require('../../assets/logo.png')}></Logo>

            <Title>Recuperar Senha</Title>

            <TextRec>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</TextRec>

            <Input value={email} onChangeText={(txt) => setEmail(txt)} />

            <Btn disabled={spinner} onPress={() => SendEmail()}>
                {
                    spinner ? ( <ActivityIndicator size="small" color="#ffffff" />) : <ButtonTitle>CONTINUAR</ButtonTitle>
                }

            </Btn>

        </Container>
    )
}