import { useEffect, useState } from "react"
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
import AsyncStorage from "@react-native-async-storage/async-storage"
import { UserDecodeToken } from "../../Utils/Auth/auth"
import api from "../../service/Service"


export const Home = ({ navigation }) => {

    const [statusList, setStatusList] = useState("agendada")

    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalAppointment, setShowModalAppointment] = useState(false)
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [showModalSeeDoctor, setShowModalSeeDoctor] = useState(false)

    const [userLogin, setUserLogin] = useState("")
    const [doctorAppointments, setDoctorAppointments] = useState([])
    const [patientAppointments, setPatientAppointments] = useState([])
    const [token, setToken] = useState('')

    async function profileLoad() {
        const token = await UserDecodeToken();

        setUserLogin(token.role)
        
        
        setToken( token.token )
    }

    async function GetAppointments() {
        const token = await AsyncStorage.getItem('token')

        if (userLogin === "Medico") {
            console.log(token);
            await api.get("/Consultas/ConsultasMedico", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => setDoctorAppointments(response.data))
                .catch(error => console.log(error))
            console.log('doctor', doctorAppointments);

        } else if (userLogin === "Paciente") {

            await api.get("/Consultas/ConsultasPaciente", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => setPatientAppointments(response.data))
                .catch(error => console.log(error))
            console.log('paciente', patientAppointments);
        }
    }
    useEffect(() => {
        profileLoad()
        GetAppointments()
    }, [])


    return (
        userLogin == "Medico" ?
            <Container>
                <Header nome={'Dr. Joao'} ProfileImage={require('../../assets/medico.png')} onPress={() => navigation.replace("Profile")} />

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
                    data={doctorAppointments}
                    keyExtractor={(item) => item.id}

                    renderItem={ ({ item }) => {
                        if (statusList === 'agendada' && item.situacao.situacao === "Pendentes") {
                            return (
                                <TouchableOpacity onPress={() => { setShowModalAppointment(true) }}>
                                    <Card name={item.paciente.idNavigation.nome}
                                        status={item.situacao.situacao}
                                        age={item.paciente.dataNascimento}
                                        hour={item.horarioConsulta}
                                        typeAppointment={item.prioridade.prioridade}
                                        onPressCancel={() => setShowModalCancel(true)}
                                    />
                                </TouchableOpacity>
                            )
                        } else if (statusList === 'realizada' &&item.situacao.situacao === "Cancelados") {
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
                        } else if (statusList === 'cancelada' && item.situacao.situacao === "Realizados") {
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
                <Header nome={'Richard Kosta'} ProfileImage={require('../../assets/garro.jpeg')} onPress={() => navigation.replace("Profile")} />
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
                    data={patientAppointments}
                    keyExtractor={(item) => item.id}





                    renderItem={({ item }) => {
                        if (statusList === 'agendada' && item.status === "agendada") {
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
                        } else if (statusList === 'realizada' && item.status === "realizada") {
                            return (
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
                        } else if (statusList === 'cancelada' && item.status === "cancelada") {
                            return (
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