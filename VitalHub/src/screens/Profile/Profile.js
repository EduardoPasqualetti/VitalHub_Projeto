import { Button, Text } from "react-native"
import { ContainerProfile, ContainerSafeEdit, ContainerScroll, ViewFormat, ViewTitle } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, SubTitleProfile, TitleProfile } from "../../components/Title/Style"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn, ButtonGoOut } from "../../components/Button/Button"
import { useEffect, useState } from "react"
import { LinkCancelMargin } from "../../components/Link/Style"
import { UserDecodeToken } from "../../Utils/Auth/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../service/Service"
import moment from 'moment'

export const Profile = ({ navigation }) => {
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
    const [foto, setFoto] = useState('')


    async function profileLoad() {
        const token = await UserDecodeToken();
        setName(token.name)
        setEmail(token.email)
        setRole(token.role)
        setIdUser(token.jti)
    }

    async function getUser() {
        const url = (role === 'Medico' ? 'Medicos' : 'Pacientes')
        try {
            const response = await api.get(`/${url}/BuscarPorId?id=${idUser}`)

            setUserData(response.data)
            setFoto(response.data.idNavigation.foto)
            setCep(response.data.endereco.cep)
            setCidade(response.data.endereco.cidade)
            setLogradouro(response.data.endereco.logradouro)
            setNumero(response.data.endereco.numero.toString())
            setDtNasc(response.data.dataNascimento)
            role === 'Paciente' ?
                setCpf(response.data.cpf)
                :
                setEspecialidade(response.data.especialidade.especialidade1)
            setCrm(response.data.crm)
            setRg(response.data.rg)
        } catch (error) {
            console.log(error);
        }

    }

    async function updatePatient() {
        const token = JSON.parse(await AsyncStorage.getItem('token')).token;
        console.log(token);

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
            console.log('Perfil atualizado');


            setProfileEdit(false);
        } catch (error) {
            console.log(error + " erro para atualizar paciente");
        }
    }



    useEffect(() => {
        profileLoad();
    }, [idUser])

    useEffect(() => {
        if (idUser) {
            getUser();
        }
    }, [idUser])


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

                    <ProfileImage source={foto ? { uri: foto } : null} />

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
                    <ProfileImage source={{ uri: foto }} />


                    <ViewTitle>
                        <TitleProfile>{name}</TitleProfile>
                        <SubTitleProfile>{email}</SubTitleProfile>
                    </ViewTitle>

                    <ContainerSafeEdit>
                        {
                            role == 'Paciente' ?
                                <>
                                    <BoxInput
                                        textLabel={'Data de nascimento:'}
                                        placeholder={dtNasc}
                                        editable={true}
                                        onChangeText={(txt) => setDtNasc(txt)}
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
                                        onChangeText={(txt) => setRg(txt)}
                                    />
                                </>
                                :
                                <>
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
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Logradouro'}
                                placeholder={logradouro}
                                fieldWidth={'60'}
                                editable={true}
                                onChangeText={(txt) => setLogradouro(txt)}
                            />
                            <BoxInput
                                textLabel={'Numero'}
                                placeholder={numero}
                                fieldWidth={'30'}
                                editable={true}
                                onChangeText={(txt) => setNumero(txt)}
                            />
                        </ViewFormat>
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

                        <Btn onPress={() => updatePatient()}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => { setProfileEdit(false) }}>Cancelar Edição</LinkCancelMargin>

                    </ContainerSafeEdit>
                </>
            )}
        </ContainerScroll>
    )
}