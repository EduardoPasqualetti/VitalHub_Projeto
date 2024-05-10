import { useEffect, useState } from "react"
import { ContainerProfile, ContainerScroll, ViewFormat, ViewTitleRecord } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, EmailProfile, SubtitleRecord, TextRecord, TitleProfile } from "../../components/Title/Style"
import { Alert, KeyboardAvoidingView, Platform, Text } from "react-native"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn } from "../../components/Button/Button"
import { LinkCancelMargin } from "../../components/Link/Style"
import moment from 'moment'
import api from "../../service/Service"

export const MedicalRecord = ({ navigation, route }) => {

    const [recordEdit, setRecordEdit] = useState(true)
    const [descricao, setDescricao] = useState('')
    const [diagnostico, setDiagnostico] = useState('')
    const [receita, setReceita] = useState('')
    const [descricaoExame, setDescricaoExame] = useState('')
    const [idConsulta, setIdConsulta] = useState()
    const [spinner, setSpinner] = useState(false)


    useEffect(() => {
        setIdConsulta(route.params.idConsulta)
        GetRecord(route.params.idConsulta)
    }, [route.params])


    const calculateAge = (dateOfBirth) => {
        const today = moment();
        const birthDate = moment(dateOfBirth);
        const years = today.diff(birthDate, 'years');
        return years;
    };

    const idade = calculateAge(route.params.dtNasc)

    async function GetRecord(id) {
        try {
            const response = await api.get(`/Consultas/BuscarPorId?id=${id}`)
            setDescricao(response.data.descricao)
            setDiagnostico(response.data.diagnostico)
            setReceita(response.data.receita.medicamento)

            const exame = await api.get(`/Exame/BuscarPorIdConsulta?idConsulta=${id}`)
            const descricoes = exame.data.map(item => item.descricao);
            setDescricaoExame(descricoes.join("\n"));
        } catch (error) {
            Alert.alert("erro ao buscar prontuario")
        }
    }

    async function UpdateRecord() {
        if (descricao != '' && diagnostico != '' && receita != '') {
            setSpinner(true)
            try {
                await api.put('/Consultas/Prontuario', {
                    consultaId: idConsulta,
                    medicamento: receita,
                    descricao: descricao,
                    diagnostico: diagnostico
                })
                GetRecord(idConsulta)
            } catch (error) {
                Alert.alert("Erro ao atualizar o prontuario")
            }
            setSpinner(false)
        }
    }

    async function OnPressHandle(){
        setRecordEdit(true)
        UpdateRecord()
    }

    async function CancelEdit() {
        setRecordEdit(true)
        GetRecord(idConsulta)
    }



    return (
        <ContainerScroll>
            {recordEdit ? (
                <>
                    <ProfileImage source={{ uri: route.params.photo }} />

                    <ContainerProfile>

                        <TitleProfile>{route.params.nome}</TitleProfile>
                        <ViewTitleRecord>
                            <SubtitleRecord>{idade} anos</SubtitleRecord>
                            <SubtitleRecord>{route.params.email}</SubtitleRecord>
                        </ViewTitleRecord>

                        <BoxInput
                            textLabel={'Descrição da consulta'}
                            fieldValue={descricao}
                            fieldHeight={150}
                            multiline={true}

                        />
                        <BoxInput
                            textLabel={'Diagnóstico do paciente'}
                            fieldValue={diagnostico}
                            fieldHeight={80}
                            multiline={true}
                        />
                        <BoxInput
                            textLabel={'Prescrição médica'}
                            fieldValue={receita}
                            fieldHeight={150}
                            multiline={true}
                        />
                        <BoxInput
                            textLabel={'Descricao do exame'}
                            fieldValue={descricaoExame}
                            fieldHeight={150}
                            multiline={true}
                        />
                        <Btn onPress={() => setRecordEdit(false)}>
                            <ButtonTitle>EDITAR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => { navigation.replace("Main") }}>Cancelar</LinkCancelMargin>
                    </ContainerProfile>

                </>
            ) : (
                <>
                    <ProfileImage source={{ uri: route.params.photo }} />

                    <ContainerProfile>

                        <TitleProfile>{route.params.nome}</TitleProfile>
                        <ViewTitleRecord>
                            <SubtitleRecord>{idade}</SubtitleRecord>
                            <SubtitleRecord>{route.params.email}</SubtitleRecord>
                        </ViewTitleRecord>

                        <BoxInput
                            textLabel={'Descrição da consulta'}
                            fieldValue={descricao}
                            onChangeText={setDescricao}
                            fieldHeight={150}
                            editable={true}
                            multiline={true}
                        />
                        <BoxInput
                            textLabel={'Diagnóstico do paciente'}
                            fieldValue={diagnostico}
                            onChangeText={setDiagnostico}
                            fieldHeight={80}
                            editable={true}
                            multiline={true}
                        />
                        <BoxInput
                            textLabel={'Prescrição médica'}
                            fieldValue={receita}
                            onChangeText={setReceita}
                            fieldHeight={150}
                            multiline={true}
                        />
                        <Btn disabled={spinner} onPress={() => OnPressHandle()}>
                            {
                                spinner ? (<ActivityIndicator size="small" color="#ffffff" />) : <ButtonTitle>SALVAR</ButtonTitle>
                            }
                        </Btn>

                        <LinkCancelMargin onPress={() => CancelEdit()}>Cancelar Edição</LinkCancelMargin>
                    </ContainerProfile>
                </>
            )}
        </ContainerScroll>
    )
}