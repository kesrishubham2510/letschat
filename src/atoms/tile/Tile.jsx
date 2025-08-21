import './tile.css';

function Tile(props){
    return <div className='tile-section'>
        <div className='tile-img'>
            {String.fromCodePoint(parseInt(props.imgSrc, 16))}
        </div>
        <div className='tile-text' onClick={props.action}>
            {props.text}
        </div>
    </div>
}

export default Tile;