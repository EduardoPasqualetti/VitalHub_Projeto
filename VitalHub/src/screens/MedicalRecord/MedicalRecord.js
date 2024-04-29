import { useEffect, useState } from "react"
import { ContainerProfile, ContainerScroll, ViewFormat, ViewTitleRecord } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, EmailProfile, SubtitleRecord, TextRecord, TitleProfile } from "../../components/Title/Style"
import { Text } from "react-native"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn } from "../../components/Button/Button"
import { LinkCancelMargin } from "../../components/Link/Style"
import moment from 'moment'
import api from "../../service/Service"

export const MedicalRecord = ({navigation, route}) => {

    const [recordEdit, setRecordEdit] = useState(true)
    const [descricao, setDescricao] = useState('')
    const [diagnostico, setDiagnostico] = useState('')
    const [receita, setReceita] = useState('')
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [dtNasc, setDtNasc] = useState('')
    const [idConsulta, setIdConsulta] = useState('')


    useEffect(() => {
        console.log(route.params);
        setDescricao(route.params.descricao)
        setDiagnostico(route.params.diagnostico)
        setReceita(route.params.receita)
        setDtNasc(route.params.dtNasc)
        setNome(route.params.nome)
        setEmail(route.params.email)
        setIdConsulta(route.params.idConsulta)
    },[route.params])


    const calculateAge = (dateOfBirth) => {
        const today = moment();
        const birthDate = moment(dateOfBirth);
        const years = today.diff(birthDate, 'years');
        return years;
    };

    const idade = calculateAge(dtNasc)

    async function UpdateRecord() {
        try {
            await api.put('/Consultas/Prontuario',{
                consultaId: idConsulta,
                descricao: descricao,
                diagnostico: diagnostico
            })
            console.log("Prontuario atualizado com sucesso");
            navigation.replace("Main")
        } catch (error) {
            console.log(error);
        }
    }

    async function OnPressHandle() {
        UpdateRecord();
        setRecordEdit(true)
    }

    return (
        <ContainerScroll>
            {recordEdit ? (
                <>
                    <ProfileImage source={require("../../assets/photo.png")} />

                    <ContainerProfile>

                        <TitleProfile>{nome}</TitleProfile>
                        <ViewTitleRecord>
                            <SubtitleRecord>{idade}</SubtitleRecord>
                            <SubtitleRecord>{email}</SubtitleRecord>
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
                        <Btn onPress={() => setRecordEdit(false)}> 
                            <ButtonTitle>EDITAR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => {navigation.replace("Main")}}>Cancelar</LinkCancelMargin>
                    </ContainerProfile>

                </>
            ) : (
                <>
                    <ProfileImage source={require("../../assets/photo.png")} />

                    <ContainerProfile>

                        <TitleProfile>{nome}</TitleProfile>
                        <ViewTitleRecord>
                            <SubtitleRecord>{idade}</SubtitleRecord>
                            <SubtitleRecord>{email}</SubtitleRecord>
                        </ViewTitleRecord>

                        <BoxInput
                            textLabel={'Descrição da consulta'}
                            placeholder={descricao}
                            onChangeText={setDescricao}
                            fieldHeight={150}
                            editable={true}
                            multiline={true}
                        />
                        <BoxInput
                            textLabel={'Diagnóstico do paciente'}
                            placeholder={diagnostico}
                            onChangeText={setDiagnostico}
                            fieldHeight={80}                  
                            editable={true}
                            multiline={true}
                        />
                        <BoxInput
                            textLabel={'Prescrição médica'}
                            placeholder={receita}
                            onChangeText={setReceita}
                            fieldHeight={150}
                            editable={true}
                            multiline={true}
                        />
                        <Btn onPress={() => OnPressHandle()}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => setRecordEdit(true)}>Cancelar Edição</LinkCancelMargin>
                    </ContainerProfile>
                </>
            )}
        </ContainerScroll>
    )
}