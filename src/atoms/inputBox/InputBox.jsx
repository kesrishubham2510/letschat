import './inputBox.css';

function InputBox(props){
    return <div className='input-section'>
        <label className='input-label' htmlFor={props.id}> {props.label}</label>
        <input id={props.id} name={props.name} type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeHolder} autoComplete='false'/>
        { props.error ? <span className='error-span'>{props.error}</span> : <></>}
    </div>
}

export default InputBox;