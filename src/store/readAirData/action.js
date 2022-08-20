import  {
    GET_AIR_DATA,
    UPDATE_AIR_DATA,
    DELETE_AIR_DATA,
    UPDATE_AIR_DATA_STATE,
    AIR_DATA_NOT_FOUND,
    SUCCESSFULLY_UPDATE,
    REQUEST_FOR_UPDATE,
    FAILED_TO_UPDATE
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
const getAllAirData = (searchBy, sortBy, pageNo, dataLimit) => async (dispatch) => {
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
        // console.log({airData})
        // console.log({formData})
        if (status == 202) { //data get successfully request
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

//request for update 
const requestForUpdate = () => {
    return {
        type: REQUEST_FOR_UPDATE
    }
}

//successfully update
const successfullyUpdate = () => {
    return {
        type: SUCCESSFULLY_UPDATE
    }
}

//failed to update 
const failedToUpdate = () => {
    return {
        type: FAILED_TO_UPDATE
    }
}

//update air data 
const updateAirData = (updateAirData, dataId, searchBy, sortBy, pageNo, dataLimit) => async (dispatch) => {
    dispatch(requestForUpdate())
    try {
        // console.log({updateAirData, dataId, searchBy, sortBy, pageNo, dataLimit})
        const {
            data: {
                message,
                status
            }
        } = await axios.put (
            `${baseUrl}/airData/update/${dataId}`,
            updateAirData,
            {
                withCredentials: true
            }
        )
         if (status == 202) { //if successfully update data 
            await dispatch (getAllAirData (searchBy, sortBy, pageNo, dataLimit))
            dispatch(addNewMessage([
                {
                    type: "positive",
                    message
                }
            ])) //change successfully get data
            dispatch (successfullyUpdate)
        }else {
            dispatch(addNewMessage([
                {
                    type: "negative",
                    message
                }
            ])) //change successfully get data
        }
    }catch(err) {
         dispatch (addNewMessage(
            [
                {
                    message: err.message, 
                    type: "negative"
                }
            ]
            )) //if any runtime error has found
            dispatch (failedToUpdate(successfullyUpdate()))
    } 
}

//get all
export {
    getAllAirData,
    updateAirData
}