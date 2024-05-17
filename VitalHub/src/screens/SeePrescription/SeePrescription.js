
import { BoxInput } from "../../components/BoxInput/Index"
import { ContainerProfile, ContainerScroll, Line, ViewInsertPhoto, ViewSuBTitlePrescription } from "../../components/Container/Style"
import { DoctorImage, PhotoTaked } from "../../components/Images/Style"
import { BtnProfile, SubtitleRecord, TitleCancelPhoto, TitleProfile } from "../../components/Title/Style"
import { BtnCancelPhoto, BtnInsertPhoto } from "../../components/Button/Button"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinkCancel } from "../../components/Link/Style"
import { Alert } from "react-native"
import { useEffect, useState } from "react"
import { InputExame } from "../../components/Input/Style"
import api from "../../service/Service"

export const SeePrescription = ({ navigation, route }) => {
    const { photoUri } = route.params || {};
    const [isPhoto, setIsPhoto] = useState(true)

    const [dadosConsulta, setDadosConsulta] = useState()
    const [descricaoExame, setDescricaoExame] = useState()

    function onPressPhoto() {
        setIsPhoto(true)
        navigation.navigate("CameraPhoto", { isProfile: false });

    }

    function onPressCancel() {
        setIsPhoto(false);
        if (photoUri != '') {
            route.params.photoUri = '';
        }
    }

    async function InserirExame() {
        const formData = new FormData();
        formData.append("ConsultaId", dadosConsulta.consulta)
        formData.append("Imagem", {
            uri: photoUri,
            name: `image.${photoUri.split('.').pop()}`,
            type: `image/${photoUri.split('.').pop()}`
        });

        await api.post(`/Exame/Cadastrar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            setDescricaoExame(descricaoExame + "/n" + response.data.descricao)
        }).catch((error) => {
            Alert.alert("Erro ao inserir o exame");
        })
        GetExame(dadosConsulta.consultaId)
    }

    async function GetExame(id) {
        try {
            const response = await api.get(`/Exame/BuscarPorIdConsulta?idConsulta=${id}`)
            const descricoes = response.data.map(item => item.descricao);
            setDescricaoExame(descricoes.join("\n"));
        } catch (error) {
            // Alert.alert("Erro ao recuperar dados do exame")
        }
    }

    useEffect(() => {
        if (route.params.home) {
            setDadosConsulta({
                nome: route.params.nome,
                crm: route.params.crm,
                descricao: route.params.descricao,
                diagnostico: route.params.diagnostico,
                receita: route.params.receita,
                especialidade: route.params.especialidade,
                foto: route.params.photo,
                consulta: route.params.consultaId
            })
            GetExame(route.params.consultaId)
        }
    }, [route.params])

    useEffect(() => {
        if (photoUri) {
            InserirExame()
        }
    }, [photoUri])


    return (
        <>
            {
                dadosConsulta ? (
                    <ContainerScroll>
                        <DoctorImage source={{ uri: dadosConsulta.foto }} />
                        <ContainerProfile>
                            <TitleProfile>{dadosConsulta.nome}</TitleProfile>
                            <ViewSuBTitlePrescription>
                                <SubtitleRecord>{dadosConsulta.especialidade}</SubtitleRecord>
                                <SubtitleRecord>CRM-{dadosConsulta.crm}</SubtitleRecord>
                            </ViewSuBTitlePrescription>

                            <BoxInput
                                multiline={true}
                                textLabel={"Descrição da consulta"}
                                fieldValue={dadosConsulta.descricao}
                                fieldHeight={150}
                            />
                            <BoxInput
                                multiline={true}
                                textLabel={"Diagnóstico do paciente"}
                                fieldValue={dadosConsulta.diagnostico}
                                fieldHeight={80}
                            />
                            <BoxInput
                                multiline={true}
                                textLabel={"Prescrição médica"}
                                fieldValue={dadosConsulta.receita}
                                fieldHeight={150}
                            />

                            <InputExame>Exame medico</InputExame>
                            {
                                photoUri && isPhoto ?
                                    <PhotoTaked
                                        source={{ uri: photoUri }}
                                        resizeMode="contain"
                                    /> :
                                    <BoxInput
                                        placeholder={`Nenhuma foto informada`}
                                        fieldHeight={150}
                                        marginBottom={0}
                                    />
                            }
                            <ViewInsertPhoto>

                                <BtnInsertPhoto onPress={() => { !photoUri ? onPressPhoto() : null }}>
                                    <MaterialCommunityIcons name="camera-plus-outline" size={26} color="white" />
                                    <BtnProfile>Enviar</BtnProfile>
                                </BtnInsertPhoto>
                                <BtnCancelPhoto onPress={() => onPressCancel()}>
                                    <TitleCancelPhoto>Cancelar</TitleCancelPhoto>
                                </BtnCancelPhoto>

                            </ViewInsertPhoto>
                            <Line></Line>

                            <InputExame>Descricao do Exame:</InputExame>
                            <BoxInput
                                placeholder={"Descricao do exame"}
                                multiline={true}
                                fieldHeight={120}
                                fieldValue={descricaoExame}
                            />

                            <LinkCancel onPress={() => { navigation.replace("Main") }}>Voltar</LinkCancel>

                        </ContainerProfile>
                    </ContainerScroll>
                ) : (
                    <>
                    </>
                )
            }
        </>
    )
}