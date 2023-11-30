function onlyIntCommaConverter(stringNumber, length) {
    if (length <= 3) {
        return stringNumber
    } else {
        for (let i = length - 3; i > 0; i -= 2) {
            stringNumber = stringNumber.slice(0, i) + "," + stringNumber.slice(i)
        }
        return stringNumber
    }
}

export function commaAdder(number) {
    let intPart = number.split(".")[0].toString()
    let decimalPart = number.split(".")[1].toString()
    let commaDigit = onlyIntCommaConverter(intPart, intPart.length)

    console.log(commaDigit, commaDigit.length)

    return commaDigit + "." + decimalPart
}
