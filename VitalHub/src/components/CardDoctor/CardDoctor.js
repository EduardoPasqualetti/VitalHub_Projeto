
import { TextName } from "../CardClinic/Style"
import { Container, ImageDoctor, TextEspec, ViewData } from "./Style"

export const CardDoctor = ({name, espec, photo, isSelected}) => {
    return(
        <Container isSelected={isSelected}>
            <ImageDoctor source={photo}/>
            <ViewData>
                <TextName>{name}</TextName>
                <TextEspec>{espec}</TextEspec>
            </ViewData>
        </Container>
    )
}