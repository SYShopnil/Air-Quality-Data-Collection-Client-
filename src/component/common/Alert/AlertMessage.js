import React from 'react'

const AlertMessage = ({type, message}) => {
  return (
    <div class= {`alert ${type == "negative" && "alert-danger"} ${type == "positive" && "alert-primary"}`} role="alert">
        {message}
        {/* {
          type = "negative" 
          &&
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        } */}
    </div>
  )
}

export default AlertMessage