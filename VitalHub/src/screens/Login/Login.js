import { Container, ContentAccount } from "../../components/Container/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonGoogleTitle, ButtonTitle, ImgGoogle, TextAccount, Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { LinkCreate, LinkMedium } from "../../components/Link/Style"
import { Btn, BtnGoogle } from "../../components/Button/Button"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react'

import api from "../../service/Service"
import AsyncStorage from '@react-native-async-storage/async-storage'


export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('edu.Paciente@Paciente.com')
    const [senha, setSenha] = useState('1234')

    // Função Login

    async function Login() {

        // Chamar a api de 3
        const response = await api.post('/Login', {
            email: email,
            senha: senha
        })

        await AsyncStorage.setItem('token', JSON.stringify( response.data ))
        navigation.replace("Main")
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Container>

                <Logo source={require('../../assets/logo.png')} />

                <Title>Entrar ou criar conta</Title>


                <Input
                    placeholder={"Usuário ou E-mail"}

                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                // onChange={ event => event.nativeEvent.text }
                />
                <Input
                    placeholder={"Senha"}

                    value={senha}
                    onChangeText={(txt) => setSenha(txt)}
                // onChange={ event => event.nativeEvent.text }

                />

                <LinkMedium onPress={() => navigation.replace("Recover")} >Esqueceu sua senha?</LinkMedium>


                <Btn onPress={() => Login()}>
                    <ButtonTitle>ENTRAR</ButtonTitle>
                </Btn>

                <BtnGoogle>
                    <AntDesign name="google" size={21} color="#496BBA" />
                    <ButtonGoogleTitle>ENTRAR COM GOOGLE</ButtonGoogleTitle>
                </BtnGoogle>

                <ContentAccount>
                    <TextAccount>Nao tem Conta?</TextAccount>
                    <LinkCreate onPress={() => navigation.replace("Register")}>Crie uma conta agora!</LinkCreate >

                </ContentAccount>

            </Container>
        </TouchableWithoutFeedback>
    )
}   