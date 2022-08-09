import  {
    GET_AIR_DATA,
    UPDATE_AIR_DATA,
    DELETE_AIR_DATA,
    UPDATE_AIR_DATA_STATE,
    AIR_DATA_NOT_FOUND
} from "./actionType"
import axios from "axios"
import {baseUrl} from "../../../utils/baseUrl/baseUrl"
import { addNewMessage } from "../responseMessage/action"


const getSuccessfully = (pageNeed, airData, ) => {
    return {
        type: UPDATE_AIR_DATA_STATE,
        payload: {
            pageNeed,
            airData
        }
    }
}

const failedToGetData = () => {
    return {
        type : AIR_DATA_NOT_FOUND
    }
}


//get all air data 
const getAllAirData = (searchBy, sortBy, pageNo, dataLimit,) => async (dispatch) => {
     try {
        const formData ={
            searchBy,
            sortBy,
            pageNo,
            dataLimit
        }
        
        // console.log(`hello i am from reduxer`)
        //hit the api 
        const {
            data: {
                message,
                airData,
                status,
                pageNeed
            }
        } = await axios.post (`${baseUrl}/airData/showOwn/data`, formData, {
            withCredentials: true
        }) //fetch the logged in request from the server 
        // console.log({message})
        if (status == 202) { //logged in successfully request
            dispatch (getSuccessfully (pageNeed, airData))
            dispatch(addNewMessage([
                {
                    type: "positive",
                    message
                }
            ])) //change successfully get data
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
                        dispatch (addNewMessage (errorMessage))

                        dispatch (failedToGetData())
        }else {
            dispatch (failedToGetData())
            dispatch (addNewMessage( [
                {
                    message, 
                    type: "negative"
                }
            ])) //if failed to logged in
            
        }
    }catch (err) {
        dispatch (addNewMessage(
            [
                {
                    message: err.message, 
                    type: "negative"
                }
            ]
            )) //if any runtime error has found
            dispatch (failedToGetData())
    }
}

//get all
export {
    getAllAirData
}