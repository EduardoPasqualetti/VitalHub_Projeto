import { ContainerProfile, ContainerSafeEdit, ContainerScroll, ViewFormat, ViewTitle } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, SubTitleProfile, TitleProfile } from "../../components/Title/Style"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn } from "../../components/Button/Button"
import { useState } from "react"
import { LinkCancelMargin } from "../../components/Link/Style"
import { AntDesign } from '@expo/vector-icons';

import api from "../../service/Service"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Profile = ({ navigation }) => {

    const [profileEdit, setProfileEdit] = useState(false) 
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')   

    async function LogOut() {
        const response = api.delete('/Login', {
            email: email,
            senha: senha
        })

        await AsyncStorage.removeItem('token', JSON.stringify(response.data))
        navigation.replace("Login")
    }

    return (
        <ContainerScroll>
            {!profileEdit ? (
                <>

                    <ProfileImage source={require("../../assets/photo.png")} />

                    <ContainerProfile>

                        <TitleProfile></TitleProfile>
                        <SubTitleProfile>richard.kosta@gmail.com</SubTitleProfile>
                        
                        {/* style={styles.textPlaceholder} */}
                        
                        <BoxInput 
                            textLabel={'Data de nascimento:'}
                            placeholder={'04/05/1999'} 
                        />

                        <BoxInput
                            textLabel={'CPF'}
                            placeholder={'859********'}
                        />

                        <BoxInput
                            textLabel={'Endereço'}
                            placeholder={'Rua Vicenso Silva, 987'}
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
                        <TitleProfile>Richard Kosta</TitleProfile>
                        <SubTitleProfile>richard.kosta@gmail.com</SubTitleProfile>
                    </ViewTitle>

                    <ContainerSafeEdit>
                        <BoxInput
                            textLabel={'Data de nascimento:'}
                            placeholder={'04/05/1999'}
                            editable={true}

                        />
                        <BoxInput
                            textLabel={'CPF'}
                            placeholder={'859********'}
                            editable={true}
                        />
                        <BoxInput
                            textLabel={'Endereço'}
                            placeholder={'Rua Vicenso Silva, 987'}
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