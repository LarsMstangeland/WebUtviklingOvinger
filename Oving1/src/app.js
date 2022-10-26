export function isLeapYear(year){

    //oppgave 2.1
    if(!(year > 0)){
        throw new InvalidArgumentError ('Invalid argument: year must be an integer equal or larger than 0')
    }

    //oppgave 3.1
    if((year == null) || (year == undefined)){
        throw new InvalidArgumentError ('Invalid argument: year cannot be null or undefinded')
    }

    //Oppgave 1
    return  (year % 4 == 0) && 
            (year % 100 !== 0) || 
            (year % 400 == 0);
}

