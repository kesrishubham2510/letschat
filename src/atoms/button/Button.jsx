import './button.css';

function Button(props) {
    return <button  className='button-light' style = {props.style} onClick={props.action}>
        {props.label}
        </button>
}

export default Button;