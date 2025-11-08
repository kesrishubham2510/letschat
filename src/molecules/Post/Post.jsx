import './post.css';

import { useContext } from 'react';
import { UserContext } from '../../config/GlobalState';

import CommentIcon from '../../assets/images/CommentIcon.png';
import DefaultLike from '../../assets/images/DefaultLike.png';
import LikedIcon from '../../assets/images/LikedIconWithBg.jpeg';
import EditIcon from '../../assets/images/EditIconLean.png';

import InputBox from '../../atoms/inputBox/InputBox';
import UserHeader from '../../atoms/userMetadata/UserHeader';
import ProfileIcon from '../../atoms/profileIcon/ProfileIcon';
import Engagement from '../../atoms/engagement/Engagement';

function Post(props) {

    const commentBoxStyle = {
        justifySelf: 'center',
        margin: '10px',
        height: '20px',
        borderRadius: '5px',
        border: '1px solid gainsboro',
        backgroundColor: 'azure'
    }

  
    const { userState } = useContext(UserContext);

    return <div className='post'>

        <div className='post-header'>
            <ProfileIcon />
            <UserHeader postedAt={props.postedAt} identity={props.postedBy} />
        </div>
        <div className='post-content'>
            <p> {props.content}</p>
        </div>
        <div className='interaction-div'>
            <Engagement magnitude = {props.likes} interactionIcon={props.likes===0 ? DefaultLike : LikedIcon}/>
            <Engagement interactionIcon={CommentIcon}/>
            { userState.userId === props.authorId && <Engagement interactionIcon={EditIcon}/>}
        </div>
        <div className='post-add-comment'>
            <InputBox id={"comment"} name="comment" type="text" value={""} onChange={() => { console.log('On change listener triggered') }} label={""} inputBoxStyle={commentBoxStyle} placeHolder={'Write a Comment...'} />
        </div>
        <div className='last-three-comments'>
            {/* render last three Comment Items */}
        </div>
    </div>
}

export default Post;