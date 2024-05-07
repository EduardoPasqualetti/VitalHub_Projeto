import { ActivityIndicator, Alert, ScrollView, Text } from "react-native"
import { Container, ContainerScroll } from "../../components/Container/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { Btn } from "../../components/Button/Button"
import { LinkCancel } from "../../components/Link/Style"
import * as Notifications from "expo-notifications"
import { useState } from "react"
import api from "../../service/Service"

Notifications.requestPermissionsAsync()

Notifications.setNotificationHandler({
    handleNotification: async () => ({

        shouldShowAlert: true,

        shouldPlaySound: true,

        shouldSetBadge: false
    })
})

export const Register = ({ navigation }) => {
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [idTipoUsuario, setIdTipoUsuario] = useState("F9B134B7-B074-4159-8434-2F280F5B08E1");
    const [dtNasc, setDtNasc] = useState()
    const [cpf, setCpf] = useState()
    const [rg, setRG] = useState()
    const [spinner, setSpinner] = useState(false);

    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        var result = true;
        [9, 10].forEach(function (j) {
            var soma = 0, r;
            cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
                soma += parseInt(e) * ((j + 2) - (i + 1));
            });
            r = soma % 11;
            r = (r < 2) ? 0 : 11 - r;
            if (r != cpf.substring(j, j + 1)) result = false;
        });
        return result;
    }


    const handleCallNotifications = async () => {

        const { status } = await Notifications.getPermissionsAsync()

        if (status !== "granted") {
            alert("Voce nao permitiu as notificacoes estarem ativas")
            return
        }

        0

        // const token = await Notifications.getExpoPushTokenAsync()

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Registro de Usuario",
                body: "Sua conta foi criada com sucesso, bem vindo",
                sound: true
            },
            trigger: {
                seconds: 1
            }
        })
    }

    async function HandleRegister() {
        console.log("entra no metodo cadastrar");
        if (
            senha === confirmarSenha &&
            senha !== '' &&
            senha.length >= 5 &&
            nome &&
            email &&
            cpf &&
            rg &&
            dtNasc &&
            validarCPF(cpf)
        ) {
            setSpinner(true)
            const formData = new FormData();
            formData.append('Nome', nome);
            formData.append('Email', email);
            formData.append('Senha', senha);
            formData.append('IdTipoUsuario', idTipoUsuario);
            formData.append('Rg', rg);
            formData.append('Cpf', cpf);
            formData.append('DataNascimento', dtNasc);
            try {
                const response = await api.post("Pacientes", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log("feito a requisicao");
                console.log(response);
                navigation.replace("Login");
                handleCallNotifications();
            } catch (error) {
                console.log(error + 'erro no metodo');
            }
            setSpinner(false)
        } else if (senha.length < 5) {
            Alert.alert("Senha muito pequena!")
        } else if (senha !== confirmarSenha) {
            Alert.alert("Senha de confirmação não corresponde à senha")
        } else if (!validarCPF(cpf)) {
            Alert.alert("CPF inválido");
        } else {
            Alert.alert("Preencha todas as informações para criar sua conta")
        }
    }

    return (
        <Container>
            <Logo source={require('../../assets/logo.png')}></Logo>

            <Title>Criar conta</Title>

            <TextRec>Insira seu endereço de e-mail, senha e dados pessoais para realizar seu cadastro.</TextRec>
            <ScrollView style={{ width: '100%', alignSelf: 'center', left: 18 }}>
                <Input placeholder={"Nome"} value={nome} onChangeText={setNome} />
                <Input placeholder={"Email"} value={email} onChangeText={setEmail} />
                <Input placeholder={"Senha"} value={senha} onChangeText={setSenha} secureTextEntry={true} />
                <Input placeholder={"Confirmar senha"} value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry={true} />
                <Input placeholder={"RG"} value={rg} onChangeText={setRG} keyboardType="numeric" />
                <Input placeholder={"CPF"} value={cpf} onChangeText={setCpf} keyboardType="numeric" />
                <Input placeholder={"Data de nascimento"} value={dtNasc} onChangeText={setDtNasc} />
            </ScrollView>

            <Btn onPress={() => HandleRegister()}>
                {
                    spinner ? (

                        <ActivityIndicator size="small" color="#ffffff" />

                    ) : <ButtonTitle>CADASTRAR</ButtonTitle>
                }

            </Btn>

            <LinkCancel onPress={() => navigation.replace("Login")}>Cancelar</LinkCancel>

        </Container>
    )
}