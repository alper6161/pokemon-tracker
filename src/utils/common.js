export const formatToThreeDigits = (number) => {
    let numberString = number.toString();
    while (numberString.length < 3) {
        numberString = '0' + numberString;
    }
    return numberString;
};

export const capitilazeFirstLetter = (string) => {
    return string ? string[0].toUpperCase() + string.substring(1) : '';
}