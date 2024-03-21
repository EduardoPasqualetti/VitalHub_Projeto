import { Calendar, LocaleConfig } from 'react-native-calendars';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DayContainer, DayText } from './Style';

LocaleConfig.locales['br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    dayNames: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: "Atualmente"
};
LocaleConfig.defaultLocale = 'br';

export default function FullCalender({ selectedDate = '', handleSelectedDateFn = null }) {
    const currentDate = new Date().toUTCString();

    // Função para renderizar o cabeçalho do calendário com a fonte personalizada
    const renderHeader = (date) => {
        return (
            <TouchableOpacity>
                <Text style={styles.headerText}>{LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames[date.getMonth()]} {date.getFullYear()}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <Calendar
            minDate={currentDate}
            monthFormat='MMMM yyyy'
            enableSwipeMonths={true}
            hideArrows={true}
            style={styles.calendar}
            theme={{
                dotColor: '#60BFC5',
                calendarBackground: 'transparent'
                
            }}
            renderHeader={renderHeader} // Renderizar o cabeçalho personalizado
            dayComponent={({ date, state }) =>
                <TouchableOpacity style={styles.button} onPress={() => {
                    if (state == 'disabled')
                        return;
                    ''
                    handleSelectedDateFn(date.dateString)

                }}>
                    
                        <DayContainer isSelected={date.dateString == selectedDate}>
                            <DayText isSelected={date.dateString == selectedDate} isDisabled={state == 'disabled'}>{date.day}</DayText>
                        </DayContainer>
                    
                </TouchableOpacity>
            }
            
        />
    )
}

const styles = StyleSheet.create({
    calendar: {
        width: 350,
        marginTop: 20,
        marginBottom: 15,
        backgroundColor: 'transparent'
    },
    headerText: {
        fontSize: 22,
        fontFamily: 'MontserratAlternates_600SemiBold',
        color: '#5F5C6B',
        marginTop: 10,
        marginBottom: 10
    }
});