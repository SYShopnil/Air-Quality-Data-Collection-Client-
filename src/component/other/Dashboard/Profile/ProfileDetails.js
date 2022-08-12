import React, {
  useEffect,
  useState
} from 'react'
import { connect} from "react-redux"
import { profileUpdateProcess } from '../../../../store/login/action'
import { addNewMessage } from '../../../../store/responseMessage/action'
import profileDetailsStylesheet from "./ProfileDetails.module.css"

const ProfileDetails = (
  {
    user,
    profileUpdate,
    addNewMessages
  }
) => {
  const initialProfileData = {
      name: user.name,
      email: user.email,
      area: user.area,
      district: user.district,
      division: user.division,
      country: user.country,
      motive: user.motive
  }
  //local state 
  const [profileData, setProfileData] = useState (initialProfileData)
  const [isLoading, setIsLoading] = useState (false)
  // console.log({profileData})
  //for update 
  const [updateProfileData, setUpdateProfileData] = useState (initialProfileData)
  // console.log(updateProfileData)
  const element = []
  const [attributes, setAttributes] = useState (
    [
      "Attribute",
      "Value",
      "Update"
    ]
  )
  const [updatingMode, setUpdatingMode] = useState ("")
  const updateSelectHandler = (e, field) => {
    e.preventDefault();
    // console.log(field)
    setUpdatingMode (field)
  }

  const updateHandler = async (e, field) => {
    e.preventDefault();
    setIsLoading (true)
    try {
      const body = {
        [field]: updateProfileData[field]
      }
      // console.log(body)
      await profileUpdate (body);
      setUpdatingMode("")

    }catch (err) {
      addNewMessages ([
        {
          type: "negative",
          message: err.message
        }
      ])
    }
  }

  useEffect (() => {
    if (isLoading) {
      setProfileData (
        {
            name: user.name,
            email: user.email,
            area: user.area,
            district: user.district,
            division: user.division,
            country: user.country,
            motive: user.motive
        })
        setIsLoading (false)
    }
  },[isLoading])
  //cross sign handler 
  const crossSignHandler = (e) => {
    e.preventDefault();
    setUpdatingMode ("")
  }

  for (let property in profileData) {
    element.push (
      <tr className="table-active" key = {property}>
          <td className = {`text-capitalize `}>{property}</td>
          <td className = {`${(property !== "Motive" || property !== "Email") && `text-capitalize`}`}>
            { //if select button has been clicked then it will show the updating input field otherwise it just show the data
              updatingMode == property
              ?
              <div>
                <input 
                type="text"
                name = {updateProfileData[property]}
                value = {updateProfileData[property]}
                onChange = {(e) =>setUpdateProfileData ({...updateProfileData, [property]:e.target.value})}/>
                
                <a  
                onClick = {(e) => {crossSignHandler(e)}}
                className = {``}>
                  <i  class="fa-solid fa-xmark"></i>
                </a>
              </div>
              :
              <>
                {profileData[property]}
              </>
            }
          </td>
          <td >
            {
              updatingMode == property
              ?
              <>
                {
                  isLoading
                  ?
                  <>
                    Loading...
                  </>
                  :
                  <button 
                  className = {`btn btn-primary ${profileDetailsStylesheet.editButtonWrap}`} 
                  onClick = {(e) => updateHandler(e,property )}>
                  <i class="fa-solid fa-check-double"></i>
                </button>
              }
              </>
              :
              <>
                  <button 
                  className = {`btn btn-primary  ${profileDetailsStylesheet.editButtonWrap}`} 
                  onClick = {(e) => updateSelectHandler(e,property )}>
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </>
               
            }
          </td>

      </tr>
    )
  }
  return (
    <div>
      <table class="table">
        <thead className = {`${profileDetailsStylesheet.theadRowWrapper}`} >
            <tr>
              {
                attributes.map ((atr, ind) => {
                  return (
                      <th>{atr}</th>
                  )
                })
              }
            </tr>
        </thead>
        <tbody className = {`${profileDetailsStylesheet.tbodyRowWrapper}`}>
            {element}
        </tbody>
      </table>
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
        addNewMessages : (messages) => dispatch (addNewMessage(messages)),
        profileUpdate: (body) => dispatch (profileUpdateProcess(body))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ProfileDetails)