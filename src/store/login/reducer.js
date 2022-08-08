import  {
    LOGGED_IN_REQUEST,
    LOGGED_IN_SUCCESSFUL,
    LOGGED_IN_FAILED,
    CHECK_IS_LOGGED_IN_REQUEST,
    LOGGED_OUT_REQUEST,
    LOGGED_OUT_SUCCESSFUL,
    LOGGED_OUT_FAILED,
    IS_ALREADY_LOGGED_IN,
    NO_USER_LOGGED_IN,
    GET_OWN_PROFILE
} from "./actionType"

const initialState = {
    isLoggedIn: false,
    loggedInUser: null,
    isLoading: false,
    responseMessages: []
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN_REQUEST: {
            return {
                ...state,
                isLoading: true,
                responseMessages: [
                    {
                        message: "Request for log in",
                        type: "positive"
                    }
                ]
            }
        }
        case LOGGED_IN_SUCCESSFUL: {
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
                responseMessages: action.payload.message,
                loggedInUser: action.payload.user
            }
        }
        case LOGGED_IN_FAILED: {
            return {
                ...state,
                isLoggedIn: false,
                isLoading: false,
                responseMessages: action.payload.message,
                loggedInUser: null
            }
        }
        case LOGGED_OUT_REQUEST :{
            return {
                ...state, 
                isLoading: true,
                responseMessages: [
                    {
                        message: "Request for Logged out",
                        type: "positive"
                    }
                ],
            }
        }
        case LOGGED_OUT_SUCCESSFUL : {
            return {
                isLoggedIn: false,
                isLoading: false,
                loggedInUser: null,
                responseMessages: action.payload.message
            }
        }

        case LOGGED_OUT_FAILED : {
            return {
                ...state,
                isLoading: false,
                responseMessages: action.payload.message
            }
        }
        case CHECK_IS_LOGGED_IN_REQUEST: {
            return {
                ...state,
                isLoggedIn: false,
                isLoading: true,
                responseMessages: [
                    {
                        message: "Check season exist or not",
                        type: "positive"
                    }
                ],
                loggedInUser: null
            }
        }
        case IS_ALREADY_LOGGED_IN : {
            return {
                ...state, 
                isLoggedIn: true,
                isLoading: false,
                loggedInUser: action.payload.user,
                message: action.payload.message
            }
        }
        case NO_USER_LOGGED_IN : {
            return {
                ...state, 
                isLoggedIn: false,
                isLoading: false,
                loggedInUser: null,
                message: action.payload.message
            }
        }
        case GET_OWN_PROFILE : {
            return {
                ...state, 
                isLoggedIn: true,
                isLoading: false,
                loggedInUser: action.payload.user,
                message: action.payload.message
            }
        }
        default: {
            return state
        }
    }
}

export default loginReducer