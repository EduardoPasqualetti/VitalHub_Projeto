import { useState } from "react"
import { BtnAppointment } from "../../components/BtnAppointment/BtnAppointment"
import { CalendarHome } from "../../components/CalendarHome/CalendarHome"
import { Container, FilterAppointment, } from "../../components/Container/Style"
import { Header } from "../../components/Header/Header"
import { ListComponent } from "../../components/List/List"
import { Card } from "../../components/Card/Card"
import { ModalCancel } from "../../components/ModalCancel/ModalCancel"
import { ModalAppointment } from "../../components/ModalAppointment/ModalAppointment"
import { BtnCard, BtnSchedule } from "../../components/Button/Button"
import { FontAwesome } from '@expo/vector-icons';
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule"
import { Text, TouchableOpacity } from "react-native"
import { ModalSeeDoctor } from "../../components/ModalSeeDoctor/ModalSeeDoctor"

const Lista = [
    {
        id: "1",
        nome: "Gabriel Victor",
        idade: "22",
        horarioConsulta: "14:00",
        tipoConsulta: "Rotina",
        status: "agendada",
        typeUser: "paciente"
    },
    {
        id: "4",
        nome: "Walter",
        idade: "22",
        horarioConsulta: "14:00",
        tipoConsulta: "Exame",
        status: "agendada",
        typeUser: "paciente"
    },
    {
        id: "2",
        nome: "Richard Kosta",
        idade: "28",
        horarioConsulta: "15:00",
        tipoConsulta: "Urgencia",
        status: "realizada",
        typeUser: "paciente"
    },
    {
        id: "3",
        nome: "Rubens",
        idade: "28",
        horarioConsulta: "15:00",
        tipoConsulta: "Urgencia",
        status: "cancelada",
        typeUser: "paciente"
    },
    {
        id: "5",
        nome: "Dr. Murilo",
        idade: "22",
        horarioConsulta: "14:00",
        tipoConsulta: "Rotina",
        status: "agendada",
        typeUser: "medico",

    },
    {
        id: "6",
        nome: "Dra. Vanessa",
        idade: "36",
        horarioConsulta: "15:20",
        tipoConsulta: "Urgencia",
        status: "realizada",
        typeUser: "medico",

    },
    {
        id: "7",
        nome: "Dra. Rafaela",
        idade: "28",
        horarioConsulta: "16:00",
        tipoConsulta: "Urgencia",
        status: "cancelada",
        typeUser: "medico",

    }
]

