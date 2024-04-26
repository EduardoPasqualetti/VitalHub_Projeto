
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

    const [selectedClinic, setSelectedClinic] = useState(null);
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [clinicList, setClinicList] = useState([])
    const [idPrioridade, setIdPrioridade] = useState()

    function Prioridade() {
        if (route.params.type === 'Rotina') {
            setIdPrioridade('1A97B012-4B63-403D-8E11-864EE1537E02')
        } else if (route.params.type === 'Exame') {
            setIdPrioridade('C568D663-7FAD-4696-896F-D0890D7BD1DA')
        } else {
            setIdPrioridade('6F9EDEB1-2CC7-4681-BE83-A377C0F3C8DE')
        }
    }
    

    async function GetClinics() {
        await api.get(`/Clinica/BuscarPorCidade?cidade=${route.params.loc}`)
            .then(response => setClinicList(response.data))
            .catch(error => console.log(error))
    }

    const onPressHandle = () => {
        setShowModalSchedule(true)
        navigation.navigate("Main");
    }

    useEffect(() => {
        GetClinics()
        Prioridade()
    }, [route.params])

    useEffect(() => {
        console.log(idPrioridade);
        console.log(selectedClinic);
    },[idPrioridade])

    return (
        <Container>
            <Title>Selecionar clinica</Title>

            {<ListComponent
                data={clinicList}
                renderItem={({ item }) =>
                (
                    <BtnSelect onPress={() => setSelectedClinic(item.id)}>
                        <CardClinic name={item.nomeFantasia}
                            logradouro={item.endereco.logradouro}
                            numero={item.endereco.numero}
                            aval={item.Avaliacao}
                            date={item.Abertura}
                            isSelected={item.id == selectedClinic}

                        />
                    </BtnSelect>

                )}
            />}

            <ModalSchedule
                visible={showModalSchedule}
                navigation={navigation}
                setShowModalSchedule={setShowModalSchedule}
            />

            <Btn onPress={() => { navigation.replace("SelectDoctor", {
                idClinica: selectedClinic,
                idPrioridade: idPrioridade,
                type: route.params.type,
                loc: route.params.loc
            }) }}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Btn>
            <Cancel onPress={() => onPressHandle()}>Cancelar</Cancel>
        </Container>


    )
}