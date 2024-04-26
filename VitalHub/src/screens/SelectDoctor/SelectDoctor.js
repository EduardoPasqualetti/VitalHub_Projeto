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
    const [doctorList,setDoctorList] = useState([])
    const [medicoClinica, setMedicoClinica] = useState('E5890F4F-ED8F-48EE-B3C7-43C8B168512E')


    async function GetDoctors() {
        await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.idClinica}`)
        .then(response => {setDoctorList(response.data)})
        .catch(error => {console.log(error)})
        
    }

    const onPressHandle = () => {
        setShowModalSchedule(true)
        navigation.navigate("Main");
    }

    useEffect(() => {
        GetDoctors()
    },[])

    return (
        <Container>
            <Title>Selecionar Medico</Title>

            {<ListComponent
                data={doctorList}
                renderItem={({ item }) =>
                (
                    <BtnSelect onPress={() => setSelectedDoctor(item.id)}>
                        <CardDoctor name={item.idNavigation.nome}
                            espec={item.especialidade.especialidade1}
                            isSelected={item.id == selectedDoctor}
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
                medicoClinica: medicoClinica,
                idPrioridade: route.params.idPrioridade,
                type: route.params.type,
                loc: route.params.loc,
                idMedico: selectedDoctor
            })}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Btn>
            <Cancel onPress={() => onPressHandle()}>Cancelar</Cancel>
        </Container>
    )
}