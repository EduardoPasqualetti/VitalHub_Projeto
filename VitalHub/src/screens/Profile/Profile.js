import { Button, Text } from "react-native"
import { ContainerImage, ContainerProfile, ContainerSafeEdit, ContainerScroll, ViewFormat, ViewTitle } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, SubTitleProfile, TitleProfile } from "../../components/Title/Style"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn, ButtonCamera, ButtonGoOut } from "../../components/Button/Button"
import { useEffect, useState } from "react"
import { LinkCancelMargin } from "../../components/Link/Style"
import { UserDecodeToken } from "../../Utils/Auth/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../service/Service"
import moment from 'moment'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Profile = ({ navigation, route }) => {
    const [profileEdit, setProfileEdit] = useState(false)
    const [role, setRole] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [idUser, setIdUser] = useState('')
    const [userData, setUserData] = useState('')
    const [cpf, setCpf] = useState()
    const [rg, setRg] = useState('')
    const [dtNasc, setDtNasc] = useState('')
    const [crm, setCrm] = useState()
    const [especialidade, setEspecialidade] = useState("")
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [cidade, setCidade] = useState("")
    const [numero, setNumero] = useState('')
    const [fotoUsuario, setFotoUsuario] = useState()



    async function profileLoad() {
        const token = await UserDecodeToken();

        setName(token.name)
        setEmail(token.email)
        setRole(token.role)
        setIdUser(token.jti)

        await getUser(token)
    }

    async function getUser(token) {
        const url = (token.role === 'Medico' ? 'Medicos' : 'Pacientes');

        try {
            const response = await api.get(`/${url}/BuscarPorId?id=${token.jti}`);

            setUserData(response.data)
            setFotoUsuario(response.data.idNavigation.foto)
            setCep(response.data.endereco.cep)
            setCidade(response.data.endereco.cidade)
            setLogradouro(response.data.endereco.logradouro)
            setNumero(response.data.endereco.numero.toString())
            setDtNasc(response.data.dataNascimento)
            token.role === 'Medico' ?
                setEspecialidade(response.data.especialidade.especialidade1)
                :
                null
            setCrm(response.data.crm)
            setCpf(response.data.cpf)
            setRg(response.data.rg)
        } catch (error) {
            console.log(error);
        }

    }

    async function updateUser() {
        const token = JSON.parse(await AsyncStorage.getItem('token')).token;

        try {
            if (role === 'Medico') {
                await api.put('/Medicos', {
                    crm: crm,
                    logradouro: logradouro,
                    numero: numero,
                    cep: cep,
                    cidade: cidade,
                    especialidade: especialidade
                }, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                await api.put('/Pacientes', {
                    rg: rg,
                    cpf: cpf,
                    dataNascimento: dtNasc,
                    logradouro: logradouro,
                    numero: numero,
                    cep: cep,
                    cidade: cidade
                }, { headers: { Authorization: `Bearer ${token}` } });
            }

            setProfileEdit(false);
        } catch (error) {
            console.log(error + " erro para atualizar usuario");
        }
    }

    async function AlterarFotoPerfil() {
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: route.params.photoUri,
            name: `image.jpg`,
            type: `image/jpg`
        })

        try {
            await api.put(`/Usuario/AlterarFotoPerfil?id=${idUser}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(() => {
                setFotoUsuario(route.params.photoUri)
            })
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        profileLoad();
    }, [])

    useEffect(() => {
        if (route.params && idUser != '') {
            AlterarFotoPerfil()
        }

    }, [route.params, idUser])


    async function closeApp() {
        await AsyncStorage.removeItem('token')
        navigation.replace("Login")
    }

    function formatarData(data) {
        return moment(data).format('DD/MM/YYYY');
    }

    return (
        <ContainerScroll>
            {!profileEdit ? (
                <>

                    <ProfileImage source={{ uri: fotoUsuario }} />

                    <ContainerProfile>
                        <TitleProfile>{name}</TitleProfile>
                        <SubTitleProfile>{email}</SubTitleProfile>


                        {
                            role == 'Paciente' ?
                                <>
                                    <BoxInput
                                        textLabel={'Data de nascimento:'}
                                        fieldValue={dtNasc ? formatarData(dtNasc) : null}

                                    />
                                    <BoxInput
                                        textLabel={'CPF'}
                                        fieldValue={cpf}
                                    />
                                    <BoxInput
                                        textLabel={'RG'}
                                        fieldValue={rg}
                                    />
                                </>
                                :
                                <>
                                    <BoxInput
                                        textLabel={'Especialidade'}
                                        fieldValue={especialidade}
                                    />
                                    <BoxInput
                                        textLabel={'CRM'}
                                        fieldValue={crm}
                                    />
                                </>
                        }
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Logradouro'}
                                fieldValue={logradouro}
                                fieldWidth={'60'}
                            />
                            <BoxInput
                                textLabel={'Numero'}
                                fieldValue={numero}
                                fieldWidth={'30'}
                            />
                        </ViewFormat>
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Cep'}
                                fieldValue={cep}
                                fieldWidth={'45'}
                            />
                            <BoxInput
                                textLabel={'Cidade'}
                                fieldValue={cidade}
                                fieldWidth={'45'}
                            />

                        </ViewFormat>

                        <Btn onPress={() => setProfileEdit(true)}>
                            <ButtonTitle>EDITAR</ButtonTitle>
                        </Btn>
                        <Btn onPress={() => { closeApp() }}>
                            <ButtonTitle>SAIR DO APP</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => navigation.replace("Main")}>Voltar</LinkCancelMargin>
                    </ContainerProfile>
                </>
            ) : (
                <>
                    <ProfileImage source={{ uri: fotoUsuario }} />


                    <ViewTitle>
                        <TitleProfile>{name}</TitleProfile>
                        <SubTitleProfile>{email}</SubTitleProfile>
                    </ViewTitle>
                    <ButtonCamera onPress={() => navigation.navigate("CameraPhoto", { isProfile: true })}>
                        <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb" />
                    </ButtonCamera>

                    <ContainerSafeEdit>
                        {
                            role == 'Paciente' ?
                                <>
                                    <BoxInput
                                        textLabel={'Data de nascimento:'}
                                        placeholder={dtNasc ? formatarData(dtNasc) : null}
                                        editable={true}
                                        onChangeText={setDtNasc}
                                    />
                                    <BoxInput
                                        textLabel={'CPF'}
                                        placeholder={cpf}
                                        editable={true}
                                        onChangeText={setCpf}
                                    />
                                    <BoxInput
                                        textLabel={'RG'}
                                        placeholder={rg}
                                        editable={true}
                                        onChangeText={setRg}
                                    />
                                </>
                                :
                                <>
                                    <BoxInput
                                        textLabel={'Especialidade'}
                                        placeholder={especialidade}
                                        editable={true}
                                        onChangeText={setEspecialidade}
                                    />
                                    <BoxInput
                                        textLabel={'CRM'}
                                        placeholder={crm}
                                        editable={true}
                                        onChangeText={setCrm}
                                    />
                                </>
                        }
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Logradouro'}
                                placeholder={logradouro}
                                fieldWidth={'60'}
                                editable={true}
                                onChangeText={setLogradouro}
                            />
                            <BoxInput
                                textLabel={'Numero'}
                                placeholder={numero}
                                fieldWidth={'30'}
                                editable={true}
                                onChangeText={setNumero}
                            />
                        </ViewFormat>
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Cep'}
                                placeholder={cep}
                                fieldWidth={'45'}
                                editable={true}
                                onChangeText={setCep}
                            />
                            <BoxInput
                                textLabel={'Cidade'}
                                placeholder={cidade}
                                fieldWidth={'45'}
                                editable={true}
                                onChangeText={setCidade}
                            />

                        </ViewFormat>

                        <Btn onPress={() => updateUser()}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => { setProfileEdit(false) }}>Cancelar Edição</LinkCancelMargin>

                    </ContainerSafeEdit>
                </>
            )}
        </ContainerScroll>
    )
}