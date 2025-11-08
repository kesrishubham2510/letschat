import './engagement.css';

function Engagement(props){
    return <div className='engagement-div'>
        <img src={props.interactionIcon}/>
        <p>{props.magnitude}</p>
    </div>;
}

export default Engagement;
