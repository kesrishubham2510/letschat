import './userHeader.css';

function UserHeader(props) {
   return  <div className="meta-data">
        <div className="user-identity">
            <strong>{props.identity}</strong>
        </div>
        <div className='user-activity'>
            <strong>2 hours ago</strong>
        </div>
    </div>
}

export default UserHeader;