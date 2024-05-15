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
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { ModalSeeDoctor } from "../../components/ModalSeeDoctor/ModalSeeDoctor"
import { UserDecodeToken } from "../../Utils/Auth/auth"
import api from "../../service/Service"
import moment from 'moment'
import {  TextRec } from "../../components/Title/Style"

export const Home = ({ navigation }) => {

    const [statusList, setStatusList] = useState("agendada")

    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalAppointment, setShowModalAppointment] = useState(false)
    const [showModalSchedule, setShowModalSchedule] = useState(false)
    const [showModalSeeDoctor, setShowModalSeeDoctor] = useState(false)

    const [userLogin, setUserLogin] = useState("")
    const [appointments, setAppointments] = useState([])

    const [dataConsulta, setDataConsulta] = useState('')
    const [patientInfo, setPatientInfo] = useState(null);
    const [doctorInfo, setDoctorInfo] = useState(null)
    const [idConsulta, setIdConsulta] = useState(null)
    const [city, setCity] = useState(null);

    const emptyComponent = () => {
        return (
            <View style={{ width: '100%', height: 100, alignItems: 'center' }}>
                <TextRec>Nenhuma consulta {statusList} nesse dia</TextRec>
            </View>
        )
    }

    async function profileLoad() {
        const token = await UserDecodeToken();

        setUserLogin(token)
        setDataConsulta(moment().format('YYYY-MM-DD'))
    }

    async function GetAppointments() {
        const url = (userLogin.role === 'Medico' ? 'Medicos' : 'Pacientes')

        await api.get(`/${url}/BuscarPorData?data=${dataConsulta}&id=${userLogin.jti}`)

            .then(response => {
                setAppointments(response.data);
            }).catch(error => {
                Alert.alert("Erro ao buscar as consulta desse dia")
            })
    }

    async function GetCity() {
        try {
          response = await api.get(`Clinica/ListarClinicasEndereco`)
          setCity(response.data);
        } catch (error) {
          console.log(error);
        }
      }

    useEffect(() => {
        profileLoad();
        GetCity()
    }, [])

    useEffect(() => {
        if (dataConsulta != '') {
            GetAppointments();
        }
    }, [dataConsulta])



    const calculateAge = (dateOfBirth) => {
        const today = moment();
        const birthDate = moment(dateOfBirth);
        const years = today.diff(birthDate, 'years');
        return years;
    };

    return (

        <Container>
            <Header onPress={() => navigation.replace("Profile")} />

            <CalendarHome setDataConsulta={setDataConsulta} />


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
                    ListEmptyComponent={emptyComponent}
                    renderItem={({ item }) => {
                        if (statusList === 'agendada' && item.situacao.situacao === "Pendentes") {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setPatientInfo({
                                        name: item.paciente.idNavigation.nome,
                                        email: item.paciente.idNavigation.email,
                                        idConsulta: item.id,
                                        dtNasc: item.paciente.dataNascimento,
                                        photo: item.paciente.idNavigation.foto
                                    }); setShowModalAppointment(true)
                                }}>
                                    <Card name={item.paciente.idNavigation.nome}
                                        status={item.situacao.situacao}
                                        age={calculateAge(item.paciente.dataNascimento)}
                                        typeAppointment={item.prioridade.prioridade}
                                        onPressCancel={() => { setIdConsulta(item.id); setShowModalCancel(true) }}
                                        photo={{ uri: item.paciente.idNavigation.foto }}
                                        timeConsulta={item.dataConsulta}
                                    />
                                </TouchableOpacity>
                            )
                        } else if (statusList === 'realizada' && item.situacao.situacao === "Realizados") {
                            return (
                                <Card name={item.paciente.idNavigation.nome}
                                    status={item.situacao.situacao}
                                    age={calculateAge(item.paciente.dataNascimento)}
                                    typeAppointment={item.prioridade.prioridade}
                                    photo={{ uri: item.paciente.idNavigation.foto }}
                                    timeConsulta={item.dataConsulta}
                                    onPressAppointment={() => {
                                        navigation.replace('MedicalRecord', {
                                            descricao: item.descricao,
                                            diagnostico: item.diagnostico,
                                            receita: item.receita.medicamento,
                                            idReceita: item.receita.id,
                                            dtNasc: item.paciente.dataNascimento,
                                            nome: item.paciente.idNavigation.nome,
                                            email: item.paciente.idNavigation.email,
                                            idConsulta: item.id,
                                            photo: item.paciente.idNavigation.foto,
                                        })
                                    }}
                                />
                            )
                        } else if (statusList === 'cancelada' && item.situacao.situacao === "Cancelados") {
                            return (
                                <Card name={item.paciente.idNavigation.nome}
                                    status={item.situacao.situacao}
                                    age={calculateAge(item.paciente.dataNascimento)}
                                    typeAppointment={item.prioridade.prioridade}
                                    photo={{ uri: item.paciente.idNavigation.foto }}
                                    timeConsulta={item.dataConsulta}
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
                        ListEmptyComponent={emptyComponent}
                        renderItem={({ item }) => {
                            if (statusList === 'agendada' && item.situacao.situacao === "Pendentes") {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setDoctorInfo({
                                            name: item.medicoClinica.medico.idNavigation.nome,
                                            crm: item.medicoClinica.medico.crm,
                                            especialidade: item.medicoClinica.medico.especialidade.especialidade1,
                                            clinica: item.medicoClinica.clinicaId,
                                            photo: item.medicoClinica.medico.idNavigation.foto
                                        }); setShowModalSeeDoctor(true)
                                    }}>
                                        <Card
                                            doctor={true}
                                            name={item.medicoClinica.medico.idNavigation.nome}
                                            status={item.situacao.situacao}
                                            crm={item.medicoClinica.medico.crm}
                                            typeAppointment={item.prioridade.prioridade}
                                            photo={{ uri: item.medicoClinica.medico.idNavigation.foto }}
                                            onPressCancel={() => { setIdConsulta(item.id), setShowModalCancel(true) }}
                                            timeConsulta={item.dataConsulta}
                                        />
                                    </TouchableOpacity>
                                )
                            } else if (statusList === 'realizada' && item.situacao.situacao === "Realizados") {
                                return (
                                    <Card
                                        doctor={true}
                                        name={item.medicoClinica.medico.idNavigation.nome}
                                        status={item.situacao.situacao}
                                        crm={item.medicoClinica.medico.crm}
                                        typeAppointment={item.prioridade.prioridade}
                                        photo={{ uri: item.medicoClinica.medico.idNavigation.foto }}
                                        timeConsulta={item.dataConsulta}
                                        onPressAppointment={() => {
                                            navigation.replace('SeePrescription', {
                                                home: true,
                                                descricao: item.descricao,
                                                diagnostico: item.diagnostico,
                                                nome: item.medicoClinica.medico.idNavigation.nome,
                                                crm: item.medicoClinica.medico.crm,
                                                especialidade: item.medicoClinica.medico.especialidade.especialidade1,
                                                receita: item.receita.medicamento,
                                                consultaId: item.id,
                                                photo: item.medicoClinica.medico.idNavigation.foto
                                            })
                                        }}
                                    />
                                )
                            } else if (statusList === 'cancelada' && item.situacao.situacao === "Cancelados") {
                                return (
                                    <Card
                                        doctor={true}
                                        name={item.medicoClinica.medico.idNavigation.nome}
                                        status={item.situacao.situacao}
                                        crm={item.medicoClinica.medico.crm}
                                        typeAppointment={item.prioridade.prioridade}
                                        photo={{ uri: item.medicoClinica.medico.idNavigation.foto }}
                                        timeConsulta={item.dataConsulta}
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
                        city={city}
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
                idConsulta={idConsulta}
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