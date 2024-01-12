import { useState } from 'react';

function usePassword(special_chars) {

    const [password, setPassword] = useState("");

    // Generates a random password with the specified parameters
    const generatePassword = (lengths) => {
        let new_password = '';

        let lowercase = sample_string(
            Array.from({ length: 26 }, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i)),
            lengths.lowercase_len
        );

        let uppercase = sample_string(
            Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)),
            lengths.uppercase_len
        );

        let numbers = random_numbers(lengths.numbers_len);

        let special = sample_string(special_chars, lengths.special_chars_len);


        new_password = lowercase + uppercase + numbers + special;
        setPassword(shuffle(new_password));
    }

    // Shuffles a string randomly 
    function shuffle(string) {
        //recorro el strig y muevo el char a una posicion random
        for (let i = 0; i < string.length; i++) {
            let index = Math.floor(Math.random() * string.length);

            let swap = string.charAt(index);
            let current_char = string.charAt(i);
            string = replaceAt(string, index, current_char);
            string = replaceAt(string, i, swap);
        }

        return string;
    }

    // Returns a string with a char replaced in a specific index
    function replaceAt(string, index, replacement) {
        return string.substring(0, index) + replacement + string.substring(index + replacement.length);
    }

    return { password, generatePassword }
}

function sample_string(array, ammount){
    let string = '';
    for (let i = 0; i < ammount; i++) {
        string += array[(Math.floor(Math.random() * array.length))];
    }
    return string;
}

function random_numbers(len){
    let string = ''
    for (let i = 0; i < len; i++) {
        string += Math.floor(Math.random() * 10);
    }
    return string;
}
export default usePassword