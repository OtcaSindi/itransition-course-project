const dateFormat = (dateNow) => {
    if (dateNow) {
        let usaTime = new Date(dateNow).toLocaleString("en-US", {timeZone: "Europe/Minsk"})
        usaTime = new Date(usaTime)
        return usaTime.toLocaleString()
    }
    return dateNow
}

const doSelect = (labelText, selectItems, idSelect = 'select-1', defaultValue) => {
    return {
        id: idSelect,
        defaultValue,
        labelText,
        selectItems // [{value: 'option-1', text: 'Option-1'}]
    }
}

const doInputText = (id, value, onChange, labelText, type, isInvalid, invalidText) => {
    return {
        id,
        value,
        onChange,
        labelText,
        type,
        invalid: isInvalid,
        invalidText
    }
}

export {
    dateFormat,
    doSelect,
    doInputText
}