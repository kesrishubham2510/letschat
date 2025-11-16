import './homeFeed.css';

import { Fragment, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../config/GlobalState';

import { PROFILE_EMOJI, GROUPS_EMOJI, CHATS_EMOJI, INFO_EMOJI, LOGOUT_EMOJI } from '../../assets/emoticon';

import Tile from '../../atoms/tile/Tile';
import Post from '../../molecules/Post/Post';
import APICalls from '../../utilities/APICall';
import { useNavigate } from 'react-router-dom';
import AddPost from '../../molecules/addPost/AddPost';

function HomeFeed(props) {


    // use-dispatcher can be used to detect and handle the operation 

    const groupId = "3ee6df76-7331-409e-a9dc-258b8c10eaf1";

    const { userState } = useContext(UserContext);
    const navigate = useNavigate();

    const [postsInMyfeed, setpostsInMyfeed] = useState({
        "groupId": "",
        "posts": []
    });

    useEffect(() => {

        if (userState.isLoggedIn !== true) {
            navigate('/login');
        }
        APICalls.readPostOfGroup(groupId, handleResponse);
    }, []);

    function handleResponse(jsonResponse) {

        if (jsonResponse.ok) {

            jsonResponse.json().then(parsedJson => {
                // console.log("This is the parsed json:- ", parsedJson);
                // console.log('posts:- ', parsedJson.posts);
                setpostsInMyfeed(() => { return parsedJson });
            }).catch(err => {
                console.log("Error occured while parsing the json:- ", err);
            })

        } else if (jsonResponse.status == 400) {

            jsonResponse.json().then(parsedJson => {
                console.log("This is the parsed json:- ", parsedJson);
            }).catch(err => {
                console.log("Error occured while parsing the json:- ", err);
            })

        } else if (jsonResponse.status == 401) {
            console.log("The request is not authenticated");
        } else if (jsonResponse.status == 403) {
            console.log("The request is not authorized");
        }
    }

    function addMyPostToGrouo(postContent) {

        if (postContent.trim().length == 0) {
            return;
        }

        console.log("This is my content", postContent);
        APICalls.addMyPostToGroup(groupId, postContent, handleAddPostToGroupResponse);
    }

    function handleAddPostToGroupResponse(jsonResponse) {

        if (jsonResponse.ok) {

            jsonResponse.json().then(parsedJson => {
                // console.log("This is the parsed json:- ", parsedJson);
                // console.log('posts:- ', parsedJson);
                setpostsInMyfeed((currentPosts) => {
                    return {
                        ...currentPosts,
                        "posts": [parsedJson, ...currentPosts.posts]
                    }
                });
            }).catch(err => {
                console.log("Error occured while parsing the json:- ", err);
            })

        } else if (jsonResponse.status == 400) {

            jsonResponse.json().then(parsedJson => {
                console.log("This is the parsed json:- ", parsedJson);
            }).catch(err => {
                console.log("Error occured while parsing the json:- ", err);
            })

        } else if (jsonResponse.status == 401) {
            console.log("The request is not authenticated");
        } else if (jsonResponse.status == 403) {
            console.log("The request is not authorized");
        }
    }

    function somethingClicked() {
        console.log("something clicked!!");
    }

    function handleAddLikeToPostResponse(jsonResponse, postId) {

        if (jsonResponse.ok) {
            postsInMyfeed.posts.map(post => {
                if (post.postId === postId) {
                    post.haveILiked = true;
                    post.likes = post.likes + 1;
                }
            });

            setpostsInMyfeed(() => {
                return { ...postsInMyfeed };
            })

        } else if (jsonResponse.status == 400) {

            jsonResponse.json().then(parsedJson => {
                console.log("This is the parsed json:- ", parsedJson);
            }).catch(err => {
                console.log("Error occured while parsing the json:- ", err);
            })

        } else if (jsonResponse.status == 401) {
            console.log("The request is not authenticated");
        } else if (jsonResponse.status == 403) {
            console.log("The request is not authorized");
        }
    }

    function handleRemoveLikeFromPostResponse(jsonResponse, postId) {

        if (jsonResponse.ok) {

            postsInMyfeed.posts.map(post => {

                if (post.postId === postId) {
                    post.haveILiked = false;
                    post.likes = post.likes - 1;
                }
            });

            setpostsInMyfeed(() => {
                return { ...postsInMyfeed };
            });

        } else if (jsonResponse.status == 400) {

            jsonResponse.json().then(parsedJson => {
                console.log("This is the parsed json:- ", parsedJson);
            }).catch(err => {
                console.log("Error occured while parsing the json:- ", err);
            })

        } else if (jsonResponse.status == 401) {
            console.log("The request is not authenticated");
        } else if (jsonResponse.status == 403) {
            console.log("The request is not authorized");
        }
    }

    function likeThePost(postId) {

        if (postsInMyfeed.length == 0)
            return;

        APICalls.addLikeToPost(postId, groupId, handleAddLikeToPostResponse);
    }

    function unlikeThePost(postId) {
        console.log("unliked PostId:- ", postId, ", groupId:- ", groupId);
        APICalls.removeLikeFromThePost(postId, groupId, handleRemoveLikeFromPostResponse);
    }


    return <div className='homefeed-div'>
        <div className='homefeed-div-left'>
            <Tile imgSrc={PROFILE_EMOJI} text="My Profile" action={somethingClicked} />
            <Tile imgSrc={GROUPS_EMOJI} text="Groups" action={somethingClicked} />
            <Tile imgSrc={CHATS_EMOJI} text={"Chats"} action={somethingClicked} />
            <Tile imgSrc={INFO_EMOJI} text={"Info"} action={somethingClicked} />
            <Tile imgSrc={LOGOUT_EMOJI} text={"Logout"} action={somethingClicked} />
        </div>
        <div className='homefeed-div-center'>
            <AddPost groupId={groupId} buttonAction={addMyPostToGrouo} />
            {/* {console.log("My Feed:- ",postsInMyfeed)} */}
            {postsInMyfeed.posts.length > 0 && postsInMyfeed.posts.map(post => {
                return <Post key={post.postId} post={post} likeInteraction={likeThePost} unlikeInteraction={unlikeThePost} />
            })}
        </div>
        <div className='homefeed-div-right'>

        </div>
    </div>
}

export default HomeFeed;