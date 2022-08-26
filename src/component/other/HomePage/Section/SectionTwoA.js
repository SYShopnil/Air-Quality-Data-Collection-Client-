import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js';
import { baseUrl } from '../../../../../utils/baseUrl/baseUrl';
import { makeStructDataForSectionTwoA } from '../../../../../utils/HomePage/SectionTwoA';
import {connect} from "react-redux"
import { addNewMessage } from '../../../../store/responseMessage/action';

const SectionTwoA = ({
  newMessage
}) => {
  const [season, setSeason] = useState([]);
    const [seasonValue, setSeasonValue] = useState("");
    const [info, setInfo] = useState([])//holds all inforamtion of graph
    const [chart, setChart] = useState([]);


    //get all data by posting season
    const onChangeHandler = async (e) => {
        try {
            e.preventDefault();
            setSeasonValue(e.target.value);
            const body = {
                session: e.target.value.toLowerCase()
            }
            // console.log(body)
            const response = await axios.post(`${baseUrl}/airData/get/daily/basis/session`, body, { withCredentials: true })
            // console.log(response.data);
            const result = response.data;
            const { message, airData, status } = result;
            if (status === 202) {
                const structAirData = makeStructDataForSectionTwoA(airData)
                setInfo(structAirData);
                newMessage ([{
                  type: "positive",
                  message
                }])
            }
            else {
                newMessage ([{
                  type: "negative",
                  message
                }])
            }

        }
        catch (err) {
            // 
            newMessage ([{
              type: "negative",
              message: err.message
            }])

        }
    }
    const getAllSeason = async () => {
        try {
            const {
              data: {
                message,
                status,
                sessions
              }
            } = await axios.get(`${baseUrl}/airData/get/available/session`, { withCredentials: true });
            if (status == 202) {
               const data = sessions;
                // console.log(data);
                setSeason(data);
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
           

        }
        catch (err) {
            // console.log(error);
            newMessage ([{
                type: "negative",
                message: err.message
              }])
        }
    }
    useEffect(() => {
        getAllSeason();
    }, [])


    //log to info 
    // console.log("info is", info);

    // info.map((i) => console.log("all info ", i.x.map((x) => x)));


    return (
        <div className='row mt-5' style = {{
             background: "#F8F9FA",
                padding: "2%",
                marginTop: "4%",
                paddingBottom: "5%"
        }}>
            <h6 className='text-dark col-12 text-center h4'  style = {{padding: "2%",
    background:"#C4C6C9"}}>A comparison between multiple data sources  using line charts,
                scatterplots, and boxplots,</h6>
                
            <div className='col-12 col-md-3 mb-4'>
                 <label className = {``} style = {{fontWeight: "bold"}} htmlFor="">Select Session</label>
                <select
                    className="form-select"
                    onChange={onChangeHandler}
                    aria-label="Default select example">
                    <option value="">select season</option>
                    {season.map((s) =>
                        <option
                            key={s.sessions}
                            value={s.sessions}
                        >{s.sessions}</option>)}
                </select>
            </div>

            {/* graph  */}
            <div className='col-12 d-flex justify-content-center align-item-center'>
                <Plot
                    data={info}
                    layout={{ width: 1000, height: 500, title: 'A comparison between multiple data sources using line charts, scatterplots, and boxplots' }}
                />
            </div>
        </div >
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

export default connect (mapStateToProps, mapDispatchToProps)(SectionTwoA)
