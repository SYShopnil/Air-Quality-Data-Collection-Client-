import React from 'react'
import Login from '../src/view/Login/Login'
import loginPageStyle from "./login.module.css"

const login = () => {
  return (
    <div className = {`container`} >
      <div>
          <div>
            <h1>Login Form</h1>
          </div>
          {/* login form part */}
          <div>
            <Login/>
          </div>
      </div>
        
    </div>
  )
}

export default login