import { Image, Modal, StyleSheet, View } from "react-native"
import { Container } from "../Container/Style"
import { useEffect, useRef, useState } from "react"
import { BoxCamera, BtnCapture, BtnFlash, BtnFlip, ConfigBtnCapture } from "./Style"
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library'
import { Ionicons } from '@expo/vector-icons';
import { Btn, BtnReturn, BtnReturnPhoto, IconReturn } from "../Button/Button";
import { ButtonTitle } from "../Title/Style";
import { LinkCancel } from "../Link/Style";
import { EvilIcons } from '@expo/vector-icons';

export const CameraPhoto = ({ navigation, }) => {
    const cameraRef = useRef(null)
    const [photo, setPhoto] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.front)
    const [flashOn, setFlashOn] = useState(Camera.Constants.FlashMode.off);

    async function CapturePhoto() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync()
            setPhoto(photo.uri)


            setOpenModal(true)

        }
    }

    async function onPressToSend() {
        await setOpenModal(false)

        navigation.navigate("SeePrescription", { photoUri: photo })
    }

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()

            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync()
        })();
    }, [])

    return (
        <Container>
            <Camera
                ref={cameraRef}
                type={tipoCamera}
                style={styles.camera}
                flashMode={flashOn}
            >
                <BtnReturnPhoto onPress={() => navigation.navigate("SeePrescription")}>
                    <EvilIcons name="close-o" size={70} color="white" />
                </BtnReturnPhoto>
                <BoxCamera>

                    <BtnFlash onPress={() => setFlashOn(flashOn == FlashMode.on ? FlashMode.off : FlashMode.on)}>
                        <Ionicons name={flashOn === FlashMode.on ? "flash" : "flash-off"} size={42} color={flashOn === FlashMode.on ? "yellow" : "white"} />
                    </BtnFlash>

                    <BtnCapture onPress={() => CapturePhoto()}>
                        <ConfigBtnCapture></ConfigBtnCapture>
                    </BtnCapture>

                    <BtnFlip onPress={() => setTipoCamera(tipoCamera == CameraType.front ? CameraType.back : CameraType.front)}>
                        <FontAwesome6 name="camera-rotate" size={45} color="white" />
                    </BtnFlip>

                </BoxCamera>
            </Camera>


            <Modal
                animationType='slide'
                transparent={false}
                visible={openModal}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                    <Image
                        style={{ width: '100%', height: 500, borderRadius: 10 }}
                        source={{ uri: photo }}
                    />
                    <Btn onPress={() => onPressToSend()}>
                        <ButtonTitle >ENVIAR</ButtonTitle>
                    </Btn>

                    <LinkCancel onPress={() => setOpenModal(false)}>Refazer</LinkCancel>
                </View>

            </Modal>
        </Container>
    )
}


const styles = StyleSheet.create({
    camera: {
        flex: 1,
        height: '80%',
        width: '100%',
    }
})