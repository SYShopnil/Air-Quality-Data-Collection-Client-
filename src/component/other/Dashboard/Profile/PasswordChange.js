import React, {
  useState,
  useEffect
} from 'react'
import { addNewMessage } from '../../../../store/responseMessage/action'
import axios from "axios"
import { baseUrl } from '../../../../../utils/baseUrl/baseUrl'
import messageCreator from '../../../../../utils/MessageCreator/messageCreator'
import {connect} from "react-redux"
import passwordChangeStyle from "./PasswordChange.module.css"

const PasswordChange = ({
  addNewMessages
}) => {
  const [isNewPasswordShow, setIsNewPasswordShow] = useState (false)
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState (false)
  const initialPasswordField = {
    newPassword: "",
    confirmPassword: ""
  }
  const [passwordData, setPasswordData] = useState (initialPasswordField)

  //all handler 
  const updateHandler = async (e) => {
    e.preventDefault()
    try {
      const {
        data: {
          status,
          message
        }
      } = await axios.put (
        `${baseUrl}/agency/password/update`,
        passwordData,
        {
          withCredentials: true
        }
      ) //fetch the api for password update 
        // console.log(message)
      if (status == 202) { //if successfully 
        addNewMessages ([
          {
            type: "positive",
            message
          }
          
        ])
        setPasswordData (initialPasswordField)
      }else  if (status == 402){ //if there have any body input validation error
        const errorMessage = messageCreator (message);
        addNewMessages (errorMessage)
        
      } else {
        addNewMessages ([
          {
            type: "negative",
            message
          }
        ])
      }
    }catch (err) {
      addNewMessages ([
        {
          type: "negative",
          message: err.message
        }
      ])
    }
  }
  return (
    <div>
      <form>
        {/* new password */}
        <div className= {`mb-3 ${passwordChangeStyle.eyeWrapper}`}>
          <label for="exampleInputPassword1" className="form-label">New Password</label>
          <input 
          type= {`${isNewPasswordShow ? "text": "password"}`} 
          className="form-control" 
          id="exampleInputPassword1"
          value = {passwordData.newPassword}
          name = {passwordData.newPassword}
          onChange = {(e) => setPasswordData ({...passwordData, newPassword: e.target.value})}/>

          {/* eye part */}
          <div className = {`${passwordChangeStyle.eye}`}>
            <i 
            className= {`fa-solid ${isNewPasswordShow ? "fa-eye-slash" : "fa-eye"} `}
            style = {{cursor : "pointer"}}
            onClick = {(e) => setIsNewPasswordShow (!isNewPasswordShow)}></i>
          </div>
        </div>

        {/* confirm password */}
        <div className= {`mb-3  ${passwordChangeStyle.eyeWrapper}`}>
          <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input 
          type= {`${isConfirmPasswordShow ? "text": "password"}`}  
          className="form-control" 
          id="exampleInputPassword1"
           value = {passwordData.confirmPassword}
          name = {passwordData.confirmPassword}
          onChange = {(e) => setPasswordData ({...passwordData, confirmPassword: e.target.value})}
          />

          {/* eye part */}
          <div className = {`${passwordChangeStyle.eye}`}>
            <i 
            className= {`fa-solid ${isConfirmPasswordShow ? "fa-eye-slash" : "fa-eye"} `}
            style = {{cursor : "pointer"}}
            onClick = {(e) => setIsConfirmPasswordShow (!isConfirmPasswordShow)}></i>
          </div>
        </div>
        <button 
        type="submit" 
        className="btn btn-success"
        onClick = {(e) => updateHandler (e)}>Update</button>
      </form>
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

export default connect (mapStateToProps, mapDispatchToProps)(PasswordChange)
