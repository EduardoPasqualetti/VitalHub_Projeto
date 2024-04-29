
import { BoxInput } from "../../components/BoxInput/Index"
import { ContainerProfile, ContainerScroll, Line, ViewInsertPhoto, ViewSuBTitlePrescription } from "../../components/Container/Style"
import { DoctorImage, PhotoTaked } from "../../components/Images/Style"
import { BtnProfile, SubtitleRecord, TitleCancelPhoto, TitleProfile } from "../../components/Title/Style"
import { BtnCancelPhoto, BtnInsertPhoto } from "../../components/Button/Button"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinkCancelMargin } from "../../components/Link/Style"
import { useEffect, useState } from "react"
import { InputExame } from "../../components/Input/Style"

export const SeePrescription = ({ navigation, route }) => {
    const { photoUri } = route.params || {};
    const [isPhoto, setIsPhoto] = useState(true)
    const [descricao, setDescricao] = useState('')
    const [diagnostico, setDiagnostico] = useState('')
    const [receita, setReceita] = useState('')
    const [nome, setNome] = useState('')
    const [crm, setCrm] = useState('')
    const [especialidade, setEspecialidade] = useState('')

    function onPressPhoto() {
        navigation.navigate("CameraPhoto", {isProfile: false});
        setIsPhoto(true)
    }

    function onPressCancel() {
        setIsPhoto(false);
    }

    useEffect(() => {
        if (route.params) {
            setDescricao(route.params.descricao)
            setDiagnostico(route.params.diagnostico)
            setReceita(route.params.receita)
            setNome(route.params.nome)
            setCrm(route.params.crm)
            setEspecialidade(route.params.especialidade)
        }

    }, [route.params])

    return (
        <ContainerScroll>
            <DoctorImage source={require("../../assets/doctor.png")} />
            <ContainerProfile>

                <TitleProfile>{nome}</TitleProfile>
                <ViewSuBTitlePrescription>
                    <SubtitleRecord>{especialidade}</SubtitleRecord>
                    <SubtitleRecord>CRM-{crm}</SubtitleRecord>
                </ViewSuBTitlePrescription>

                <BoxInput
                    multiline={true}
                    textLabel={"Descrição da consulta"}
                    fieldValue={descricao}
                    fieldHeight={150}
                />
                <BoxInput
                    multiline={true}
                    textLabel={"Diagnóstico do paciente"}
                    fieldValue={diagnostico}
                    fieldHeight={80}
                />
                <BoxInput
                    multiline={true}
                    textLabel={"Prescrição médica"}
                    fieldValue={receita}
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

                <BoxInput
                    placeholder={"Resultado do exame de sangue : tudo normal"}
                    multiline={true}
                    fieldHeight={120}
                    marginBottom={0}
                />

                <LinkCancelMargin onPress={() => { navigation.replace("Main") }}>Voltar</LinkCancelMargin>

            </ContainerProfile>
        </ContainerScroll>
    )
}