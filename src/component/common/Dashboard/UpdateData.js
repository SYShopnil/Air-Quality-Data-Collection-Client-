import React, {
    useState
} from 'react'
import updateDataStyleSheet from "./UpdateData.module.css"

const UpdateData = (
    {
        updateQueData,
        setIsUpdateShow,
        setUpdateQueData,
        updateHandler,
        isLoading
    }
) => {
    const element = [];
    console.log({updateQueData})
    for (let property in updateQueData) {
        element.push (
            <>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">{property}</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    value = {updateQueData[property]}
                    name = {property}
                    onChange = {(e) =>setUpdateQueData ({...updateQueData, [property]: e.target.value}) }/>
                </div>
            </>
        )
    }
  return (
    <div className = {`${updateDataStyleSheet.formWrap}`} >
        <form >
            {element}
            <button 
            type="submit" 
            className="btn btn-danger"
            onClick = {(e) => updateHandler (e)}
            >
                {
                    isLoading 
                    ? 
                    <>Loading...</>
                    :
                    <>Update</>
                }
            </button>
        </form>
        <i 
        className = {`${updateDataStyleSheet.cancelButton} fa-solid fa-xmark`}
        onClick = {(e) => setIsUpdateShow(false)}
        ></i>
    </div>
  )
}

export default UpdateData