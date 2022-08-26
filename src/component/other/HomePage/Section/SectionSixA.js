import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js';
import {baseUrl} from '../../../../../utils/baseUrl/baseUrl'
import { SectionSixADataManipulation } from '../../../../../utils/HomePage/SectionSixA';

const SectionSixA = () => {
  const [chart, setChart] = useState([]);//state for stations

    const [agents, setAgents] = useState([]);// state of agents

    const getAgents = async () => {
        const response = await axios.get(`${baseUrl}/airData/get/available/agency/final`)
        setAgents(response.data.agents);
    }

    //   get all stations
    const getStations = async (e) => {
        // const { name, value } = e.target;

        const body = {
            agentId: e.target.value
        }
        const response = await axios.post(`${baseUrl}/airData/get/aqi/all/station/of/agency`, body)
        // console.log("stations", response.data.airdata);
        const plot = SectionSixADataManipulation(response.data.airdata);
        console.log(plot)
        setChart(plot);
    }

    useEffect(() => {
        getAgents();
    }, [])
    return (
        <div 
            style = {{
             background: "#C4C6C9",
                padding: "2%",
                marginTop: "4%",
                paddingBottom: "5%"
        }}
        >
            <div>
              <h6 style = {{padding: "2%",
    background:"#F8F9FA"}} className='mt-5 h4 text-center' >Station-Wise AQI data visualization using a box plot,</h6>
            </div>
            <div className=' container mt-5'>
                <form action="" className='col-md-2 mt-3'>
                    {/* select agents   */}
                    <label htmlFor="yearTo"  style = {{fontWeight: "bolder"}}>Select Agency</label>
                    <select className='form-select' name="agentId" onChange={getStations} id="">
                        <option value="">Select Agent</option>
                        {
                            agents.map((agent, index) =>
                                <option key={agent.agentId} value={agent.agentId}>{agent.name}</option>)
                        }
                    </select>
                </form>
            </div>

            {/* graph */}
            <div className='text-center'>
                <Plot
                    data={chart}

                />
            </div>
        </div>
    )
}

export default SectionSixA