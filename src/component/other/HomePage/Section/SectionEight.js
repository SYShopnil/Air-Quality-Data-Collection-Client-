import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import { baseUrl } from '../../../../../utils/baseUrl/baseUrl';
import { graphDataForSectionEight } from '../../../../../utils/HomePage/SectionEight';
import {connect} from "react-redux"
import { addNewMessage } from '../../../../store/responseMessage/action';


const SectionEight = ({
  newMessage
}) => {
  const [years, setYears] = useState([]);//state for all available years
    const [selectValue, setSelectValue] = useState({});
    const [chart, setChart] = useState([])//contains the value of charts


    //get all available years
    const getYears = async () => {
        try {
            const response = await axios.get(`${baseUrl}/airData/get/available/published/year/daily`)
          // console.log(response);
          
          if (response.data.status == 202) {
            setYears(response.data.years);
            newMessage ([{
              type: "positive",
              message: response.data.message
            }])
          }else {
            newMessage ([{
              type: "negative",
              message: response.data.message
            }])
          }
        }catch (err) {
          newMessage ([{
            type: "negative",
            message: err.message
          }])
        }
    }

    //get the data by posting the start and end year
    const onChangeHandler = (e) => {

        const { name, value } = e.target;
        setSelectValue({ ...selectValue, [name]: value })
        console.log(selectValue);

    }

    //post the data to get the data
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
          // console.log(`first`)
            const res = await axios.post(`${baseUrl}/airData/get/avg/aqi/by/year`, selectValue, { withCredentials: true })
            // console.log("yearly post data", res.data);
            if (res.data.status == 202) {
              const data = graphDataForSectionEight(res.data.airData);
              setChart (data)
              newMessage ([{
                type: "positive",
                message: res.data.message
              }])
            }else {
              newMessage ([{
                type: "negative",
                message: err.message
              }])
            }
        }catch (err) {
          newMessage ([{
            type: "negative",
            message: err.message
          }])
        }
    }

    //function that returns data that manipulate the graph

    
    // console.log(chart);
    let layout = { title: "Yearly average AQI data visualization using Bar Charts" }
    useEffect(() => {
        getYears();
    }, [])


    return (
        <div className='container mt-5 mb-5' style = {{
             background: "#F8F9FA",
                padding: "2%",
                marginTop: "4%",
                paddingBottom: "5%"
        }}>
            <h6 style = {{padding: "2%",
                background:"#C4C6C9"}}
            className = {`h5 text-center`}>Yearly average AQI data visualization using Bar Charts</h6>
            <form onSubmit={submitHandler} className='row' >
               <div className = {`col-12 col-md-4`}>
                <label for="exampleInputEmail1" class="form-label"  style = {{fontWeight: "bolder"}} >Select Start Year</label>
                 <select className = {`form-select`} name="startYear" onChange={onChangeHandler}>
                    <option value="">select start year</option>
                    {years.map((year) =>
                        <option key={year.year}
                            value={year.year}>{year.year}
                        </option>)}
                </select>
               </div>

               <div className = {`col-12 col-md-4`}>
                <label for="exampleInputEmail1" class="form-label"  style = {{fontWeight: "bolder"}} >Select End Year</label>
                 <select name="endYear" onChange={onChangeHandler}  className = {`form-select`}>
                    <option
                        value="">select end year</option>
                    {years.map((year) =>
                        <option key={year.year}
                            value={year.year}>{year.year}
                        </option>)}
                </select>
               </div>

                <div className = {`col-12 text-center my-3`}>
                  <input 
                    type="submit" 
                    value="Submit"
                    className='btn btn-dark '
                    onClick = {(e) => submitHandler(e)} />
                </div>
            </form>
            <div className='mt-5 text-center'>
                <Plot
                    data={chart}
                    layout={layout}
                />

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

export default connect (mapStateToProps, mapDispatchToProps)(SectionEight)