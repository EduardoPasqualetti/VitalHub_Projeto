import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { BoxInput } from "../../components/BoxInput/Index"
import { Container, ContainerMap, ViewFormat, ViewLocal } from "../../components/Container/Style"
import { LinkCancelMargin } from "../../components/Link/Style"
import { SubTitleModalResume, TitleProfile } from "../../components/Title/Style"
import { ActivityIndicator, StyleSheet, Text } from "react-native"
import { mapskey } from "../../Utils/MapsKey/mapsApiKey"
import {
    requestForegroundPermissionsAsync, // solicita o acesso a localizacao
    getCurrentPositionAsync,  //recebe a localizacao atual

    watchPositionAsync,
    LocationAccuracy,

} from 'expo-location'
import { useEffect, useRef, useState } from "react"
import MapViewDirections from "react-native-maps-directions"

export const SeeLocalAppointment = ({ navigation }) => {
    const mapReference = useRef(null)
    const [initialPosition, setInitialPosition] = useState(null)
    const [finalPosition, setFinalPosition] = useState({
        latitude: -23.6497517,
        longitude: -46.5624046
    })


    async function CapturarLocalizacao() {
        const { granted } = await requestForegroundPermissionsAsync()

        if (granted) {
            const captureLocation = await getCurrentPositionAsync()

            setInitialPosition(captureLocation)
        }
    }

    useEffect(() => {
        CapturarLocalizacao()


        // monitora em tempo real
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        }, async (response) => {
            // recebe e guarda a nova localizacao
            await setInitialPosition(response)

            mapReference.current?.animateCamera({
                pitch: 60,
                center: response.coords
            })

        })
    }, [1000])

    useEffect(() => {
        RecarregarVizualizacaoMapa()
    }, [initialPosition])

    async function RecarregarVizualizacaoMapa() {
        if (mapReference.current && initialPosition) {
            await mapReference.current.fitToCoordinates(
                [{ latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude },
                { latitude: finalPosition.latitude, longitude: finalPosition.longitude }
                ],
                {
                    edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
                    animated: true
                }
            )
        }
    }

    return (
        <Container>
            <ContainerMap>
                {
                    initialPosition != null

                        ?
                        <MapView
                            initialRegion={{
                                latitude: initialPosition.coords.latitude,
                                longitude: initialPosition.coords.longitude,
                                longitudeDelta: 0.005,
                                latitudeDelta: 0.005,

                            }}
                            customMapStyle={grayMapStyle}
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                        >
                            <Marker
                                coordinate={{
                                    latitude: initialPosition.coords.latitude,
                                    longitude: initialPosition.coords.longitude,
                                    longitudeDelta: 0.005,
                                    latitudeDelta: 0.005,
                                }}
                                title='Clinica Aqui'
                                description='Marcador que representa localizacao da clinica'
                                pinColor={'blue'}
                            />
                            <MapViewDirections
                                origin={initialPosition.coords}
                                destination={{
                                    latitude: -23.6497517,
                                    longitude: -46.5624046,
                                    longitudeDelta: 0.005,
                                    latitudeDelta: 0.005,
                                }}
                                apikey={mapskey}
                                strokeWidth={5}
                                strokeColor='#496BBA'
                            />
                            <Marker
                                coordinate={{
                                    latitude: finalPosition.latitude,
                                    longitude: finalPosition.longitude,
                                    longitudeDelta: 0.005,
                                    latitudeDelta: 0.005,
                                }}
                                title='Voce esta aqui'
                                description='Marcador que representa sua localizacao'
                                pinColor={'red'}
                            />
                        </MapView>
                        :
                        <>
                            <Text>Localizacao nao Encontrada</Text>

                            <ActivityIndicator />
                        </>
                }
            </ContainerMap>
            <ViewLocal>
                <TitleProfile>Clínica Natureh</TitleProfile>
                <SubTitleModalResume>São Paulo, SP</SubTitleModalResume>

                <BoxInput
                    textLabel={'Endereco'}
                    placeholder={'Rua Vicenso Silva, 987'}
                />
                <ViewFormat>

                    <BoxInput
                        textLabel={'Número'}
                        placeholder={'578'}
                        fieldWidth={45}
                    />
                    <BoxInput
                        textLabel={'Bairro'}
                        placeholder={'Moema-SP'}
                        fieldWidth={46}
                    />

                </ViewFormat>
                <LinkCancelMargin onPress={() => { navigation.navigate("Main") }}>Voltar</LinkCancelMargin>
            </ViewLocal>
        </Container>
    )
}



const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%',

    }
});


const grayMapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#E1E0E7",
            },
        ],
    },
    {
        elementType: "geometry.fill",
        stylers: [
            {
                saturation: -5,
            },
            {
                lightness: -5,
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#FBFBFB",
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#33303E",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "poi.business",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#66DA9F",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1B1B1B",
            },
        ],
    },
    {
        featureType: "road",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#C6C5CE",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#FBFBFB",
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#ACABB7",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#8C8A97",
            },
        ],
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
            {
                color: "#8C8A97",
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#8EA5D9",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
]