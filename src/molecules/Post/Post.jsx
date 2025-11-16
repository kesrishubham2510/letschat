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
import APICalls from '../../utilities/APICall';

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

    function haveILikedThePost(post) {
        return post.haveILiked;
    }


    return <div className='post'>

        <div className='post-header'>
            <ProfileIcon />
            <UserHeader postedAt={props.post.postedAt} identity={props.post.author.username} />
        </div>
        <div className='post-content'>
            <p> {props.post.content}</p>
        </div>
        <div className='interaction-div'>
            <Engagement postId={props.post.postId} magnitude={props.post.likes} interactionIcon={haveILikedThePost(props.post) ? LikedIcon : DefaultLike} interactionAction={haveILikedThePost(props.post) ? props.unlikeInteraction : props.likeInteraction} />
            <Engagement postId={props.post.postId} interactionIcon={CommentIcon} />
            {userState.userId === props.post.author.userId && <Engagement postId={props.postId} interactionIcon={EditIcon} />}
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