export const Home = ({ navigation }) => {

    const [statusList, setStatusList] = useState("agendada")

    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalAppointment, setShowModalAppointment] = useState(false)
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [showModalSeeDoctor, setShowModalSeeDoctor] = useState(false)

    const [userLogin, setUserLogin] = useState("paciente")


    return (
        userLogin == "medico" ?
            <Container>
                <Header nome={'Dr. Joao'} ProfileImage={require('../../assets/medico.png')} onPress={() => navigation.replace("Profile")}/>

                <CalendarHome />


                <FilterAppointment>

                    <BtnAppointment
                        textButton={'Agendadas'}
                        clickButton={statusList === 'agendada'}
                        onPress={() => setStatusList('agendada')}
                    />

                    <BtnAppointment
                        textButton={'Realizadas'}
                        clickButton={statusList === 'realizada'}
                        onPress={() => setStatusList('realizada')}
                    />

                    <BtnAppointment
                        textButton={'Canceladas'}
                        clickButton={statusList === 'cancelada'}
                        onPress={() => setStatusList('cancelada')} />


                </FilterAppointment>


                {/* Lista (FlatList)*/}
                <ListComponent
                    data={Lista}
                    keyExtractor={(item) => item.id}

                    renderItem={({ item }) => {
                        if (statusList === 'agendada' && item.status === "agendada" && item.typeUser == 'paciente') {
                            return (
                                <TouchableOpacity onPress={() => { setShowModalAppointment(true) }}>
                                    <Card name={item.nome}
                                        status={item.status}
                                        age={item.idade}
                                        hour={item.horarioConsulta}
                                        typeAppointment={item.tipoConsulta}
                                        onPressCancel={() => setShowModalCancel(true)}
                                    />
                                </TouchableOpacity>
                            )
                        } else if (statusList === 'realizada' && item.status === "realizada" && item.typeUser == 'paciente') {
                            return (
                                    <Card name={item.nome}
                                        status={item.status}
                                        age={item.idade}
                                        hour={item.horarioConsulta}
                                        typeAppointment={item.tipoConsulta}
                                        onPressAppointment={() => {
                                            navigation.replace('MedicalRecord')
                                        }}
                                    />

                            )
                        } else if (statusList === 'cancelada' && item.status === "cancelada" && item.typeUser == 'paciente') {
                            return (
                                    <Card name={item.nome}
                                        status={item.status}
                                        age={item.idade}
                                        hour={item.horarioConsulta}
                                        typeAppointment={item.tipoConsulta}
                                    />
                            )
                        }
                    }


                    }
                />

                <ModalCancel
                    visible={showModalCancel}
                    setShowModalCancel={setShowModalCancel}
                />

                <ModalAppointment
                    visible={showModalAppointment}
                    setShowModalAppointment={setShowModalAppointment}
                    navigation={navigation}

                />


            </Container>
            :
            <Container>
                <Header nome={'Richard Kosta'} ProfileImage={require('../../assets/garro.jpeg')} onPress={() => navigation.replace("Profile")}/>
                <CalendarHome />

                <FilterAppointment>
                    <BtnAppointment
                        textButton={'Agendadas'}
                        clickButton={statusList === 'agendada'}
                        onPress={() => setStatusList('agendada')}
                    />

                    <BtnAppointment
                        textButton={'Realizadas'}
                        clickButton={statusList === 'realizada'}
                        onPress={() => setStatusList('realizada')}
                    />

                    <BtnAppointment
                        textButton={'Canceladas'}
                        clickButton={statusList === 'cancelada'}
                        onPress={() => setStatusList('cancelada')}
                    />
                </FilterAppointment>

                <ListComponent
                    data={Lista}
                    keyExtractor={(item) => item.id}





                    renderItem={({ item }) => {
                        if (statusList === 'agendada' && item.status === "agendada" && item.typeUser == 'medico') {
                            return (
                                <TouchableOpacity onPress={() => { setShowModalSeeDoctor(true) }}>
                                    <Card name={item.nome}
                                        status={item.status}
                                        age={item.idade}
                                        hour={item.horarioConsulta}
                                        typeAppointment={item.tipoConsulta}
                                        onPressCancel={() => setShowModalCancel(true)}
                                    />
                                </TouchableOpacity>
                            )
                        } else if (statusList === 'realizada' && item.status === "realizada" && item.typeUser == 'medico') {
                            return(
                                    <Card name={item.nome}
                                        status={item.status}
                                        age={item.idade}
                                        hour={item.horarioConsulta}
                                        typeAppointment={item.tipoConsulta}
                                        onPressAppointment={() => {
                                            navigation.replace('SeePrescription')
                                        }}
                                    />
                            )
                        } else if (statusList === 'cancelada' && item.status === "cancelada" && item.typeUser == 'medico') {
                            return(
                                    <Card name={item.nome}
                                        status={item.status}
                                        age={item.idade}
                                        hour={item.horarioConsulta}
                                        typeAppointment={item.tipoConsulta}
                                        
                                    />
                            )
                        }
                    }}
                />


                <ModalCancel
                    visible={showModalCancel}
                    setShowModalCancel={setShowModalCancel}
                />

                <ModalAppointment
                    visible={showModalAppointment}
                    setShowModalAppointment={setShowModalAppointment}
                    navigation={navigation}
                />

                <BtnSchedule onPress={() => setShowModalSchedule(true)}>
                    <FontAwesome name="stethoscope" size={40} color="white" />
                </BtnSchedule>

                <ModalSchedule
                    visible={showModalSchedule}
                    navigation={navigation}
                    setShowModalSchedule={setShowModalSchedule}
                />

                <ModalSeeDoctor
                    visible={showModalSeeDoctor}
                    setShowModalSeeDoctor={setShowModalSeeDoctor}
                    navigation={navigation}

                />



            </Container>

    )
}