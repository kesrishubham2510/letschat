import './engagement.css';

function Engagement(props){
    return <div className='engagement-div'>
        <img src={props.interactionIcon}/>
        <p>20</p>
    </div>;
}

export default Engagement;
