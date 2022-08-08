import React from 'react'
import {
  connect
} from "react-redux"
import { addNewMessage } from '../../../store/responseMessage/action';


const AlertWithCancel = ({type, message,setNewMessage, allMessages}) => {
    const cancelHandler = (e) => {
        e.preventDefault();
        const newMessage = allMessages.filter (messages => messages.message != message)
        // console.log(newMessage)
        setNewMessage ([{type: "positive", message: ""}])
        // setNewMessage ([])
    }
  return (
    <div class= {`alert ${type == "negative" && "alert-danger"} ${type == "positive" && "alert-primary"}`} role="alert">
        {message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
        onClick = {(e) => cancelHandler (e)}
        ></button>
    </div>
  )
}
//get global state 
const mapStateToProps = (state) => {
    const {
        messages
    } = state
    return {
        allMessages: messages.messages
    }
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        setNewMessage : (messages) => dispatch (addNewMessage (messages))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(AlertWithCancel)