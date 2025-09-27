import './post.css';

import CommentIcon from '../../assets/images/CommentIcon.png';
import DefaultLike from '../../assets/images/DefaultLike.png';

import InputBox from '../../atoms/inputBox/InputBox';
import UserHeader from '../../atoms/userMetadata/UserHeader';
import ProfileIcon from '../../atoms/profileIcon/ProfileIcon';
import Engagement from '../../atoms/engagement/Engagement';

function Post() {

    const commentBoxStyle = {
        justifySelf: 'center',
        margin: '10px',
        height: '20px',
        borderRadius: '5px',
        border: '1px solid gainsboro',
        backgroundColor: 'azure'
    }

    return <div className='post'>

        <div className='post-header'>
            <ProfileIcon />
            <UserHeader identity={'shubhamkeshari90@gmail.com'} />
        </div>
        <div className='post-content'>
            <p> In today's world, technology has become deeply interwoven into every aspect of our lives, shaping the way we communicate, learn, work, and even relax. From the moment we wake up and check our phones for messages or updates, to the time we wind down at night streaming videos or reading articles online, digital tools have seamlessly integrated into our daily routines. The rapid pace of innovation has brought countless benefits, such as faster access to information, greater convenience, and more opportunities to connect across distances that were once unimaginable</p>
        </div>
        <div className='interaction-div'>
            <Engagement interactionIcon={DefaultLike}/>
            <Engagement interactionIcon={CommentIcon}/>
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