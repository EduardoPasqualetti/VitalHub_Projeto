
import { FieldContent, InputLabel, InputText, InputTextModificate } from "./Style"



export const BoxInput = ({
    fieldWidth = 100,
    textLabel,
    placeholder,
    fieldValue,
    fieldHeight = 60,
    editable = false,
    multiline = false,
    marginBottom = 40,
    insertRecord = false
}) => {
    return (
        <FieldContent fieldWidth={fieldWidth} marginBottom={marginBottom}>

            <InputLabel >{textLabel}</InputLabel>
            {insertRecord ? (
                <>
                <InputTextModificate 
                placeholder={placeholder} value={fieldValue} editable={editable}
                fieldHeight={fieldHeight} multiline={multiline}/>
                </>
            ) : (
                <>
                <InputText placeholder={placeholder} value={fieldValue} editable={editable}
                fieldHeight={fieldHeight} multiline={multiline} />
                </>
            )}
            

        </FieldContent>
    )
}