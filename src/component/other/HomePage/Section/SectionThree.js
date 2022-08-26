import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'
import Plot from "react-plotly.js"
import LoadingPage from '../../../common/Loader/LoadingPage'
import axios from "axios"
import {
  baseUrl
} from "../../../../../utils/baseUrl/baseUrl"
import {
    connect
} from "react-redux"
import { addNewMessage } from '../../../../store/responseMessage/action'
import { createGraphStructureForSectionThree } from '../../../../../utils/HomePage/SectionThree'
import PlotStructure from '../../../common/Dashboard/PlotStructure'

const SectionThree = ({
  newMessage
}) => {
  const [isLoading, setIsLoading] = useState (true)
  const [airData, setAirData] = useState ([])
  const [layout, setLayout] = useState ({})
  // console.log({layout})
  useEffect (() => {
    (async () => {
      try {
        const {
          data: {
            status,
            airData:rawAirData,
            message
          }
        } = await axios.get (`${baseUrl}/airData/get/aqi/all/division/data`, {withCredentials: true})
        if (status == 202) {
          // console.log(rawAirData)
          const {
            layout,
            airData
          } = createGraphStructureForSectionThree (rawAirData)
          setLayout (layout)
          setAirData (airData)
          setIsLoading (false)
           newMessage ([{
            type: "positive",
            message
          }])
        }else {
          setIsLoading (false)
           newMessage ([{
            type: "negative",
            message
          }])
        }
      }catch (err) {
        console.log (err.message)
        setIsLoading (false)
        newMessage ([{
          type: "negative",
          message: err.message
        }])
      }
    } )()
  }, [])
  return (
    <div className='row mt-5' style = {{
             background: "#F8F9FA",
                padding: "2%",
                marginTop: "4%",
                paddingBottom: "5%"
        }}>
        <h6
          style = {{padding: "2%",
            background:"#C4C6C9"}}
          className = {`h5 text-center`}
        >Data visualization of the daily Air Quality Index (AQI) per division on a map of Bangladesh,with color labeling based on the AQI</h6>
        {
          !isLoading
          &&
          <div className = {`text-center`}>
            <PlotStructure
              isLoading={isLoading}
              airData = {airData}
              layout = {layout}
            />
          </div>
        }
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

export default connect (mapStateToProps, mapDispatchToProps)(SectionThree)
