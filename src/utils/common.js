export const formatToThreeDigits = (number) => {
    let numberString = number.toString();
    while (numberString.length < 3) {
        numberString = '0' + numberString;
    }
    return numberString;
}