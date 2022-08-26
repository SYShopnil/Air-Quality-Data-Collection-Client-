import React, {useEffect, useState} from 'react'
import axios from "axios"
import {connect} from "react-redux"
import { addNewMessage } from '../../../../store/responseMessage/action'
import { baseUrl } from '../../../../../utils/baseUrl/baseUrl'
import { sectionSevenBDataManipulation } from '../../../../../utils/HomePage/SectionSeven'
import Plot from 'react-plotly.js'


const SectionSeven = ({
  newMessage
}) => {
  const  [availableSession, setAvailableSession] = useState ([])
  const [formData, setFormData] = useState ({
    sessionBy: "",
    queryByTime: ""
  })
const [airData, setAirData] = useState ([])
console.log(airData)
  //all handler 
  
  const showDataHandler = async (e) => {
    e.preventDefault();
    try {
      const {
        data: {
          message,
          status,
          airData
        }
      } = await axios.post (
        `${baseUrl}/airData/get/aqi/of/session`,
        formData,
        {
          withCredentials: true
        }
      )
      // console.log(formData)
      if (status == 202) {
        const data = sectionSevenBDataManipulation (airData)
        setAirData (data)
        newMessage ([{
            type: "positive",
            message
          }])
      }else {
        newMessage ([{
          type: "positive",
          message
        }])
    }

    }catch (err) {
      newMessage ([{
            type: "negative",
            message: err.message
          }])
    }
  }

  useEffect(() => {
    (async() => {
      try {
        const {
          data: {
            message,
            status,
            sessions
          }
        } = await axios.get (
          `${baseUrl}/airData/get/available/session`
        )
        
        if (status == 202) {
          setAvailableSession(sessions)
           newMessage ([{
                  type: "positive",
                  message
                }])
        }else {
           newMessage ([{
                  type: "negative",
                  message
                }])
        }
      }catch (err) {
         newMessage ([{
            type: "negative",
            message: err.message
          }])
      }
    })()
  }, [])
  return (
    <div
      style = {{
             background: "#C4C6C9",
                padding: "2%",
                marginTop: "4%",
                paddingBottom: "5%"
        }}
    >
      <div>
        <h6 style = {{padding: "2%",
    background:"#F8F9FA"}} className='mt-5 h4 text-center' >Season-Wise time based AQI data visualization using box plot,</h6>
      </div>

      {/* selection part */}
      <div>
        <form className = {`row`}>
          <div class="mb-3 col-12 col-md-4">
            <label for="exampleInputEmail1"  style = {{fontWeight: "bolder"}} class="form-label">Time</label>
            <select 
            class="form-select" 
            aria-label="Select Time"
            onChange={(e) => setFormData ({...formData,queryByTime: e.target.value })}>
                <option selected>Open this select menu</option>
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
            </select>
          </div>

          <div  class="mb-3 col-12 col-md-4">
            <label for="exampleInputEmail1" class="form-label"  style = {{fontWeight: "bolder"}} >Sessions</label>
            <select 
            class="form-select" 
            aria-label="Select Sessions"
             onChange={(e) => setFormData ({...formData,sessionBy: e.target.value })}>
                <option selected value = "all">All Session</option>
                {
                  availableSession.map ((session, ind) => {
                    return (
                      <option value={session.sessions}>{session.sessions}</option>
                    )
                  })
                }
            </select>
          </div>
          
          <div className = {`col-12 text-center`}>
            <button 
            class="btn btn-dark"
            onClick = {(e) => showDataHandler(e)}>Show Data</button>
          </div>
        </form>
      </div>

      {/* graph 
              */}
            <div className="text-center mt-3">
                <Plot data={airData} />
            </div>
    </div>
  )
}


//get global state 
const mapStateToProps = (state) => {
    
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        newMessage : (message) => dispatch(addNewMessage(message))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(SectionSeven)
