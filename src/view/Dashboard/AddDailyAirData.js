import React, {
    useState
} from 'react'
import UploadByCSV from "../../component/other/Dashboard/AddAirData/UploadByCSV"
import ManualHandler from '../../component/other/Dashboard/AddDailyAirData/ManualHandler'
import AddDailyDataLayout from '../../layout/AddDailyDataLayout'
import {connect} from "react-redux"
import { baseUrl } from '../../../utils/baseUrl/baseUrl'

const AddDailyAirData = (
    {
        selectFormat
    }
) => {
  return (
    <AddDailyDataLayout>
        {
            selectFormat == "csv"
            &&
            <div style = {{display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "85vh"}}>
                <div style = {{width: "100%"}}>
                    <UploadByCSV
                        format = {"csv"}
                        apiUrl = {`${baseUrl}/airData/daily/create`}
                        buttonName = {`Upload Daily Data`}
                    />
                </div>
            </div>
            
        }

        {
            selectFormat == "manually"
            &&
            <ManualHandler/>
        }
    </AddDailyDataLayout>
  )
}


//get global state 
const mapStateToProps = (state) => {
    const {
        selectedOption
    } = state
    return {
        selectFormat: selectedOption.selectForDailyData
    }
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    // return {
    //     startLoginProcess : (formData) => dispatch (startLoginProcess(formData))
    // }
}

export default connect (mapStateToProps, mapDispatchToProps)(AddDailyAirData)
