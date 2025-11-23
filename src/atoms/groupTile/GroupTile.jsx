import './groupTile.css';

import Button from '../button/Button.jsx';

function GroupTile(props) {

    const buttonStyle = {
        'width': '20%',
        'alignSelf': 'end',
        'padding': '5px',
        'margin': '10px',
        'backgroundColor': 'burlywood',
        'borderRadius': '20px'
}

function getInceptionTime(timestamp) {
    let inceptionDate = new Date(Number(timestamp) * 1000);
    return inceptionDate.toDateString();
}

return <div className='group-tile'>
    {/* group name */}
    <div className='group-tile-title'>
        {props.title}
    </div>
    {/* description */}
    <div className='group-tile-description'>
        {props.description}
    </div>
    {/* admin details */}
    <div className='group-tile-admin-details'>
        <div className='group-admin-emoji'>🛡️
            <strong>
                {props.owner}
            </strong>
        </div>
        {/* creation date */}
        <div className='group-tile-creation'>
            📅  {getInceptionTime(props.createdAt)}
        </div>
    </div>
    <Button label={'Join Group'} style={buttonStyle} action={() => console.log("This is my action button")} />
</div>;
}

export default GroupTile;