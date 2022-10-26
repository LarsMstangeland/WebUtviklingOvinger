import {isLeapYear} from './app.js';


const cases = [1820,1960,2020]
const wrongCases = [-1,undefined,null]



//Oppgave 4, 
//siden jeg brukte test.each i begge 
//tilfellene valgte jeg en litt annen 
//string for describe

describe('A year is a leap year', () => {


    //oppgave 1

    test.each(cases)('%p is divisible by 4 but not by 100', 
    (arg1) => { 
        expect(isLeapYear(arg1)).toBe(true);
    });

    //oppgave 3.2 og 2.2

    test.each(wrongCases)('No exception was thrown when %p was tried',(arg1) => {

        expect(() => {
            isLeapYear(arg1);
            
        }).toThrowError();
    });
});




/*

describe('A year is a leap year', () => {

    test('Year is divisible by 4 but not by 100', 
    () => { 
        expect(isLeapYear(2020)).toBe(true);
    });
    
    
    test('Year is divisible by 400', 
    () => { 
        expect(isLeapYear(2000)).toBe(true);
    });


});

describe('A year is not a leap year', () => {

    test('Year is not divisible by 4', () => {

        expect(isLeapYear(1981)).toBe(false);

    });

    

    test('Year is divisible by 100 but not by 400', () => {

        expect(isLeapYear(2100)).toBe(false);

    });

});


*/