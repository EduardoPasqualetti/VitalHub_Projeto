import {useState} from 'react'
import { BoxInput } from '../../components/BoxInput/Index'
import { Btn } from '../../components/Button/Button'
import { ContainerProfile, ContainerScroll, ViewTitleRecord } from '../../components/Container/Style'
import { ProfileImage } from '../../components/Images/Style'
import { LinkCancel } from '../../components/Link/Style'
import { ButtonTitle, SubtitleRecord, TitleProfile } from '../../components/Title/Style'
import api from '../../service/Service'
import { ActivityIndicator, Alert } from 'react-native'

export const InsertRecord = ({ navigation, route }) => {
    const [descricao, setDescricao ] = useState()
    const [diagnostico, setDiagnostico] = useState()
    const [receita, setReceita] = useState()
    const [spinner, setSpinner] = useState()

    async function InsertRecord() {
        setSpinner(true)
        if (descricao && diagnostico && receita) {
            
        }
        try {
            response = await api.put('/Consultas/Prontuario', {
                consultaId: route.params.data.idConsulta,
                medicamento: receita,
                descricao: descricao,
                diagnostico: diagnostico

            })
            if (response) {
                try {
                    await api.put(`/Consultas/Status?idConsulta=${route.params.data.idConsulta}&status=Realizados`)
                } catch (error) {
                    Alert.alert("erro ao marcar como realizada")
                }
            }
            navigation.replace("Main")
        } catch (error) { 
            Alert.alert('erro ao inserir prontuario')
        }


    }

    return (
        <ContainerScroll>

            {route.params ? (
                <>

                    <ProfileImage source={{ uri: route.params.data.photo }} />
                    <ContainerProfile>
                        <TitleProfile>{route.params.data.name}</TitleProfile>
                        <ViewTitleRecord>
                            <SubtitleRecord>{route.params.idade} anos</SubtitleRecord>
                            <SubtitleRecord>{route.params.data.email}</SubtitleRecord>
                        </ViewTitleRecord>
                        <BoxInput
                            textLabel={'Descrição da consulta'}
                            placeholder={'Descricao'}
                            fieldHeight={150}
                            insertRecord={true}
                            multiline={true}
                            editable={true}
                            onChangeText={setDescricao}
                        />
                        <BoxInput
                            textLabel={'Diagnóstico do paciente'}
                            placeholder={'Diagnóstico'}
                            fieldHeight={80}
                            insertRecord={true}
                            multiline={true}
                            editable={true}
                            onChangeText={setDiagnostico}
                        />
                        <BoxInput
                            textLabel={'Prescrição médica'}
                            placeholder={'Prescrição medica'}
                            fieldHeight={150}
                            insertRecord={true}
                            multiline={true}
                            editable={true}
                            onChangeText={setReceita}
                        />

                        <Btn disabled={spinner} onPress={() => InsertRecord()}>
                            {
                                spinner ? (<ActivityIndicator size="small" color="#ffffff" />) : <ButtonTitle>SALVAR</ButtonTitle>
                            }
                        </Btn>
                        <LinkCancel onPress={() => navigation.replace("Main")}>Cancelar</LinkCancel>
                    </ContainerProfile>
                </>
            ) : (
                <></>
            )}
        </ContainerScroll>
    )
}