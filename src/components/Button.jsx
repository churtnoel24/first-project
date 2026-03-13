function Button({text, color, onclick}){

    return (
        <button className={`btn btn-${color}`} onClick={onclick}>{text}</button>
    );
}

export default Button;