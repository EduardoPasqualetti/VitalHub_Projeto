
import { ContainerProfile, ContainerSafeEdit, ViewFormat, ViewTitle } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, SubTitleProfile, TitleProfile } from "../../components/Title/Style"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn, ButtonCamera } from "../../components/Button/Button"
import { useEffect, useState } from "react"
import { LinkCancel } from "../../components/Link/Style"
import { UserDecodeToken } from "../../Utils/Auth/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../service/Service"
import moment from 'moment'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { Masks, useMaskedInputProps } from "react-native-mask-input"


export const Profile = ({ navigation, route }) => {
    const [profileEdit, setProfileEdit] = useState(false)
    const [role, setRole] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [idUser, setIdUser] = useState('')
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
            setFotoUsuario(response.data.idNavigation.foto)
            setCep(response.data.endereco.cep)
            setCidade(response.data.endereco.cidade)
            setLogradouro(response.data.endereco.logradouro)
            setNumero(response.data.endereco.numero)
            setDtNasc(response.data.dataNascimento)
            token.role === 'Medico' ?
                setEspecialidade(response.data.especialidade.especialidade1)
                :
                null
            setCrm(response.data.crm)
            setCpf(response.data.cpf)
            setRg(response.data.rg)
        } catch (error) {
            Alert.alert("Erro ao buscar dados do usuario")
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
                profileLoad()
            }

            setProfileEdit(false);  
        } catch (error) {
            Alert.alert("Erro ao atualizar dados do usuario")
            console.log(error);
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
            Alert.alert('Erro ao atualizar foto de perfil do usuario')
            console.log(error);
        }

    }

    async function CancelEdit() {
        setProfileEdit(false)
        profileLoad()
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

    function formatarData(data, isValid) {
        if (isValid == false) {
            return moment(data).format('YYYY-MM-DD');
        }
        return moment(data).format('DD/MM/YYYY');
    }

    const cpfMasked = useMaskedInputProps({
        value: cpf,
        onChangeText: setCpf,
        mask: Masks.BRL_CPF
    })

    const dataMasked = useMaskedInputProps({
        value: dtNasc,
        onChangeText: setDtNasc,
        mask: Masks.DATE_DDMMYYYY
    });

    return (
        <KeyboardAvoidingView style={{ width: '100%', alignSelf: 'center' }} behavior={Platform.OS == 'ios' ? "padding" : "height"}
            keyboardVerticalOffset={80}>
            {!profileEdit ? (

                <ScrollView>
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
                                fieldValue={numero ? numero.toString() : null}
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

                        <LinkCancel onPress={() => navigation.replace("Main")}>Voltar</LinkCancel>
                    </ContainerProfile>
                </ScrollView>
            ) : (
                <ScrollView>
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
                                        editable={true}
                                        placeholder={dtNasc ? formatarData(dtNasc) : null}
                                        maskedInput={dataMasked}
                                    />
                                    <BoxInput
                                        textLabel={'CPF'}
                                        editable={true}
                                        placeholder={cpf}
                                        maskedInput={cpfMasked}
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
                                placeholder={numero ? numero.toString() : null}
                                fieldWidth={'30'}
                                editable={true}
                                onChangeText={txt => setNumero(parseInt(txt))}
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

                        <LinkCancel onPress={() => CancelEdit()}>Cancelar Edição</LinkCancel>

                    </ContainerSafeEdit>
                </ScrollView>
            )}
        </KeyboardAvoidingView>
    )
}
