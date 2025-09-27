import './homeFeed.css';

import {PROFILE_EMOJI, GROUPS_EMOJI, CHATS_EMOJI, INFO_EMOJI, LOGOUT_EMOJI} from '../../assets/emoticon';
import Tile from '../../atoms/tile/Tile';
import Post from '../../molecules/Post/Post';

function HomeFeed(props){

    // use-dispatcher can be used to detect and handle the operation 

    function somethingClicked(){
        console.log("something clicked!!");
    }

    return <div className='homefeed-div'>
        <div className='homefeed-div-left'>
            <Tile imgSrc={PROFILE_EMOJI} text="My Profile" action={somethingClicked}/>
            <Tile imgSrc={GROUPS_EMOJI} text="Groups" action={somethingClicked}/>
            <Tile imgSrc={CHATS_EMOJI} text={"Chats"} action={somethingClicked}/>
            <Tile imgSrc={INFO_EMOJI} text={"Info"} action={somethingClicked}/>
            <Tile imgSrc={LOGOUT_EMOJI} text={"Logout"} action={somethingClicked}/>
        </div>
        <div className='homefeed-div-center'>
            <Post/>
        </div>
        <div className='homefeed-div-right'>

        </div>
    </div>
}

export default HomeFeed;