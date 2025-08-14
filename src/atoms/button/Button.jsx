import './button.css';

function Button(props) {
    return <button className='button-light' onClick={props.action}>
        {props.label}
        </button>
}

export default Button;