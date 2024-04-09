
import { Container, TextAv, TextCalendar, TextLoc, TextName, View1, View2, ViewCalendar, ViewStar } from "./Style"
import { AntDesign } from '@expo/vector-icons';

export const CardClinic = ({ name, logradouro, numero, isSelected }) => {
    return (
        
            <Container isSelected={isSelected}>
                <View1>
                    <TextName>{name}</TextName>
                    <TextLoc>{logradouro}, {numero}</TextLoc>
                </View1>
                <View2>
                    <ViewStar>
                        <AntDesign name="star" size={20} color="#F9A620" />
                        <TextAv>4,8</TextAv>
                    </ViewStar>
                    <ViewCalendar>
                        <AntDesign name="calendar" size={15} color="#49B3BA" />
                        <TextCalendar>Seg-Sex</TextCalendar>
                    </ViewCalendar>

                </View2>
            </Container>

    )
}