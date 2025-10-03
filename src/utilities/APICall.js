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

const APICalls = {
  loginUser,
  retrieveMyDetails,
  refreshMyJwtToken,
  registerUser,
};

export default APICalls;
