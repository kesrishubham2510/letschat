import DataValidator from "./DataValidator";
import endpoints from "../config/API";

function loginUser(requestPayload, callback) {
  fetch(endpoints.login_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestPayload),
    credentials: "include",
  })
    .then(callback)
    .catch((err) => {
      console.log(err);
    });
}

function retrieveMyDetails(callback) {
  const authToken = DataValidator.getAuthToken();

  if (authToken != null) {
    fetch(endpoints.get_my_info_endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    })
      .then(callback)
      .catch((err) => {
        console.log(err);
      });
  }
}

function refreshMyJwtToken(callback) {
  fetch(endpoints.refresh_token_endpoint, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(callback)
    .catch((err) => {
      console.log("This is the error from refresh-token call:- ", err);
    });
}

function registerUser(callback, payload) {
  fetch(endpoints.registration_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(callback)
    .catch((err) => {
      console.log(
        "This is the error occured while registering the user:- ",
        err
      );
    });
}

function readPostOfGroup(groupId, callback) {
  const authToken = DataValidator.getAuthToken();
  let endpoint = endpoints.get_posts_of_group;
  endpoint = endpoint.replace("{groupId}", groupId);

  fetch(endpoint, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: authToken,
      Accept: "*/*",
    },
  })
    .then(callback)
    .catch((err) => {
      console.log(
        "Error occured whiele fetching the posts of the group:- ",
        err
      );
    });
}

function addMyPostToGroup(groupId, postContent, callback) {
  let apiEndpoint = endpoints.add_post_to_the_group;
  apiEndpoint = apiEndpoint.replace("{groupId}", groupId);
  const authToken = DataValidator.getAuthToken();

  const payload = {
    content: postContent,
  };

  fetch(apiEndpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: authToken,
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(callback)
    .catch((err) => {
      console.log("Error occured while  attempting to add post to the group");
    });
}

function addLikeToPost(postId, groupId, callback) {
  let apiEndpoint = endpoints.add_like_to_post;
  apiEndpoint = apiEndpoint.replace("{postId}", postId);
  const authToken = DataValidator.getAuthToken();

  const requestPayload = {
    postId: "",
    groupId: groupId,
    userId: "",
  };

  fetch(apiEndpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: authToken,
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestPayload),
  })
    .then(jsonResponse => callback(jsonResponse, postId))
    .catch((err) => {
      console.log(
        "Something went wrong while submitting interaction(like) on the post, ex:- ",
        err
      );
    });
}

function removeLikeFromThePost(postId, groupId, callback) {
  let apiEndpoint = endpoints.remove_like_from_post;
  apiEndpoint = apiEndpoint.replace("{postId}", postId);
  const authToken = DataValidator.getAuthToken();

  const requestPayload = {
    postId: "",
    groupId: groupId,
    userId: "",
  };

  fetch(apiEndpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: authToken,
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestPayload),
  })
    .then(jsonResponse => callback(jsonResponse, postId))
    .catch((err) => {
      console.log(
        "Something went wrong while submitting interaction(like) on the post, ex:- ",
        err
      );
    });
}


const APICalls = {
  loginUser,
  retrieveMyDetails,
  refreshMyJwtToken,
  registerUser,
  readPostOfGroup,
  addMyPostToGroup,
  addLikeToPost, 
  removeLikeFromThePost
};

export default APICalls;
