import { Container } from "../../components/Container/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Btn, BtnReturn, IconReturn } from "../../components/Button/Button"
import { useState } from "react"
import api from "../../service/Service"

export const Recover = ({navigation}) => {
    const [email, setEmail] = useState('eduardopasqualetti9@gmail.com')

    async function SendEmail(){
        console.log()
     await api.post(`/RecuperarSenha?email=${email}`)
     .then( () =>  {
         navigation.replace("VerifyEmail", { emailRecuperacao : email })
     }).catch( error => {
         console.log(error)
     } )
 }
    return (
        <Container>
            
            <BtnReturn onPress={() => navigation.navigate("Login")}>
                 <IconReturn source={require("../../assets/return.png")}/>
            </BtnReturn>
           
            <Logo source={require('../../assets/logo.png')}></Logo>

            <Title>Recuperar Senha</Title>

            <TextRec>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</TextRec>

            <Input value={email} onChangeText={(txt) => setEmail(txt)} />

            <Btn onPress={() => SendEmail()}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Btn>  

        </Container>
    )
}