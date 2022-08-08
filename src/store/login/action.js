import  {
    LOGGED_IN_REQUEST,
    LOGGED_IN_SUCCESSFUL,
    LOGGED_IN_FAILED,
    CHECK_IS_LOGGED_IN_REQUEST,
    LOGGED_OUT_SUCCESSFUL,
    LOGGED_OUT_FAILED,
    LOGGED_OUT_REQUEST,
    IS_ALREADY_LOGGED_IN,
    NO_USER_LOGGED_IN,
    GET_OWN_PROFILE,
    UPDATE_SUCCESSFULLY
} from "./actionType"
import axios from "axios"
import {baseUrl} from "../../../utils/baseUrl/baseUrl"
import { addNewMessage } from "../responseMessage/action"


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

//reload logged in user 
const reloadLoggedInUser = (payloads) => {
    // console.log({payloads})
    return {
        type: GET_OWN_PROFILE,
        payload: {
            user: payloads.user,
            message: payloads.message
        }
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

//start reloadProcess 
const reloadUserProcess = () => async (dispatch) => {
    // console.log(`Hello I am from reload process action`)
    try {
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
        // console.log({user})
        if (status == 202) {
            dispatch (reloadLoggedInUser ({message, user}))
        }else {
            console.log(`No logged in user have found!!!`)
        }
    }catch (err) {
        console.log(err.message)
    }
}

//update successfully  
// const updateSuccessfully = () => {
//     return {
//         type: UPDATE_SUCCESSFULLY,
//         payload: 
//     }
// }

//start update process 
const profileUpdateProcess = (body) => async (dispatch) => {
    try {
        // console.log(body)
        const {
            data: {
                status,
                message
            }
        } = await axios.put (
            `${baseUrl}/agency/profile/update`,
            body,
            {
                withCredentials: true
            }
        ) //update profile api  
        console.log(message)
        if (status == 202) { //if successfully updated
            dispatch (await reloadUserProcess());
        }else if(status == 402) {
             const errorMessage = [] //contains all body validation error
                // console.log(message)
                message.forEach(responseMessage => {
                // console.log(typeof responseMessage.constraints)
                    for (const property in responseMessage.constraints) {
                        const body = {
                            type: "negative",
                            message: responseMessage.constraints[property]
                        } //this will contains all validation error
                                errorMessage.push (body);
                    }
                })
                errorMessage.shift()
                addNewMessage (errorMessage)
        }else {
            addNewMessage ([
                {
                    type: "negative",
                    message
                }
            ])
        }
    }catch (err) {
        addNewMessage ([
                {
                    type: "negative",
                    message: err.message
                }
            ])
    }
}

export {
    startLoginProcess,
    startLogoutProcess,
    logoutFailed,
    loggedInFailed,
    checkPreviousSession,
    reloadUserProcess,
    profileUpdateProcess
}