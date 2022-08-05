import React from 'react'
import SignUp from '../src/view/SignUp/SignUp'

const signUp = () => {
  return (
    <div className = {`container`}>
        <h1>Registration Form</h1>
        <div className = {``}>
          <SignUp/>
        </div>
    </div>
  )
}

export default signUp