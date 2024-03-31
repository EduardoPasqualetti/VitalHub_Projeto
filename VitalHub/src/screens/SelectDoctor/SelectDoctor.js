import { useEffect, useState } from "react"
import { Btn } from "../../components/Button/Button"
import { CardDoctor } from "../../components/CardDoctor/CardDoctor"
import { Container } from "../../components/Container/Style"
import { ListComponent } from "../../components/List/List"
import { ButtonTitle } from "../../components/Title/Style"
import { BtnSelect, Cancel, Title } from "../SelectClinic/Style"
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule"
import api from "../../service/Service"



export const SelectDoctor = ({ navigation }) => {

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [doctorList,setDoctorList] = useState([])


    async function GetDoctors() {
        await api.get('/Medicos')
        .then(response => {setDoctorList(response.data)})
        .catch(error => {console.log(error)})
        console.log(doctorList);
        
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

            <Btn onPress={() => navigation.replace("SelectDate")}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Btn>
            <Cancel onPress={() => onPressHandle()}>Cancelar</Cancel>
        </Container>
    )
}