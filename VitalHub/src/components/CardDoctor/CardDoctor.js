
import { TextName } from "../CardClinic/Style"
import { Container, ImageDoctor, TextEspec, ViewData } from "./Style"

export const CardDoctor = ({name, espec, photo, isSelected, selected = true}) => {
    return(
        // Aqui estava o: isSelected
        <Container selected={selected}>
            <ImageDoctor source={photo}/>
            <ViewData>
                <TextName>{ medico.idNavigation.nome }</TextName>
                <TextEspec>{ medico.especialidade.especialidade1 }</TextEspec>
            </ViewData>
        </Container>
    )
}