const dateFormat = (dateNow) => {
    if (dateNow) {
        let usaTime = new Date(dateNow).toLocaleString("en-US", {timeZone: "Europe/Minsk"})
        usaTime = new Date(usaTime)
        return usaTime.toLocaleString()
    }
    return dateNow
}

const transformActionKeyToTitle = (string) => {
    return string ?
        string[0].toUpperCase() + string.slice(1).replace('_', ' ') : null
}

export {
    dateFormat,
    transformActionKeyToTitle
}