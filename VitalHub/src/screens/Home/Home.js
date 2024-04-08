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
import { UserDecodeToken } from "../../Utils/Auth/auth"
import api from "../../service/Service"
import moment from 'moment'


export const Home = ({ navigation }) => {

    const [statusList, setStatusList] = useState("agendada")

    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalAppointment, setShowModalAppointment] = useState(false)
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [showModalSeeDoctor, setShowModalSeeDoctor] = useState(false)

    const [userLogin, setUserLogin] = useState("")
    const [appointments, setAppointments] = useState([])

    const [dataConsulta,setDataConsulta] = useState('')
    const [patientInfo, setPatientInfo] = useState(null)
    const [doctorInfo, setDoctorInfo] = useState(null)

    async function profileLoad() {
        const token = await UserDecodeToken();

         setUserLogin(token)
        setDataConsulta( moment().format('YYYY-MM-DD'))
    }

    async function GetAppointments(){
        const url = (userLogin.role === 'Medico' ? 'Medicos' : 'Pacientes')

        await api.get(`/${url}/BuscarPorData?data=${dataConsulta}&id=${userLogin.jti}`)
        .then( response => {
            setAppointments(response.data);
            
            
        }).catch(error => {
            console.log(error);
        })
        
    }

    useEffect(() => {
        profileLoad();
    }, [])

    useEffect(() => {
        if (dataConsulta != '') {
            GetAppointments();
        }
        console.log(appointments);
    }, [dataConsulta])


    return (

        <Container>
            <Header nome={'Dr. Joao'} ProfileImage={userLogin.role === "Medico" ? require('../../assets/doctor.png') : require('../../assets/nicole.png')} onPress={() => navigation.replace("Profile")} />

            <CalendarHome setDataConsulta={setDataConsulta}/>


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

            {userLogin.role === "Medico" ?
                <ListComponent
                    data={appointments}
                    keyExtractor={(item) => item.id}

                    renderItem={({ item }) => {
                        if (statusList === 'agendada' && item.situacao.situacao === "Pendentes") {
                            return (
                                <TouchableOpacity onPress={() => { setPatientInfo({
                                    name: item.paciente.idNavigation.nome,
                                    email: item.paciente.idNavigation.email
                                }); setShowModalAppointment(true) }}>
                                    <Card name={item.paciente.idNavigation.nome}
                                        status={item.situacao.situacao}
                                        typeAppointment={item.prioridade.prioridade}
                                        onPressCancel={() => setShowModalCancel(true)}
                                        photo={require('../../assets/nicole.png')}
                                    />

                                </TouchableOpacity>

                            )
                        } else if (statusList === 'realizada' && item.situacao.situacao === "Realizados") {
                            return (
                                <Card name={item.paciente.idNavigation.nome}
                                    status={item.situacao.situacao}
                                    age={item.paciente.dataNascimento}
                                    typeAppointment={item.prioridade.prioridade}
                                    photo={require('../../assets/nicole.png')}
                                    onPressAppointment={() => {
                                        navigation.replace('MedicalRecord')
                                    }}
                                />

                            )
                        } else if (statusList === 'cancelada' && item.situacao.situacao === "Cancelados") {
                            return (
                                <Card name={item.paciente.idNavigation.nome}
                                    status={item.situacao.situacao}
                                    age={item.paciente.dataNascimento}
                                    typeAppointment={item.prioridade.prioridade}
                                    photo={require('../../assets/nicole.png')}
                                />
                            )
                        }
                    }}
                />
                :
                <>
                    <ListComponent
                        data={appointments}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            if (statusList === 'agendada' && item.situacao.situacao === "Pendentes") {
                                return (
                                    <TouchableOpacity onPress={() => { setShowModalSeeDoctor(true) }}>
                                        <Card name={null}
                                            status={item.situacao.situacao}
                                            typeAppointment={null}
                                            photo={require('../../assets/doctor.png')}
                                            onPressCancel={() => setShowModalCancel(true)}
                                        />
                                    </TouchableOpacity>
                                )
                            } else if (statusList === 'realizada' && item.situacao.situacao === "Realizados") {
                                return (
                                    <Card name={null}
                                        status={item.situacao.situacao}
                                        
                                        typeAppointment={null}
                                        photo={require('../../assets/doctor.png')}
                                        onPressAppointment={() => {
                                            navigation.replace('SeePrescription')
                                        }}
                                    />
                                )
                            } else if (statusList === 'cancelada' && item.situacao.situacao === "Cancelados") {
                                return (
                                    <Card name={null}
                                        status={item.situacao.situacao}
                                        
                                        typeAppointment={null}
                                        photo={require('../../assets/doctor.png')}
                                    />
                                )
                            }
                        }}
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
                        doctorInfo={doctorInfo}

                    />
                </>
            }

            <ModalCancel
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
            />

            <ModalAppointment
                visible={showModalAppointment}
                setShowModalAppointment={setShowModalAppointment}
                navigation={navigation}
                patientInfo={patientInfo}
            />


        </Container>


    )
}