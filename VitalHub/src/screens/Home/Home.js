import { useEffect, useState } from "react"
import { BtnAppointment } from "../../components/BtnAppointment/BtnAppointment"
import { CalendarHome } from "../../components/CalendarHome/CalendarHome"
import { Container, FilterAppointment, } from "../../components/Container/Style"
import { Header } from "../../components/Header/Header"
import { ListComponent } from "../../components/List/List"
import { Card } from "../../components/Card/Card"
import { ModalCancel } from "../../components/ModalCancel/ModalCancel"
import { ModalAppointment } from "../../components/ModalAppointment/ModalAppointment"
import { BtnSchedule } from "../../components/Button/Button"
import { FontAwesome } from '@expo/vector-icons';
import { ModalSchedule } from "../../components/ModalSchedule/ModalSchedule"
import { TouchableOpacity } from "react-native"
import { ModalSeeDoctor } from "../../components/ModalSeeDoctor/ModalSeeDoctor"
import { userDecodeToken } from "../../Utils/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../service/Service"

export const Home = ({ navigation }) => {
    const [dataConsulta, setDataConsulta] = useState()

    const [statusList, setStatusList] = useState("agendada")

    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalAppointment, setShowModalAppointment] = useState(false)
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [showModalSeeDoctor, setShowModalSeeDoctor] = useState(false)

    const [userLogin, setUserLogin] = useState("")
    const [doctorAppointments, setDoctorAppointments] = useState([])
    const [patientAppointments, setPatientAppointments] = useState([])
    const [token, setToken] = useState('')

    const [profile, setProfile] = useState({})
    const [consultas, setConsultas] = useState([])

    async function ChangeProfile() {
        const token = await userDecodeToken();

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


    async function profileLoad(){
        const token = await userDecodeToken()

        if (token != null) {
            setProfile(token);

            setDataConsulta( moment().format('YYYY-MM-DD') )
        }
    }

    async function listarConsultas() {
        const url = (profile.role = 'Medico' ? 'Medicos' : 'Pacientes')

        await api.get(`/${url}/BuscarPorData?data${dataConsulta}&id=${profile.user}`)
        .then( response => {
            setConsultas(response.data)

            console.log(response.data)

        }).catch( error => {
            console.log(error)
        } )
    }
    

    useEffect(() => {
        ChangeProfile()
        GetAppointments()
    }, [])

    
    useEffect(() => {
        profileLoad()
    }, [])


    useEffect(() => {
        if ( dataConsulta != '' ) {
            listarConsultas()
        }
    },[dataConsulta])


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
                    // data={Lista}
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
                    // data={Lista}
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