import './addPost.css';
import Button from "../../atoms/button/Button";
import InputBox from '../../atoms/inputBox/InputBox';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function AddPost(props) {


    const [postContent, setPostContent] = useState("");

    const addButtonStyle = {
        width: "20%",
        border: "2px solid orange",
        margin: "5px",
        borderRadius: "25px"
    }

    function handleOnChange(event) {
        const { name, value } = event.target;
     
        setPostContent(() => {
            return value;
        })
    }



    return <div className="addpost-tile">
        <div className="textarea-addpost">
            <textarea id={props.groupId} name={props.groupId} value={postContent} onChange={handleOnChange} placeholder='Add your thoughts...'></textarea>
            {/* <InputBox></InputBox> */}

        </div>
        <Button label="Add"  style={addButtonStyle} action={() => { 
            props.buttonAction(postContent);
            setPostContent("");

         }} />
    </div>
}

export default AddPost;

/*
{
    "groupId": "3ee6df76-7331-409e-a9dc-258b8c10eaf1",
    "posts": [
        {
            "postId": "40b8fda3-aec7-4f89-95f9-f9f21880a1df",
            "content": "This is the updated content",
            "likes": 1,
            "postedAt": "2025-11-01T09:04:46.567402Z",
            "author": {
                "userId": "b8a99552-838f-48b7-aaa3-6f5d67322772",
                "username": "hmKesam",
                "joined": "1761987780",
                "role": "USER"
            }
        }
    ]
}
*/