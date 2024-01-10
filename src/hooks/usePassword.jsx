import { useState } from 'react';

function usePassword(length, lowercase, caps, numbers, special, special_chars) {

    const [password, setPassword] = useState("");

    // Generates a random password with the specified parameters
    const generatePassword = () => {
        let pool = [];
        let full_length = length;
        let special_count = 0;
        let numbers_count = 0;
        let new_password = "";

        // here we are generating a number of special characters to use
        // making sure that we get at least 1/4 of the total characters made of special characters
        if (special) {
            let factor = Math.floor(Math.random() * 3) + 2;
            special_count = Math.floor(full_length / factor);
            full_length -= special_count;
        }

        if (numbers) {
            let factor = Math.floor(Math.random() * 3) + 2;
            numbers_count = Math.floor(full_length / factor);
            full_length -= numbers_count;
        }

        if ((lowercase || caps || numbers) == false) {
            alert("You need at least one option (apart from special characters) enabled");
            return;
        }

        if (lowercase) pool.push(...Array.from({ length: 26 }, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i)));
        if (caps) pool.push(...Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)));

        for (let i = 0; i < full_length; i++) {
            let char = pool[(Math.floor(Math.random() * pool.length))];
            new_password += char;
        }
        //adding special characters in different loop, we are making sure that we get a decent ammount of special characters here
        for (let i = 0; i < special_count; i++) {
            let char = special_chars[(Math.floor(Math.random() * special_chars.length))];
            new_password += char;
        }

        for (let i = 0; i < numbers_count; i++) {
            let char = Math.floor(Math.random() * 10);
            new_password += char;
        }

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

export default usePassword