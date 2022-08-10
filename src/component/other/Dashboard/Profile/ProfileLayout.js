import React, {
    useEffect,
    useState
} from 'react'
import {
    connect
} from "react-redux"
import CoverAndProfilePic from './CoverAndProfilePic'
import PictureUpdate from './PictureUpdate'
import profileLayoutStyle from "./PictureLayout.module.css"
import AlertMessage from '../../../common/Alert/AlertMessage'
import AlertWithCancel from '../../../common/Alert/AlertWithCancel'
import { addNewMessage } from '../../../../store/responseMessage/action'
import profileStyle from "./ProfileLayout.module.css"

const ProfileLayout = ({
    children,
    user,
    addNewMessages,
    setShow,
    show
}) => {
    const [updatePictureType, setUpdatePictureType] = useState("")
    const [isUpdateShow, setIsUpdateShow] = useState (false) //handle the update picture component will visible ot not
    const [responseMessage, setResponseMessage] = useState([]) //this will show all response message of form submission 
    
    // console.log(responseMessage)

    useEffect (() => {
        if (responseMessage.length) {
            addNewMessages(responseMessage)
        }
    }, [responseMessage])
    return (
    // main wrapper
    <div className = {`row mt-3  `}>
        
        {/* profile picture and cover picture part left side part */}
        <div className = {`col-12 col-md-4 ${profileStyle.profilePicturePartWrapper} `}>
            <CoverAndProfilePic
                coverPic = {user.coverPic}
                titlePic = {user.titlePic}
                name = {user.name}
                isUpdateComponentVisible = {isUpdateShow}
                setUpdateComponentVisible = {setIsUpdateShow}
                setUpdatePictureType = {setUpdatePictureType}
            />
            <div className = {`mt-5 text-center`}>
                <p>Agent ID: {user.agentID}</p>
                <p>Agency Name: <span className = {`text-capitalize`}>{user.name}</span></p>
            </div>
            
        </div>


        {/* Profile details part*/}
        <div className = {`col-12 col-md-8`}>
            {/* profile details part wrapper */}
            <div className = {`row`}>
                <div className = {`col-6 text-center`}>
                    {/* it will show only the profile details part */}

                    {/* profile details button */}
                    <a 
                    onClick = {(e) => setShow ("details")}
                    style = {{cursor: "pointer"}}
                    className = {`${show == "details" && profileStyle.active}
                    ${profileStyle.profileDetailsAndPasswordChangeButton}`}>  Profile Details</a> 
                </div>


                <div className = {`col-6 text-center`}>

                    {/* Password change button */}
                    <a 
                    onClick = {(e) => setShow ("passwordChange")}
                    style = {{cursor: "pointer"}}
                    className = {`${show == "passwordChange" && profileStyle.active}
                    ${profileStyle.profileDetailsAndPasswordChangeButton}`}>Password Change</a>
                </div>
                <div className = {`col-12`}>
                    {children}
                </div>
            </div>
        </div>

        {/* update picture popup part */}
        {
            !!isUpdateShow
            &&
            <div className = {`${profileLayoutStyle.updateCompWrapper}`}>
            <PictureUpdate
                updateType =  {updatePictureType}
                isVisible = {isUpdateShow}
                setIsVisible = {setIsUpdateShow}
                responseMessage = {responseMessage}
                setResponseMessage = {setResponseMessage}
            />
        </div>
        }

         {/* {
                    !!responseMessage.length //if any response message insert into the array
                    &&
                    <div>
                         {
                            responseMessage.map ((msg, ind) => {
                                return (
                                    <AlertWithCancel
                                    type = {msg.type}
                                    message = {msg.message}
                                    allMessages = {responseMessage}
                                    setMessage = {setResponseMessage}
                                    />
                                )
                            })
                        }
                    </div>
                } */}
    </div>
  )
}

//get global state 
const mapStateToProps = (state) => {
    const {
        login
    } = state
    return {
        user: login.loggedInUser
    }
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        addNewMessages : (messages) => dispatch (addNewMessage(messages))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ProfileLayout)
    