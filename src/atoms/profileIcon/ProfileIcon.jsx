import DefaultProfileIcon from '../../assets/images/DefaulProfileIcon.jpg';

import './profileIcon.css';

function ProfileIcon(){
    return  <div className='pic-icon'>
                <img src={DefaultProfileIcon}/>
            </div>;
}

export default ProfileIcon;