import { ContainerImage, ContainerProfile, ContainerSafeEdit, ContainerScroll, ConteinerTitle, ViewFormat, ViewFormatLog, ViewTitle } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, SubTitleProfile, TitleProfile } from "../../components/Title/Style"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn, ButtonCamera } from "../../components/Button/Button"
import { useEffect, useState } from "react"
import { LinkCancelMargin } from "../../components/Link/Style"
import { UserDecodeToken } from "../../Utils/Auth/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../service/Service"
import moment from 'moment'

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'

import { MaterialCommunityIcons } from "@expo/vector-icons"

export const Profile = ({ navigation, route }) => {
    const [profileEdit, setProfileEdit] = useState(false)
    const [role, setRole] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [idUser, setIdUser] = useState('')
    const [userData, setUserData] = useState('')
    const [cpf, setCpf] = useState()
    const [dtNasc, setDtNasc] = useState('')
    const [crm, setCrm] = useState()
    const [especialidade, setEspecialidade] = useState("")
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [cidade, setCidade] = useState("")
    const [numero, setNumero] = useState('')

    const { photoUri } = route.params || {};
    const [uriCameraCapture, setCameraCapture] = useState(null)

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
            token.role === 'Paciente' ?
                setCpf(response.data.cpf)
                :
                setEspecialidade(response.data.especialidade.especialidade1)
            setCrm(response.data.crm)
            setRg(response.data.rg)
        } catch (error) {
            console.log('user')
            console.log(error);
        }

    }


    async function updateUser() {
        const token = JSON.parse(await AsyncStorage.getItem('token')).token;

        try {
            console.log(token);
            if (role === 'Medico') {
                await api.put('/Medicos/AtualizarPerfilMedico', {
                    crm: crm,
                    logradouro: logradouro,
                    numero: numero,
                    cep: cep,
                    cidade: cidade,
                    especialidade: especialidade
                }, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                await api.put('/Pacientes/PutUpdateProfile', {
                    cpf: cpf,
                    dataNascimento: dtNasc,
                    logradouro: logradouro,
                    numero: numero,
                    cep: cep,
                    cidade: cidade
                }, { headers: { Authorization: `Bearer ${token}` } });
            }
            console.log('Perfil atualizado');


            setProfileEdit(false);
        } catch (error) {
            console.log(error + " erro para atualizar usuario");
        }
    }

    useEffect(() => {
        if (uriCameraCapture) {
            AlterarFotoPerfil()
        }
    }, [uriCameraCapture])

    async function AlterarFotoPerfil() {
        const formData = new FormData()
        formData.append("Arquivo", {
            uri: uriCameraCapture,
            name: `image.${uriCameraCapture.split(".")[1]}`,
            type: `image.${uriCameraCapture.split(".")[1]}`,
        })


        await api.put(`/Usuario/AlterarFotoPerfil?id=${idUser}`, FormData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error + ' no AlterarFotoPerfil ')
        })
    }

    async function profileLoad() {
        const token = await UserDecodeToken();

        setName(token.name)
        setEmail(token.email)
        setRole(token.role)
        setIdUser(token.jti)

        await getUser(token)
    }

    async function getUser() {
        const url = (role === 'Medico' ? 'Medicos' : 'Pacientes')
        try {
            const response = await api.get(`/${url}/BuscarPorId?id=${idUser}`)
            setUserData(response.data)
            setCep(response.data.endereco.cep)
            setCidade(response.data.endereco.cidade)
            setLogradouro(response.data.endereco.logradouro)
            setDtNasc(response.data.dataNascimento)
            role === 'Paciente' ?
                setCpf(response.data.cpf)
                :
                setEspecialidade(response.data.especialidade.especialidade1)
            setCrm(response.data.crm)
        } catch (error) {
            console.log(error);
        }

        console.log(userData);
    }

    useEffect(() => {
        profileLoad();
    }, [])

    useEffect(() => {
        if (idUser != '') {
            getUser();
        }
    }, [idUser])

    async function closeApp() {
        await AsyncStorage.removeItem('token')
        navigation.replace("Login")
    }

    function formatarData(data) {
        return moment(data).format('YYYY/MM/DD');
    }


    return (
        <ContainerScroll>
            {!profileEdit ? (
                <>
                    <ContainerImage>
                        <ProfileImage source={require("../../assets/photo.png")} />
                    </ContainerImage>

                    <ConteinerTitle>
                        <TitleProfile>{name}</TitleProfile>
                        <SubTitleProfile>{email}</SubTitleProfile>
                    </ConteinerTitle>

                    <ContainerProfile>
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
                        <ViewFormatLog>
                            <BoxInput
                                textLabel={'Logradouro'}
                                fieldValue={logradouro}
                                fieldWidth={'60'}
                            />
                        </ViewFormatLog>
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
                    <ContainerImage>
                        <ProfileImage source={require("../../assets/photo.png")} />
                        <ButtonCamera onPress={() => navigation.navigate("CameraPhoto", { isProfile: true })}>
                            <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb" />
                        </ButtonCamera>
                    </ContainerImage>


                    <ConteinerTitle>
                        <TitleProfile>{name}</TitleProfile>
                        <SubTitleProfile>{email}</SubTitleProfile>
                    </ConteinerTitle>

                    <ContainerSafeEdit>
                        {
                            role == 'Paciente' ?
                                <>
                                    <BoxInput
                                        textLabel={'Data de nascimento:'}
                                        placeholder={formatarData(dtNasc)}
                                        editable={true}
                                        onChangeText={(txt) => setDtNasc(txt)}
                                    />
                                    <BoxInput
                                        textLabel={'CPF'}
                                        placeholder={cpf}
                                        editable={true}
                                        onChangeText={setCpf}
                                    />
                                </>
                                :
                                <>
                                    <BoxInput
                                        textLabel={'Endereço'}
                                        fieldValue={logradouro}
                                    />
                                    <BoxInput
                                        textLabel={'Especialidade'}
                                        placeholder={especialidade}
                                        editable={true}
                                        onChangeText={(txt) => setEspecialidade(txt)}
                                    />
                                    <BoxInput
                                        textLabel={'CRM'}
                                        placeholder={crm}
                                        editable={true}
                                        onChangeText={setCrm}
                                    />
                                </>
                        }
                        <ViewFormatLog>
                            <BoxInput
                                textLabel={'Logradouro'}
                                fieldValue={logradouro}
                                fieldWidth={'60'}
                            />
                        </ViewFormatLog>
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Cep'}
                                placeholder={cep}
                                fieldWidth={'45'}
                                editable={true}
                                onChangeText={(txt) => setCep(txt)}
                            />
                            <BoxInput
                                textLabel={'Cidade'}
                                placeholder={cidade}
                                fieldWidth={'45'}
                                editable={true}
                                onChangeText={(txt) => setCidade(txt)}
                            />

                        </ViewFormat>

                        <Btn onPress={() => updateUser()}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => { setProfileEdit(false) }}>Cancelar Edição</LinkCancelMargin>

                    </ContainerSafeEdit>
                </>
            )}

            <Camera
                getMediaLibrary={true}
                visible={true}
            />

        </ContainerScroll>
    )
}