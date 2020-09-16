export default function removeVirgula(number) {
    if (typeof number != 'number') {
        return number = number.replace(/,/g, '.');
    } else {
        return number
    };
};