
import { Container, ContentAccount } from "../../components/Container/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonGoogleTitle, ButtonTitle, ImgGoogle, TextAccount, TextFieldNull, Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { LinkCreate, LinkMedium } from "../../components/Link/Style"
import { Btn, BtnGoogle } from "../../components/Button/Button"
import { ActivityIndicator, Alert, Keyboard, Text, TouchableWithoutFeedback } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react"
import api from "../../service/Service"
import asyncStorage from '@react-native-async-storage/async-storage'
// import * as Notifications from "expo-notifications"

// Notifications.requestPermissionsAsync()

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({

//         shouldShowAlert: true,

//         shouldPlaySound: true,

//         shouldSetBadge: false
//     })
// })


export const Login = ({ navigation, route }) => {
    const [email, setEmail] = useState('gustavopasqualetti@gmail.com')
    const [senha, setSenha] = useState('gustavo123')
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [senhaError, setSenhaError] = useState(false);

    // const handleCallNotifications = async () => {

    //     const { status } = await Notifications.getPermissionsAsync()

    //     if (status !== "granted") {
    //         Alert.alert("Voce nao permitiu as notificacoes estarem ativas")
    //         return
    //     }
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: "Login",
    //             body: "Login realizado com sucesso",
    //             sound: true
    //         },
    //         trigger: {
    //             seconds: 1
    //         }
    //     })
    // }


    async function Login() {

        if (!email || !senha) {
            setEmailError(!email)
            setSenhaError(!senha)
            return
        }

        setLoading(true)
        try {
            const response = await api.post('Login', {
                email: email,
                senha: senha
            })

            await asyncStorage.setItem('token', JSON.stringify(response.data))
            navigation.replace("Main")
            // handleCallNotifications();
        } catch (error) {
            Alert.alert(`Email ou Senha invalido`)
        }
        setLoading(false)
        setEmailError(false)
        setSenhaError(false)


    }

    function handleLogin() {
        !loading ? Login() : Alert.alert(`Requisicao do Login ja feita, aguarde um retorno`)
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>

                <Logo source={require('../../assets/logo.png')} />

                <Title>Entrar ou criar conta</Title>



                <Input
                    placeholder={"Usuário ou E-mail"}
                    value={route.params ? route.params.email : email}
                    onChangeText={(txt) => setEmail(txt)}
                />
                {emailError && <TextFieldNull>O Email é obrigatório</TextFieldNull>}
                <Input
                    placeholder={"Senha"}
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={(txt) => setSenha(txt)}
                />
                {senhaError && <TextFieldNull>A Senha é obrigatória</TextFieldNull>}


                <LinkMedium onPress={() => navigation.replace("Recover")} >Esqueceu sua senha?</LinkMedium>


                <Btn onPress={() => handleLogin()} >
                    {loading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <ButtonTitle>ENTRAR</ButtonTitle>
                    )}
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