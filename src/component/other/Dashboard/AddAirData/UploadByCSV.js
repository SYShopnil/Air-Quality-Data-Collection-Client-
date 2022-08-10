import React, {
    useState,
    useEffect
} from 'react'
import CsvFileSelector from '../../../common/Dashboard/CsvFileSelector'
import {
    connect
} from "react-redux"
import { addNewMessage } from '../../../../store/responseMessage/action'
import axios from "axios"
import errorMessageCreator from "../../../../../utils/MessageCreator/messageCreator"

const UploadByCSV = (
    {
        newMessage,
        format,
        apiUrl,
        buttonName
    }
) => {
    //local state 
    const [isLoading, setIsLoading] = useState (false)
    const [csvBase64, setCsvBase64] = useState ("")

    //add air data handler
    const addAirDataHandler = (e, csvFile) => {
        e.preventDefault();
        setCsvBase64 (csvFile)
        setIsLoading (true)
    }

    //all use effect 

    //add new air data useEffect 
    useEffect (() => {
        if (isLoading) {
            (async () => {
                try {
                    const body = {
                        uploadFormat: format,
                        csvBase64
                    } //make the body for create the new air data
                    console.log(body)
                    const {
                        data: {
                            message,
                            status
                        }
                    } = await axios.post (
                        apiUrl,
                        body,
                        {
                            withCredentials: true
                        }
                    )
                    console.log(status)
                    if (status == 201) { //if successfully add new air data
                        newMessage ([{
                            type: "positive",
                            message
                        }])
                    }else if (status == 402) { // if any body input validation  failed 
                        const errorMessage = errorMessageCreator (message) //create the structure of error message 
                        newMessage (errorMessage)
                    }else {
                        newMessage ([{
                            type: "negative",
                            message
                        }])
                    }
                    setIsLoading (false)
                }catch(err) {
                    newMessage ([
                        {
                            type: "negative",
                            message: err.message
                        }
                    ])
                }
            })()
        }
    }, [isLoading])


  return (
    <div>
        <CsvFileSelector
            isLoading = {isLoading}
            setIsLoading = {setIsLoading}
            uploadHandler = {addAirDataHandler}
            buttonName = {buttonName}
        />
    </div>
  )
}


//get global state 
const mapStateToProps = (state) => {
    
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        newMessage : (message) => dispatch(addNewMessage(message))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(UploadByCSV)
