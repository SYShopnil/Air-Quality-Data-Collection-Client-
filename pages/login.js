import React from 'react'
import Login from '../src/view/Login/Login'

const login = () => {
  return (
    <div  className = {`container`} >
        <div>
          <h1>Login Form</h1>
        </div>
        {/* login form part */}
        <div>
          <Login/>
        </div>
    </div>
  )
}

export default login