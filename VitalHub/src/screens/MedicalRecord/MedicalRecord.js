import { useEffect, useState } from "react"
import { ContainerProfile, ContainerScroll, ViewFormat, ViewTitleRecord } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, EmailProfile, SubtitleRecord, TextRecord, TitleProfile } from "../../components/Title/Style"
import { Text } from "react-native"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn } from "../../components/Button/Button"
import { LinkCancelMargin } from "../../components/Link/Style"
import moment from 'moment'

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
                            onChangeText={setDescricao}
                            fieldHeight={150}
                            editable={true}
                            multiline={true}
                        />
                        <BoxInput
                            textLabel={'Diagnóstico do paciente'}
                            onChangeText={setDiagnostico}
                            fieldHeight={80}                  
                            editable={true}
                            multiline={true}
                        />
                        <BoxInput
                            textLabel={'Prescrição médica'}
                            onChangeText={setReceita}
                            fieldHeight={150}
                            editable={true}
                            multiline={true}
                        />
                        <Btn onPress={() => setRecordEdit(true)}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </Btn>

                        <LinkCancelMargin onPress={() => {setRecordEdit(true)}}>Cancelar Edição</LinkCancelMargin>
                    </ContainerProfile>
                </>
            )}
        </ContainerScroll>
    )
}