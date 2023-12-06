function Password({password, special_chars}) {

    const renderChar = (char) => {
        let class_name = "";
        if (special_chars.indexOf(char) > -1){
            class_name = "organge-char";
        }else if (char >= '0' && char <= '9') {
            class_name = "blue-char";
        }

        return  <span className={class_name}>{char}</span>;
    }
    return (
        <div className="password-text p-2">
            {/* {password} */}
            {password.split("").map((char) => renderChar(char) )}
        </div>
    )
}

export default Password