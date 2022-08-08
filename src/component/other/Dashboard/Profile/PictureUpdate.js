import React, {
    useState,
    useEffect
} from 'react'
import SingleFileUploader from '../../../../../utils/SingleFileUploader/SingleFileUploader'
import axios from "axios"
import {
    baseUrl
} from "../../../../../utils/baseUrl/baseUrl"
import messageCreator from '../../../../../utils/MessageCreator/messageCreator'
import { reloadUserProcess } from '../../../../store/login/action'
import {connect} from "react-redux"


const PictureUpdate = (
    {
        updateType,
        isVisible,
        setIsVisible,
        responseMessage,
        setResponseMessage,
        updateLoggedInUser //this is a dispatch function from global store
    }
) => {
    const [typeOfUpdate, setTypeOfUpdate] = useState (updateType) //cover or title picture
    const [newImageBase64, setNewImageBase64] = useState ("")
    const [isUpdateButtonLoading, setUpdateButtonLoading] = useState (false)
    const [isRender, setIsRender] = useState (false)
    
    
    //all handler 
    const uploadFileHandler = (base64, uploadFor) => {
        // console.log({base64, uploadFor})
        setNewImageBase64 (base64.base64)
        setTypeOfUpdate (uploadFor)
    }


    //picture update handler 
    const pictureUpdateHandler = (e) => {
        e.preventDefault();
        setUpdateButtonLoading(true)
    }

    //all use effect 
    useEffect (() => {
        (async() => {
            try {
               if (isUpdateButtonLoading) {
                    const body = {
                        base64: newImageBase64,
                        uploadType: typeOfUpdate
                    }
                    // console.log(body)
                    const {data: {
                        message,
                        status
                    }} = await axios.put (
                        `${baseUrl}/agency/profile/picture/update`,
                        body,
                        {
                            withCredentials: true
                        }
                    ) //fetch data into server to update the cover or title picture
                    if (status == 202) {  //if successfully updated 
                        await updateLoggedInUser()
                        setResponseMessage ([
                            {
                                message,
                                type: "positive"
                            }
                        ])
                        setUpdateButtonLoading (false)
                        setIsRender (true)
                        setIsVisible (false)
        
                    }else if (status == 402){ //if any body validation error
                        const errorMessages = messageCreator (message)
                        // console.log(message)
                        setResponseMessage(errorMessages) //set the error message state
                        setUpdateButtonLoading (false)
                        setIsVisible (false)
                    }else { //have any error
                        setResponseMessage ([
                            {
                                message,
                                type: "negative"
                            }
                        ])
                        setUpdateButtonLoading (false)
                        setIsVisible (false)
                    }
               }
            }catch (err) {
                setResponseMessage ([
                    {
                        message: err.message,
                        type: "negative"
                    }
                ])
                setUpdateButtonLoading (false)
            }
        }) ()
    }, [isUpdateButtonLoading])

    // useEffect (() => {
    //     if (isRender) {
    //         (async () => {
    //             console.log(`I am from upper`)
    //             await updateLoggedInUser()
    //             console.log(`I am from lower`)
    //             setIsVisible (false)
    //         })()
    //     }
    // }, [isRender])

  return (
    <div className = {`row container`}>
        <div className = {`col-11`}></div>
        <div className = {`col-1`}>
            <a 
            onClick = {(e) => setIsVisible(false)}
            style = {{cursor: "pointer"}}>
                <i class="fa-solid fa-xmark"></i>
            </a>
        </div>

        <div className = {`col-12`}>
            <div>
                <p>Please chose any file from local storage <span className = {`text-danger`}>**</span> </p>
            </div>

            <div className = {`mb-2`}>
                <SingleFileUploader
                    filePassHandler = {uploadFileHandler}
                    fileType = "img"
                    uploadFor = {updateType}
                />
            </div>

            <div>

                {/* upload button */}
                <button 
                className = {`btn btn-primary me-2 `}
                style = {{height: "15%", width: "15%"}}
                onClick = {(e) => pictureUpdateHandler (e)} //handler for update the existing image
                >
                    {
                        //handler the update button loading phase 
                        isUpdateButtonLoading
                        ?
                        // spinner
                        <div 
                        className="spinner-border text-primary"
                        role="status"
                        style = {{height: "15px", width: "15px"}}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <>
                            Update
                        </>
                    }
                </button>

                {/* cancel button */}
                <button 
                className = {`btn btn-danger`}
                onClick = {(e) => setIsVisible(false)}
                style = {{height: "15%", width: "15%"}}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {

    }
}
// get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        updateLoggedInUser : () => dispatch (reloadUserProcess())
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(PictureUpdate)

