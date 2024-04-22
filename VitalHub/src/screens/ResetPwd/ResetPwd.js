import { useState } from "react"
import { Btn, BtnReturn, IconClose } from "../../components/Button/Button"
import { Container } from "../../components/Container/Style"
import { Input } from "../../components/Input/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, Title } from "../../components/Title/Style"
import * as Notifications from "expo-notifications"
import api from "../../service/Service"

Notifications.requestPermissionsAsync()


Notifications.setNotificationHandler({
    handleNotification: async () => ({

        shouldShowAlert: true,

        shouldPlaySound: true,

        shouldSetBadge: false
    })
})


export const ResetPwd = ({ navigation, route }) => {

    const [senha, setSenha] = useState('')
    const [confirmar, setConfirmar] = useState('')

    
    async function UpdatePassword() {
        if (senha === confirmar) {
            await api.post(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`,
                {})
                .then(() => {

                    navigation.replace("Login");

                }).catch(error => {
                    console.log(error)
                })
        }
    }


    const handleCallNotifications = async () => {

        const { status } = await Notifications.getPermissionsAsync()

        if (status !== "granted") {
            alert("Voce nao permitiu as notificacoes estarem ativas")
            return
        }



        // const token = await Notifications.getExpoPushTokenAsync()

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
                value={senha}
                onChangeText={(txt) => setConfirmar(txt)}
            />
            <Input
                placeholder={"Confirmar nova senha"}
                value={confirmar}
                onChangeText={(txt) => setConfirmar(txt)}

            />

            <Btn onPress={() => UpdatePassword()}>
                <ButtonTitle>Confirmar nova senha</ButtonTitle>
            </Btn>

        </Container>
    )
}