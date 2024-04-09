import { useState } from "react"
import { ContainerProfile, ContainerScroll, ViewFormat, ViewTitleRecord } from "../../components/Container/Style"
import { ProfileImage } from "../../components/Images/Style"
import { ButtonTitle, EmailProfile, SubtitleRecord, TextRecord, TitleProfile } from "../../components/Title/Style"
import { Text } from "react-native"
import { BoxInput } from "../../components/BoxInput/Index"
import { Btn } from "../../components/Button/Button"
import { LinkCancelMargin } from "../../components/Link/Style"

export const MedicalRecord = ({navigation}) => {

    const [recordEdit, setRecordEdit] = useState(true)

    return (
        <ContainerScroll>
            {recordEdit ? (
                <>
                    <ProfileImage source={require("../../assets/photo.png")} />

                    <ContainerProfile>

                        <TitleProfile>Richard Kosta</TitleProfile>
                        <ViewTitleRecord>
                            <SubtitleRecord>22 anos</SubtitleRecord>
                            <SubtitleRecord>richard.kosta@gmail.com</SubtitleRecord>
                        </ViewTitleRecord>

                        <BoxInput
                            textLabel={'Descrição da consulta'}
                            placeholder={`O paciente possuí uma infecção no ouvido. Necessário repouse de 2 dias e acompanhamento médico constante`}
                            fieldHeight={150}
                            multiline={true}
                            
                        />
                        <BoxInput
                            textLabel={'Diagnóstico do paciente'}
                            placeholder={'Infecção no ouvido'}
                            fieldHeight={80}
                            multiline={true}
                        />
                        <BoxInput
                            textLabel={'Prescrição médica'} 
                            placeholder={`Medicamento: Advil                  Dosagem: 50 mg               Frequência: 3 vezes ao dia                Duração: 3 dias`}
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

                        <TitleProfile>Richard Kosta</TitleProfile>
                        <ViewTitleRecord>
                            <SubtitleRecord>22 anos</SubtitleRecord>
                            <SubtitleRecord>richard.kosta@gmail.com</SubtitleRecord>
                        </ViewTitleRecord>

                        <BoxInput
                            textLabel={'Descrição da consulta'}
                            placeholder={'Descricao'}
                            fieldHeight={150}
                            editable={true}
                            multiline={true}
                        />
                        <BoxInput
                            textLabel={'Diagnóstico do paciente'}
                            placeholder={'Diagnóstico'}
                            fieldHeight={80}                  
                            editable={true}
                            multiline={true}
                        />
                        <BoxInput
                            textLabel={'Prescrição médica'}
                            placeholder={'Prescrição médica'}
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