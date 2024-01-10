function Password({ password, special_chars }) {

    const copy_to_clipboard = () => {
        navigator.clipboard.writeText(password);
        alert(`Copied password with ${password.length} characters`);
    }

    const renderChar = (char) => {
        let class_name = "";
        if (special_chars.indexOf(char) > -1) {
            class_name = "organge-char";
        } else if (char >= '0' && char <= '9') {
            class_name = "blue-char";
        }

        return <span className={class_name}>{char}</span>;
    }
    return (
        <div className="password">
            <div className="font-mono font-semibold password-text p-2 text-5xl ">
                {password.split("").map((char) => renderChar(char))}
            </div>
            <div className="copy-button border-l-2 p-2 hover:cursor-pointer text-4xl md:text-2xl" onClick={copy_to_clipboard}>📋</div>
        </div>
    )
}

export default Password