const useCreateDate = () => {
    const dateObj = new Date();
    const month = dateObj.getMonth();
    let monthName;
    switch(month) {
        case 0:
            monthName = 'Jan';
            break;
        case 1:
            monthName = 'Fév';
            break;
        case 2:
            monthName = 'Mars';
            break;
        case 3:
            monthName = 'Avr';
            break;
        case 4:
            monthName = 'Mai';
            break;
        case 5:
            monthName = 'Juin';
            break;
        case 6:
            monthName = 'Juil';
            break;
        case 7:
            monthName = 'Aout';
            break;
        case 8:
            monthName = 'Sep';
            break;
        case 9:
            monthName = 'Oct';
            break;
        case 10:
            monthName = 'Nov';
            break;
        case 11:
            monthName = 'Déc';
            break;
    }

    const date = `${monthName} ${dateObj.getDate()}, ${dateObj.getFullYear()} [${dateObj.getHours()}:${dateObj.getMinutes()}]`;
    return date;
}

export default useCreateDate;