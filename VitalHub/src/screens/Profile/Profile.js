import { ContainerProfile, ContainerSafeEdit, ContainerScroll, ConteinerTitle, ViewFormat, ViewTitle } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, SubTitleProfile, TitleProfile } from "../../components/Title/Style"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn } from "../../components/Button/Button"
import { useEffect, useRef, useState } from "react"
import { LinkCancelMargin } from "../../components/Link/Style"
import { UserDecodeToken } from "../../Utils/Auth/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../service/Service"
import moment from 'moment'
import { ButtonCamera } from "./Style"

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'

import { MaterialCommunityIcons } from "@expo/vector-icons"

export const Profile = ({ navigation }) => {
    const [profileEdit, setProfileEdit] = useState(false)
    const [role, setRole] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [idUser, setIdUser] = useState('')
    const [userData, setUserData] = useState('')
    const [cpf, setCpf] = useState('')
    const [dtNasc, setDtNasc] = useState('')
    const [crm, setCrm] = useState('')
    const [especialidade, setEspecialidade] = useState('')
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [cidade, setCidade] = useState('')

    const cameraRef = useRef(null);
    const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.front);
    const [photo, setPhoto] = useState(false);
    const [openModal, setOpenModal] = useState(false);


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


    ////////////// CAMERA //////////////

    async function CapturePhoto() {
        if (cameraRef) {
          const photo = await cameraRef.current.takePictureAsync();
          setPhoto(photo.uri);
    
          setOpenModal(true);
    
          console.log(photo);
        }
      }
    
      function ClearPhoto() {
        setPhoto(null);
    
        setOpenModal(false);
      }
    
      async function SavePhoto() {
        if( photo ) {
          await MediaLibrary.createAssetAsync( photo )
          .then( () => {
            Alert.alert('Sucesso', 'Foto salva na galeria')
          } ).catch(error => {
            alert("Erro ao processar foto")
          })
        }
      }
    
      useEffect(() => {
        (async () => {
          const { status: cameraStatus } =
            await Camera.requestCameraPermissionsAsync();
    
            const { statu: mediaStatus } = await MediaLibrary.requestPermissionsAsync()
        })();
      }, []);

    return (
        <ContainerScroll>
            {!profileEdit ? (
                <>

                    <ProfileImage source={require("../../assets/photo.png")} />

                    <ConteinerTitle>
                        <TitleProfile>{name}</TitleProfile>
                        <SubTitleProfile>{email}</SubTitleProfile>

                        <ButtonCamera>
                            <MaterialCommunityIcons
                                name="camera-plus"
                                size={20}
                                color={'#fbfbfb'} />
                        </ButtonCamera>

                    </ConteinerTitle>
                    {/* Botão da foto */}


                    <ContainerProfile>
                        {
                            role == 'Paciente' ?
                                <>
                                    <BoxInput
                                        textLabel={'Data de nascimento:'}
                                        fieldValue={formatarData(dtNasc)}

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

                        <BoxInput
                            textLabel={'Endereço'}
                            fieldValue={logradouro}
                        />
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
                    <ProfileImage source={require("../../assets/photo.png")} />


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
                                        placeholder={formatarData(dtNasc)}

                                    />
                                    <BoxInput
                                        textLabel={'CPF'}
                                        placeholder={cpf}
                                    />
                                </>
                                :
                                <>
                                    <BoxInput
                                        textLabel={'Especialidade'}
                                        placeholder={especialidade}
                                    />
                                    <BoxInput
                                        textLabel={'CRM'}
                                        placeholder={crm}
                                    />
                                </>
                        }
                        <BoxInput
                            textLabel={'Endereço'}
                            placeholder={logradouro}
                            editable={true}
                        />
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Cep'}
                                placeholder={cep}
                                fieldWidth={'45'}
                                editable={true}
                            />
                            <BoxInput
                                textLabel={'Cidade'}
                                placeholder={cidade}
                                fieldWidth={'45'}
                                editable={true}

                            />
                        </ViewFormat>

                        <Btn onPress={() => setProfileEdit(false)}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => { setProfileEdit(false) }}>Cancelar Edição</LinkCancelMargin>

                    </ContainerSafeEdit>
                </>
            )}

        <Camera
            getMediaLibrary={true}
            // visible={}
        />

        </ContainerScroll>
    )
}