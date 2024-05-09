
import { Container } from "../../components/Container/Style"
import { BtnSelect, Cancel, Title } from "./Style"
import { Btn } from "../../components/Button/Button"
import { ButtonTitle } from "../../components/Title/Style"
import { ListComponent } from "../../components/List/List"
import { CardClinic } from "../../components/CardClinic/CardClinic"
import { useEffect, useState } from "react"
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule"
import api from "../../service/Service"

export const SelectClinic = ({ navigation, route }) => {

    const [selectedClinic, setSelectedClinic] = useState()
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [clinicList, setClinicList] = useState([])


    async function GetClinics() {
        await api.get(`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`)
            .then(response => setClinicList(response.data))
            .catch(error => console.log(error))
    }

    function onPressCancel() {
        setShowModalSchedule(true)
        navigation.navigate("Main");
    }

    function onPressContinue() {
        if (selectedClinic == null) {
            alert("Necessario selecionar uma clinica")
        } else
            navigation.replace("SelectDoctor", {
                agendamento: {
                    ...route.params.agendamento,
                    ...selectedClinic
                }
            })
    }

    useEffect(() => {
        GetClinics()
    }, [route.params])


    return (
        <Container>
            <Title>Selecionar clinica</Title>

            {<ListComponent
                data={clinicList}
                renderItem={({ item }) =>
                (
                    <BtnSelect onPress={() => setSelectedClinic({
                        clinicaId: item.id,
                        clinicaNome: item.nomeFantasia
                    })}>
                        <CardClinic name={item.nomeFantasia}
                            logradouro={item.endereco.logradouro}
                            numero={item.endereco.numero}
                            aval={item.Avaliacao}
                            date={item.Abertura}
                            isSelected={selectedClinic ? item.id == selectedClinic.clinicaId : false}

                        />
                    </BtnSelect>

                )}
            />}

            <ModalSchedule
                visible={showModalSchedule}
                navigation={navigation}
                setShowModalSchedule={setShowModalSchedule}
            />

            <Btn onPress={() => onPressContinue()}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Btn>
            <Cancel onPress={() => onPressCancel()}>Cancelar</Cancel>
        </Container>


    )
}