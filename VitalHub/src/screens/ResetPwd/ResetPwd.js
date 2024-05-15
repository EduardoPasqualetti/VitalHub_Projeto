import { useState } from "react"
import { Btn, BtnReturn, IconClose } from "../../components/Button/Button"
import { Container } from "../../components/Container/Style"
import { Input } from "../../components/Input/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, Title } from "../../components/Title/Style"
import * as Notifications from "expo-notifications"
import api from "../../service/Service"
import { ActivityIndicator, Alert } from "react-native"

Notifications.requestPermissionsAsync()


Notifications.setNotificationHandler({
    handleNotification: async () => ({

        shouldShowAlert: true,

        shouldPlaySound: true,

        shouldSetBadge: false
    })
})

export const ResetPwd = ({ navigation, route }) => {
    const [spinner, setSpinner] = useState(false)
    const [senha, setSenha] = useState('')
    const [confirmar, setConfirmar] = useState('')


    async function UpdatePassword() {
        if (senha === confirmar && senha.length >= 5) {
            setSpinner(true)
            try {
                await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`,
                    {
                        senhaNova: senha
                    })
                navigation.navigate("Login")
                handleCallNotifications()
            } catch (error) {
                Alert.alert('Erro ao alterar senha')
            }
            setSpinner(false)
        }
        else {
            Alert.alert('Senha de confirmação nao coincide com a senha')
        }
    }


    const handleCallNotifications = async () => {

        const { status } = await Notifications.getPermissionsAsync()

        if (status !== "granted") {
            Alert.alert("Voce nao permitiu as notificacoes estarem ativas")
            return
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Alteracao de senha",
                body: "Sua senha foi redefinida com sucesso",
                sound: true
            },
            trigger: {
                seconds: 1
            }
        })
    }

    return (
        <Container>

            <BtnReturn onPress={() => navigation.navigate("Login")}>
                <IconClose source={require("../../assets/close.png")} />
            </BtnReturn>

            <Logo source={require('../../assets/logo.png')}></Logo>

            <Title>Redefinir Senha</Title>

            <TextRec>Insira e confirme a sua nova senha</TextRec>

            <Input
                placeholder={"Nova senha"}
                onChangeText={(txt) => setSenha(txt)}
            />
            <Input
                placeholder={"Confirmar nova senha"}
                onChangeText={(txt) => setConfirmar(txt)}

            />

            <Btn disabled={spinner} onPress={() => UpdatePassword()}>
                {
                    spinner ? (<ActivityIndicator size="small" color="#ffffff" />) : <ButtonTitle>Confirmar nova senha</ButtonTitle>
                }
            </Btn>

        </Container>
    )
}