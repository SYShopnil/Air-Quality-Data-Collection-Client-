import React, {
    useState
} from 'react'
import CsvFileSelector from '../../component/common/Dashboard/CsvFileSelector'
import ManualProcess from '../../component/other/Dashboard/AddAirData/ManualProcess'
import UploadByCSV from '../../component/other/Dashboard/AddAirData/UploadByCSV'
import AddDataLayout from '../../layout/AddDataLayout'
import {connect} from "react-redux"
import { baseUrl } from '../../../utils/baseUrl/baseUrl'


const AddAirData = (
    {
        selectFormat
    }
) => {

    //local state 
    // const [selectFormat, setSelectFormat] = useState ("csv")
  return (
    // main wrapper
    <AddDataLayout>
        {
            selectFormat == "csv"
            &&
            /* csv file selector */
            <UploadByCSV 
            format = {selectFormat}
            apiUrl = {`${baseUrl}/airData/create`}
            buttonName = {`Upload Air Data`}
            />
        }

        {
            selectFormat == "manually"
            &&
            /* manual process */
            <ManualProcess
                uploadFormat = {"manual"}
            />
        }
        
        
    </AddDataLayout>
  )
}

//get global state 
const mapStateToProps = (state) => {
    const {
        selectedOption
    } = state
    return {
        selectFormat: selectedOption.selectForFinalData
    }
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    // return {
    //     startLoginProcess : (formData) => dispatch (startLoginProcess(formData))
    // }
}

export default connect (mapStateToProps, mapDispatchToProps)(AddAirData)
