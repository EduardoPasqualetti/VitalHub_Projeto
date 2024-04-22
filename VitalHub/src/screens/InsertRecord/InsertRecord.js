import { useEffect, useState } from "react"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn } from "../../components/Button/Button"
import { ContainerProfile, ContainerScroll, ViewTitleRecord } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { LinkCancelMargin } from "../../components/Link/Style"
import { ButtonTitle, SubtitleRecord, TitleProfile } from "../../components/Title/Style"
import api from "../../service/Service"

export const InsertRecord = ({navigation, route}) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [idade, setIdade] = useState();
    const [idConsulta, setIdConsulta] = useState()
    const [descricao, setDescricao] = useState()
    const [diagnostico, setDiagnostico] = useState()
    const [receita, setReceita] = useState()


    useEffect(() => {
        console.log(route.params);
        setName(route.params.name)
        setEmail(route.params.email)
        setIdade(route.params.idade)
        setIdConsulta(route.params.idConsulta)
    },[route.params])


    async function InsertRecord() {
        try {
            await api.put('/Consultas/Prontuario',{
                consultaId: idConsulta,
                descricao: descricao,
                diagnostico: diagnostico
            })
            console.log("Prontuario Inserido com sucesso");
            navigation.replace("Main")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ContainerScroll>
            <ProfileImage source={require("../../assets/photo.png")} />

            <ContainerProfile>
                <TitleProfile>{name}</TitleProfile>
                <ViewTitleRecord>
                    <SubtitleRecord>{idade}</SubtitleRecord>
                    <SubtitleRecord>{email}</SubtitleRecord>
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

                <Btn onPress={() => InsertRecord()}>
                    <ButtonTitle>SALVAR</ButtonTitle>
                </Btn>

                <LinkCancelMargin onPress={() => navigation.replace("Main")}>Cancelar</LinkCancelMargin>
            </ContainerProfile>
        </ContainerScroll>
    )
}