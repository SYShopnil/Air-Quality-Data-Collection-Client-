import React,
{
  useEffect
} from 'react'
import {
  connect
} from "react-redux"
import { checkPreviousSession } from '../store/login/action'
import LoadingPage from "../../src/component/common/Loader/LoadingPage"

const AppWrapper = ({
  children,
  checkSession,
  isLoadingForCheckSession
}) => {

  //all use effect part

  //check the session
  useEffect (() => {
    (async() => {
      await checkSession();
    })()
  }, [])
  return (
    <>
      {
        isLoadingForCheckSession
        ?
        <LoadingPage/>
        :
        <div>{children}</div>
      }
    </>
  )
}

//get global state 
const mapStateToProps = (state) => {
    const {
        login: {
          isLoggedIn,
          loggedInUser,
          isLoading
        }
    } = state
    return {
        isLoggedIn,
        isLoadingForCheckSession: isLoading
    }
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        checkSession : () => dispatch (checkPreviousSession())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper) 