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


    async function GetDoctors() {
        await api.get(`/Medicos/ListaMedico?id=${route.params.agendamento.clinicaId}`)
            .then(response => { setDoctorList(response.data) })
            .catch(error => { console.log(error) })

    }

    function onPressCancel() {
        setShowModalSchedule(true)
        navigation.navigate("Main");
    }

    function onPressContinue() {
        if (selectedDoctor == null) {
            alert("Necessario selecionar um medico")
        } else
            navigation.replace("SelectDate", {
                agendamento: {
                    ...route.params.agendamento,
                    ...selectedDoctor
                }
            })
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

            <Btn onPress={() => onPressContinue()}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Btn>
            <Cancel onPress={() => onPressCancel()}>Cancelar</Cancel>
        </Container>
    )
}