import { useEffect, useState } from "react"
import { Btn } from "../../components/Button/Button"
import { CardDoctor } from "../../components/CardDoctor/CardDoctor"
import { Container } from "../../components/Container/Style"
import { ListComponent } from "../../components/List/List"
import { ButtonTitle } from "../../components/Title/Style"
import { BtnSelect, Cancel, Title } from "../SelectClinic/Style"
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule"
import api from "../../service/Service"



export const SelectDoctor = ({ navigation, route }) => {

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [doctorList, setDoctorList] = useState([])
    const [medicoClinica, setMedicoClinica] = useState('E5890F4F-ED8F-48EE-B3C7-43C8B168512E')


    async function GetDoctors() {
        await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)
            .then(response => { setDoctorList(response.data) })
            .catch(error => { console.log(error) })

    }

    const onPressCancel = () => {
        setShowModalSchedule(true)
        navigation.navigate("Main");
    }

    useEffect(() => {
        GetDoctors()
    }, [route])

    return (
        <Container>
            <Title>Selecionar Medico(a)</Title>

            {<ListComponent
                data={doctorList}
                renderItem={({ item }) =>
                (
                    <BtnSelect onPress={() => setSelectedDoctor({
                        medicoId: item.id,
                        medicoLabel: item.idNavigation.nome,
                        especialidade: item.especialidade.especialidade1
                    })}>
                        <CardDoctor name={item.idNavigation.nome}
                            espec={item.especialidade.especialidade1}
                            isSelected={selectedDoctor ? item.id == selectedDoctor.medicoId : false}
                            photo={require("../../assets/doctor.png")}
                        />
                    </BtnSelect>

                )}
            />}

            <ModalSchedule
                visible={showModalSchedule}
                navigation={navigation}
                setShowModalSchedule={setShowModalSchedule}
            />

            <Btn onPress={() => navigation.replace("SelectDate", {
                agendamento: {
                    ...route.params.agendamento,
                    ...selectedDoctor
                }
            })}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Btn>
            <Cancel onPress={() => onPressCancel()}>Cancelar</Cancel>
        </Container>
    )
}