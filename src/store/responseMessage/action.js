import  {
    ADD_NEW_MESSAGE
} from "./actionType"
import axios from "axios"
import {baseUrl} from "../../../utils/baseUrl/baseUrl"

const addNewMessage = (message) => {
    return {
        type: ADD_NEW_MESSAGE,
        payload: message
    }
}


export {
    addNewMessage
}