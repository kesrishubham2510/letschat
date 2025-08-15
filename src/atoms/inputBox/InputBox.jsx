import './inputBox.css';

function InputBox(props){
    return <>
        <label htmlFor={props.id}> {props.label}</label>
        <input id={props.id} type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeHolder} autoComplete='false'/>
    </>
}

export default InputBox;