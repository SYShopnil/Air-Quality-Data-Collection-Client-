import  {
    LOGGED_IN_REQUEST,
    LOGGED_IN_SUCCESSFUL,
    LOGGED_IN_FAILED,
    CHECK_IS_LOGGED_IN_REQUEST,
    LOGGED_OUT_SUCCESSFUL,
    LOGGED_OUT_FAILED,
    LOGGED_OUT_REQUEST,
    IS_ALREADY_LOGGED_IN,
    NO_USER_LOGGED_IN
} from "./actionType"
import axios from "axios"
import {baseUrl} from "../../../utils/baseUrl/baseUrl"


//Login request 
const makeLoginRequest = () => {
    return {
        type: LOGGED_IN_REQUEST
    }
}

//if successfully login
const loggedInSuccess = (userData, message) => {
    return {
        type: LOGGED_IN_SUCCESSFUL,
        payload: {
            user:userData,
            message
        }
    }
}

//if failed to login
const loggedInFailed = (message) => {
    return {
        type: LOGGED_IN_FAILED,
        payload: {
            message
        }
    }
}

//make logout request 
const makeLogoutRequest = () => {
    return {
        type: LOGGED_OUT_REQUEST
    }
}

//if successfully logout 
const logoutSuccessful = (message) => {
    return {
        type: LOGGED_OUT_SUCCESSFUL,
        payload: {
            message
        }
    }
}

//if failed to logout 
const logoutFailed = (message) => {
    return {
        type: LOGGED_OUT_FAILED,
        payload: {
            message
        }
    }
}

//make a previous session check 
const makePreviousSessionCheck = () => {
    return {
        type: CHECK_IS_LOGGED_IN_REQUEST
    }
}

// successfully got the previous logged in user 
const successfullyGotPreviousSession = (user, message) => {
    return {
        type: IS_ALREADY_LOGGED_IN,
        payload: {
            message,
            user
        }
    }
}

// if any previous session not found
const anyPreviousSessionNotFound = (message) => {
    return {
        type: NO_USER_LOGGED_IN,
        payload: {
            message
        }
    }
}

//start the login process
const startLoginProcess = (formData) => async (dispatch, getState) => {
    try {
        dispatch (makeLoginRequest()) //request for start the login process 
        //hit the api 
        const {
            data: {
                message,
                agency,
                status
            }
        } = await axios.post (`${baseUrl}/agency/login`, formData, {
            withCredentials: true
        }) //fetch the logged in request from the server 
        console.log(message)
        if (status == 202) { //logged in successfully request
            dispatch(loggedInSuccess(agency,[
                {
                    type: "positive",
                    message
                }
            ])) //change the state if successfully logged in
        }else if (status == 402) { //if there have any login body input validation error
             const errorMessage = [] //contains all body validation error
                        message.forEach(responseMessage => {
                            for (const property in responseMessage.constraints) {
                                const body = {
                                    type: "negative",
                                    message: responseMessage.constraints[property]
                                } //this will contains all validation error
                                errorMessage.push (body); //push all error match 
                            }
                        })
                        errorMessage.shift()
                        dispatch (loggedInFailed (errorMessage))
        }else {
            dispatch (loggedInFailed( [
                {
                    message, 
                    type: "negative"
                }
            ])) //if failed to logged in
        }
    }catch (err) {
        dispatch (loggedInFailed(
            [
                {
                    message: err.message, 
                    type: "negative"
                }
            ]
            )) //if any runtime error has found
    }
}

//start logout process 
const startLogoutProcess = () => async (dispatch, getState) => {
    try {
        dispatch (makeLogoutRequest()); //first make a request for logout
        //start to fetch 
        const {
            data: {
            message,
            status
            }
        } = await axios.get (
            `${baseUrl}/agency/logout`,
            {
                withCredentials: true
            }
        )
        if (status == 202) { //logout successfully 
            dispatch (logoutSuccessful([ 
                {
                    message,
                    type: "positive"
                }
            ]))
        }else {
            dispatch (logoutFailed([ 
                {
                    message,
                    type: "negative"
                }
            ]))
        }
    }catch (err) {
        dispatch (logoutFailed([ 
            {
                message: err.message,
                type: "negative"
            }
        ]))
    }
}

//start the previous session check 
const checkPreviousSession = () => async (dispatch, getState) => {
    try {
        makePreviousSessionCheck(); //start the checking 
        const {
            data: {
                message,
                status,
                user
            }
        } = await axios.get (
            `${baseUrl}/agency/check/loggedIn/session`,
            {
                withCredentials: true
            }
        );
        // console.log(user)
        if (status == 202) { //if previous session has found 
            dispatch (successfullyGotPreviousSession(
                user,
                [
                    {
                        message,
                        type: "positive"
                    }
                ]
            ))
        }else {
            dispatch (anyPreviousSessionNotFound(
                [
                    {
                        message,
                        type: "negative"
                    }
                ]
            ))
        }
    }catch (err) { // if there have any runtime error
        dispatch (anyPreviousSessionNotFound(
            [
                {
                    message: err.message,
                    type: "negative"
                }
            ]
        ))
    }
}
export {
    startLoginProcess,
    startLogoutProcess,
    logoutFailed,
    loggedInFailed,
    checkPreviousSession
}