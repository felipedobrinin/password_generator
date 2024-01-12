function Password({ password, special_chars }) {

    const copy_to_clipboard = () => {
        navigator.clipboard.writeText(password);
        // alert(`Copied password with ${password.length} characters`);
    }

    const renderChar = (char, index) => {
        let class_name = "";
        if (special_chars.indexOf(char) > -1) {
            class_name = "organge-char";
        } else if (char >= '0' && char <= '9') {
            class_name = "blue-char";
        }

        return <span className={class_name} key={index}>{char}</span>;
    }
    return (
        <div className="password text-3xl md:text-5xl">
            <div className="font-mono font-semibold password-text p-2 border-r-2 ">
                {password.split("").map((char, index) => renderChar(char, index))}
            </div>
            <div className="copy-button select-none p-2 hover:cursor-pointer" onClick={copy_to_clipboard}>📋</div>
        </div>
    )
}

export default Password