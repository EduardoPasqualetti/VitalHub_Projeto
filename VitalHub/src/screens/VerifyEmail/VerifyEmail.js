import { Btn, BtnReturn, IconClose } from "../../components/Button/Button"
import { Container, ContentCode } from "../../components/Container/Style"
import { InputCode } from "../../components/Input/Style"
import { LinkResend } from "../../components/Link/Style"
import { Logo } from "../../components/Logo/Style"
import { ButtonTitle, TextRec, TextUser, Title } from "../../components/Title/Style"

export const VerifyEmail = ({ navigation }) => {
    return (
        <Container>
            
            <BtnReturn onPress={() => navigation.navigate("Login")}>
                 <IconClose  source={require("../../assets/close.png")}/>
            </BtnReturn>

            <Logo source={require('../../assets/logo.png')}></Logo>

            <Title>Verifique seu e-mail</Title>

            <TextRec>Digite o código de 4 dígitos enviado para</TextRec>
            <TextUser>username@email.com</TextUser>

            <ContentCode>
                <InputCode placeholder={'0'}></InputCode>
                <InputCode placeholder={'0'}></InputCode>
                <InputCode placeholder={'0'}></InputCode>
                <InputCode placeholder={'0'}></InputCode>
            </ContentCode>

            <Btn onPress={() => navigation.replace("ResetPwd")}>
                <ButtonTitle>ENTRAR</ButtonTitle>
            </Btn>

            <LinkResend>Reenviar Código</LinkResend>

        </Container>
    )
} 