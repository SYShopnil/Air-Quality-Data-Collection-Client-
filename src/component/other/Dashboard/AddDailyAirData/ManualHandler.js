import React, {
    useEffect,
    useState
} from 'react'
import {connect} from "react-redux"
import { baseUrl } from '../../../../../utils/baseUrl/baseUrl'
import { addNewMessage } from '../../../../store/responseMessage/action'
import axios from 'axios'
import ManualProcess from '../AddAirData/ManualProcess'

const ManualHandler = ({
    addNewErrorMessage
}) => {
    const initialFormData = {
        publishedDate: "",
        area: "",
        latitude: "",
        longitude: "",
        median: "",
        mean: "",
        max: "",
        sum: "",
        count: ""
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
            field: initialFormData.area,
            labelName: "Area Name",
            name: "area"
        },
        {
            type: "text",
            field: initialFormData.latitude,
            labelName: "Latitude",
            name: "latitude"
        },
        {
            type: "text",
            field: initialFormData.longitude,
            labelName: "Longitude",
            name: "longitude"
        },
        {
            type: "text",
            field: initialFormData.median,
            labelName: "Median",
            name: "median"
        },
        {
            type: "text",
            field: initialFormData.mean,
            labelName: "Mean",
            name: "mean"
        },
        {
            type: "text",
            field: initialFormData.max,
            labelName: "Max",
            name: "max"
        },
        {
            type: "text",
            field: initialFormData.sum,
            labelName: "Sum",
            name: "sum"
        },
        {
            type: "text",
            field: initialFormData.count,
            labelName: "Count",
            name: 'count'
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
            // console.log(body)
            const {data: {
                status,
                message
            }} = await axios.post (
                `${baseUrl}/airData/daily/create`,
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
    <div>
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
