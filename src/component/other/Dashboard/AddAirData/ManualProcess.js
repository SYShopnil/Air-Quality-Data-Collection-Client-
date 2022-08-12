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
import manualProcessStylesheet from "./ManualProcess.module.css"

const ManualProcess = ({
  formData,
  setFormData,
  formStructure,
  checked,
  setChecked,
  dataSaveHandler,
  finalList,
  setFinalList
}) => {

  //all handler 
  const addToListHandler = (e) => {
    e.preventDefault();
    setFinalList ([...finalList, formData ])
    setFormData (formStructure)
  }

  const dataDeleteFromListHandle = (e, index) => {
    e.preventDefault();
    const refineList = finalList.filter ((value, ind) => ind != index)
    setFinalList (refineList)
  } 

  //data handler fo
  const dataHandler = (e, ind) => {
    e.preventDefault();
    const mainData = formData;
    mainData[ind]["field"] = e.target.value
    setFormData ([...mainData])
  }


  return (
    <div className = {`row`}>
      {/* header part */}
      <div className = {`col-12 ${manualProcessStylesheet.titleWrapper} ${finalList.length ? manualProcessStylesheet.titleBorderInFullList : manualProcessStylesheet.titleBorderInEmptyList  }`}>
          <p>Manually Add Air Data</p>
        </div>

      {/* input part wrap */}
      <div className = {`col-12 col-md-4`}>
        {/* file input part */}
        <form>
           {
            formData.map ((formBody, ind) => {
              // console.log(formBody.type)
              return (
                 <>
                  <div className="mb-3" key = {ind}>
                    <label for="for" className= {`form-label ${manualProcessStylesheet.labelWrapper}`}>{formBody.labelName}</label>
                    <input 
                    type= {formBody.type}
                    className="form-control" 
                    id="for" 
                    name = {formBody.field}
                    value = {formBody.field}
                    // onChange = {(e) => 
                    onChange = {(e) => dataHandler (e, ind)}
                    />
                  </div>
                   {
                    formBody.labelName == "Published Date"
                    &&
                    <>
                       <div className="form-check">
                          <input 
                          className="form-check-input " 
                          type="checkbox" 
                          defaultChecked={checked}
                          defaultValue = {checked}
                          onChange={(e) => setChecked (!checked)}
                          />
                          <label className= {`form-check-label ${manualProcessStylesheet.checkLabelWrapper}`} for="flexCheckDefault">
                            For Today
                          </label>
                      </div>
                    </>
                   }
                 </>
              )
            })
           }
          {/* check box for selected today date */}
           {/* add button */}
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