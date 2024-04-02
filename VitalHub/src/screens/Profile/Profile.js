import { ContainerProfile, ContainerSafeEdit, ContainerScroll, ViewFormat, ViewTitle } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, SubTitleProfile, TitleProfile } from "../../components/Title/Style"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn } from "../../components/Button/Button"
import { useEffect, useState } from "react"
import { LinkCancelMargin } from "../../components/Link/Style"
import { AntDesign } from '@expo/vector-icons';

import api from "../../service/Service"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Profile = ({ navigation }) => {

    const [profileEdit, setProfileEdit] = useState(false) 
    const [role, setRole] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [idUser,setIdUser] = useState('')  
    const [nasc, setNasc] = useState('04/05/1999')
    const [cpf, setCpf] = useState('859********')
    const [docCrm, setDocCrm] = useState('824981')
    const [endereco, setEndereco] = useState('Rua Vicenso Silva, 987')

    async function LogOut() {
        await AsyncStorage.removeItem('token')
        navigation.replace("Login")
    }

    async function ChangeProfile() {
        const token = await UserDecodeToken();
        setName(token.name)
        setEmail(token.email)
        setRole(token.role)
        setIdUser(token.jti)

    }

    useEffect(() => {
        ChangeProfile()
    }, [])

    return (
        <ContainerScroll>
            {!profileEdit ? (
                <>

                    <ProfileImage source={require("../../assets/photo.png")} />

                    <ContainerProfile>

                        <TitleProfile>{name}</TitleProfile>
                        <SubTitleProfile>{email}</SubTitleProfile>
                        
                        {/* style={styles.textPlaceholder} */}
                        
                        <BoxInput 
                            textLabel={'Data de nascimento:'}
                            fieldValue={nasc}
                        />

                        {
                            role == 'Paciente' ? 
                                <BoxInput
                                    textLabel={'CPF'}
                                    fieldValue={cpf}
                                />
                             : 
                             <BoxInput
                                    textLabel={'CRM'}
                                    fieldValue={docCrm}
                                />
                        }

                        <BoxInput
                            textLabel={'Endereço'}
                            placeholder={endereco}
                        />

                        <ViewFormat>

                            <BoxInput
                                textLabel={'Cep'}
                                placeholder={'06548-909'}
                                fieldWidth={'45'}
                            />
                            <BoxInput
                                textLabel={'Cidade'}
                                placeholder={'Moema-SP'}
                                fieldWidth={'45'}
                            />

                        </ViewFormat>

                        <Btn onPress={() => setProfileEdit(true)}>
                            <ButtonTitle>EDITAR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => navigation.replace("Main")}>Voltar</LinkCancelMargin>

                        <AntDesign style={{marginTop: -30, marginRight: 280, borderColor: "black"}} onPress={() => LogOut()}
                            name="logout" size={24} 
                            color="black" 
                        />

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
                        <BoxInput
                            textLabel={'Data de nascimento:'}
                            fieldValue={nasc}
                            editable={true}

                        />
                        <BoxInput
                            textLabel={'CPF'}
                            fieldValue={cpf}
                            editable={true}
                        />
                        <BoxInput
                            textLabel={'Endereço'}
                            fieldValue={endereco}
                            editable={true}
                        />
                        <ViewFormat>
                            <BoxInput
                                textLabel={'Cep'}
                                placeholder={'06548-909'}
                                fieldWidth={'45'}
                                editable={true}
                            />
                            <BoxInput
                                textLabel={'Cidade'}
                                placeholder={'Moema-SP'}
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
        </ContainerScroll>


    )
}

// const styles = StyleSheet.create({
//     map: {
//     flex: 1,
//     width: '100%',
//     },
    
//     textPlaceholder: {
//         color: "black",
        
//     }
// });