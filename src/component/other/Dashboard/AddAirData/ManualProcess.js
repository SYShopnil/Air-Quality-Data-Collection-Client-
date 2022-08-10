import React,
{
  useState,
  useEffect
} from 'react'
import ManualDataDisplay from './ManualDataDisplay'
import {connect} from "react-redux"
import { addNewMessage } from '../../../../store/responseMessage/action'
import axios from "axios"
import { baseUrl } from '../../../../../utils/baseUrl/baseUrl'
import messageCreator from "../../../../../utils/MessageCreator/messageCreator"

const ManualProcess = ({
  addNewErrorMessage,
  uploadFormat
}) => {
  const initialFormData = {
    publishedDate: "",
    valueOfPM: "",
    avgTemp: "",
    rainPrecipitation: "",
    windSpeed: "",
    visibility: "",
    cloudCover: "",
    relHumidity: "",
    stationNo: "",
    division: "",
    season: ""
  }
  const [inputField, setInputField] = useState (initialFormData) //state of form input
  const [makePublishedDateDisable, setMakePublishedDateDisable] = useState (false)
  const [checked, setChecked] = React.useState(false);
  const [isFirstTime, setIsFirsTime] = useState (false)
  const [finalList, setFinalList] = useState ([])
  console.log(inputField)
  
  //all handler 
  const addToListHandler = (e) => {
    e.preventDefault();
    setFinalList ([...finalList,inputField ])
  }

  const dataDeleteFromListHandle = (e, index) => {
    e.preventDefault();
    const refineList = finalList.filter ((value, ind) => ind != index)
    setFinalList (refineList)
  } 

  const dataSaveHandler = async (e) => {
    // console.log(`Hello`)
    e.preventDefault();
    try {
      const body = {
        uploadFormat,
        airData: finalList
      }
      const {data: {
        status,
        message
      }} = await axios.post (
        `${baseUrl}/airData/create`,
        body,
        {
          withCredentials: true
        }
      )
      // console.log(message)
      if (status == 201) {  //if successfully created
          addNewErrorMessage ([
          {
            type: "positive",
            message
          }
        ])
      } else if (status == 406) { //if body input validation error
        const errorMessage = messageCreator (message)
        addNewErrorMessage (errorMessage)
      }else {
        addNewErrorMessage ([
          {
            type: "negative",
            message
          }
        ])
      }
    }catch (err) {
      addNewErrorMessage ([
        {
          type: "negative",
          message: err.message
        }
      ])
    }
  }
  //set the checked part 
  useEffect (() => {
    if (isFirstTime) {
      if (checked) {
        setMakePublishedDateDisable (true)
        const [month, day, year] = new Date ().toLocaleDateString().split ("/")
        console.log(day.length)
        const publishedDate = `${year}-${(month.length > 1) ? month : "0" + month}-${(day.length > 1 ) ? day : "0"+day }`
        setInputField ({...inputField, publishedDate })
        // console.log(new Date ().toDateString())
      }else {
         setMakePublishedDateDisable (false)
      }
    }else {
      setIsFirsTime (true)
    }
  }, [checked])


  return (
    <div className = {`row`}>
      {/* header part */}
      <div className = {`col-12`}>
          <h1>Manually Add Air Data</h1>
        </div>

      {/* input part wrap */}
      <div className = {`col-12 col-md-4`}>
        {/* file input part */}
        <form>
          {/* published date */}
          <div className="mb-3">
            <label for="for" className="form-label">Published Date</label>
            <input 
            type="date" 
            className="form-control" 
            id="for" 
            name = {inputField.publishedDate}
            value = {inputField.publishedDate}
            disabled = {makePublishedDateDisable ? true : false}
            onChange = {(e) => setInputField ({...inputField, publishedDate: e.target.value })}
            />
          </div>

          {/* check box for selected today date */}
          <div className="form-check">
            <input 
            className="form-check-input" 
            type="checkbox" 
            defaultChecked={checked}
            defaultValue = {checked}
            onChange={(e) => setChecked (!checked)}
            />
            <label className="form-check-label" for="flexCheckDefault">
              For Today
            </label>
          </div>

          {/* pm2.5 value*/}
          <div className="mb-3">
            <label for="for" className="form-label">Value of PM 2.5</label>
            <input 
            type="text" 
            className="form-control" 
            id="for" 
            aria-describedby="pm2.5Value"
            name = {inputField.valueOfPM}
            value = {inputField.valueOfPM}
            onChange = {(e) => setInputField ({...inputField, valueOfPM: e.target.value })}
            />
          </div>

          {/* average temperature*/}
          <div className="mb-3">
            <label for="for" className="form-label">Average Temperature</label>
            <input 
            type="text" 
            className="form-control" 
            id="for" 
            name = {inputField.avgTemp}
            value = {inputField.avgTemp}
            onChange = {(e) => setInputField ({...inputField, avgTemp: e.target.value })}
            />
          </div>


          {/* rain Precipitation*/}
          <div className="mb-3">
            <label for="for" className="form-label">Rain Precipitation</label>
            <input 
            type="text" 
            className="form-control" 
            id="for" 
            name = {inputField.rainPrecipitation}
            value = {inputField.rainPrecipitation}
            onChange = {(e) => setInputField ({...inputField, rainPrecipitation: e.target.value })}
            />
          </div>

          {/* wind speed*/}
          <div className="mb-3">
            <label for="for" className="form-label">Wind Speed</label>
            <input 
            type="text" 
            className="form-control" 
            id="for" 
            name = {inputField.windSpeed}
            value = {inputField.windSpeed}
            onChange = {(e) => setInputField ({...inputField, windSpeed: e.target.value })}
            />
          </div>


          {/* visibility*/}
          <div className="mb-3">
            <label for="for" className="form-label">Visibility</label>
            <input 
            type="text" 
            className="form-control" 
            id="for" 
            name = {inputField.visibility}
            value = {inputField.visibility}
            onChange = {(e) => setInputField ({...inputField, visibility: e.target.value })}
            />
          </div>

          {/* cloud cover*/}
          <div className="mb-3">
            <label for="for" className="form-label">Cloud Cover</label>
            <input 
            type="text" 
            className="form-control" 
            id="for" 
            name = {inputField.cloudCover}
            value = {inputField.cloudCover}
            onChange = {(e) => setInputField ({...inputField, cloudCover: e.target.value })}
            />
          </div>
          
          {/* relHumidity*/}
          <div className="mb-3">
            <label for="for" className="form-label">Real Humidity</label>
            <input 
            type="text" 
            className="form-control" 
            id="for" 
            name = {inputField.relHumidity}
            value = {inputField.relHumidity}
            onChange = {(e) => setInputField ({...inputField, relHumidity: e.target.value })}
            />
          </div>


          {/* station no*/}
          <div className="mb-3">
            <label for="for" className="form-label">Station No</label>
            <input 
            type="text" 
            className="form-control" 
            id="for" 
            name = {inputField.stationNo}
            value = {inputField.stationNo}
            onChange = {(e) => setInputField ({...inputField, stationNo: e.target.value })}
            />
          </div>

          {/* Division*/}
          <div className="mb-3">
            <label for="for" className="form-label">Division</label>
            <input 
            type="text" 
            className="form-control" 
            id="for" 
            name = {inputField.division}
            value = {inputField.division}
            onChange = {(e) => setInputField ({...inputField, division: e.target.value })}
            />
          </div>

          {/* Session*/}
          <div className="mb-3">
            <label for="for" className="form-label">Session</label>
            <input 
            type="text" 
            className="form-control" 
            id="for" 
            name = {inputField.season}
            value = {inputField.season}
            onChange = {(e) => setInputField ({...inputField, season: e.target.value })}
            />
          </div>
          <button 
          type="submit" 
          className="btn btn-success"
          onClick = {(e) => addToListHandler (e)}
          >Add To List</button>
        </form>
      </div>

      {/* display part wrapper */}
      <div className = {`col-12 col-md-7`}>
          <ManualDataDisplay 
            finalDataList = {finalList}
            deleteHandler = {dataDeleteFromListHandle}
            saveHandler = {dataSaveHandler}
            />
      </div>
    </div>
  )
}

//get global state 
const mapStateToProps = (state) => {
    const {
        
    } = state
    return {
        
    }
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        addNewErrorMessage : (message) => dispatch (addNewMessage (message))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ManualProcess)