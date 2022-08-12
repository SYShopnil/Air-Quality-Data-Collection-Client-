import React, {
    useEffect,
    useState
} from 'react'
import ManualProcess from './ManualProcess'
import {connect} from "react-redux"
import { baseUrl } from '../../../../../utils/baseUrl/baseUrl'
import { addNewMessage } from '../../../../store/responseMessage/action'
import axios from 'axios'
import manualHandlerForAddAirDataStyle from "./ManualHandler.module.css"

const ManualHandler = ({
    addNewErrorMessage
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
    const formStructure = [
        {
            type: "date",
            field: initialFormData.publishedDate,
            labelName: "Published Date",
            name: "publishedDate"
        },
        {
            type: "text",
            field: initialFormData.valueOfPM,
            labelName: "Value of PM 2.5",
            name: "valueOfPM"
        },
        {
            type: "text",
            field: initialFormData.avgTemp,
            labelName: "Average Temperature",
            name: "avgTemp"
        },
        {
            type: "text",
            field: initialFormData.rainPrecipitation,
            labelName: "Rain Precipitation",
            name: "rainPrecipitation"
        },
        {
            type: "text",
            field: initialFormData.windSpeed,
            labelName: "Wind Speed",
            name: "windSpeed"
        },
        {
            type: "text",
            field: initialFormData.visibility,
            labelName: "Visibility",
            name: "cloudCover"
        },
        {
            type: "text",
            field: initialFormData.cloudCover,
            labelName: "Cloud Cover",
            name: "visibility"
        },
        {
            type: "text",
            field: initialFormData.relHumidity,
            labelName: "Real Humidity",
            name: "relHumidity"
        },
        {
            type: "text",
            field: initialFormData.stationNo,
            labelName: "Station No",
            name: 'stationNo'
        },
        {
            type: "text",
            field: initialFormData.division,
            labelName: "Division",
            name: "division"
        },
        {
            type: "text",
            field: initialFormData.season,
            labelName: "Session",
            name: 'season'
        }
    ]

    const [makePublishedDateDisable, setMakePublishedDateDisable] = useState (false)
    const [isFirstTime, setIsFirsTime] = useState (false)
    const [formData, setFormData] = useState (formStructure)
    const [checked, setChecked] = React.useState(false);
    const [finalList, setFinalList] = useState ([])

    // console.log(formData)

    //all handler 
      const dataSaveHandler = async (e) => {
        // console.log(finalList
        e.preventDefault();
        try {
            const bodyData = [];
            finalList.forEach ((lists, ind) => {
                const obj = {}
                lists.forEach ((data, index) => {
                    obj[data.name] = data.field
                })
                bodyData.push (obj)
            })
            const body = {
                uploadFormat: "manual",
                airData: bodyData
            }
            console.log(body)
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
                setFinalList ([])
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
        // setFormData ({...formData, formData[]})
        formData.forEach ((data, ind) => {
            if (data.labelName == "Published Date"){
                const allData = formData
                allData[ind]["field"] =  publishedDate
                setFormData (allData)
            }
        })
        // console.log(new Date ().toDateString())
      }else {
         setMakePublishedDateDisable (false)
      }
    }else {
      setIsFirsTime (true)
    }
  }, [checked])


  return (
    <div className = {`${manualHandlerForAddAirDataStyle.handlerWrapper} ${(finalList.length) ? manualHandlerForAddAirDataStyle.mainWrapperBgHaveList : manualHandlerForAddAirDataStyle.mainWrapperBgEmptyList  } ` }>
        <ManualProcess
            formData = {formData}
            setFormData = {setFormData}
            formStructure = {formStructure}
            checked = {checked}
            setChecked = {setChecked}
            dataSaveHandler ={dataSaveHandler}
            finalList = {finalList}
            setFinalList = {setFinalList}
        />
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

export default connect (mapStateToProps, mapDispatchToProps)(ManualHandler)
