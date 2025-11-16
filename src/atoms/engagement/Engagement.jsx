import './engagement.css';

function Engagement(props){
    return <div className='engagement-div' onClick={props.interactionAction ? ()=>props.interactionAction(props.postId): ()=>{}}>
        <img src={props.interactionIcon}/>
        <p>{props.magnitude}</p>
    </div>;
}

export default Engagement;
