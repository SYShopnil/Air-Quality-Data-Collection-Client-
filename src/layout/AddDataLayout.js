import React,
{
    useState
} from 'react'
import {connect} from "react-redux"
import { selectAirDataFormat } from '../store/airDataSelection/action'


const AddDataLayout = ({
    children,
    setSelectedOption,
    selectFormat
}) => {

  return (
    //add data layout wrapper 
    <div className = {`row `} style = {{minHeight: "80vh"}}>
        {/* option choosing part  wrap */}
        <div className = {`col-12 col-lg-3 d-flex justify-content-center align-items-center`} >
           <div>
                <div className = {`mb-3`}>
                    <a 
                    className = {`btn ${selectFormat == "csv" ? "btn-success" : "btn-primary"}`}
                    onClick = {(e) => setSelectedOption(`csv`)}>Upload CSV File</a>
                </div>
                <div className = {`mb-3`}>
                    <a   
                    className = {`btn  ${selectFormat == "manually" ? "btn-success" : "btn-primary"}`}
                    onClick = {(e) => setSelectedOption(`manually`)}>Add Manually</a>
                </div>
            </div>
        </div>

        {/* show data part wrap children wrapper */}
        <div className = {`col-12 col-lg-9 d-flex justify-content-center align-items-center`}>
            {children}
        </div>
    </div>
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
    return {
        setSelectedOption : (selectOption) => dispatch (selectAirDataFormat (selectOption, "final"))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(AddDataLayout)
