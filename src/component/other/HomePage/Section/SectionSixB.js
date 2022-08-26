import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import { baseUrl } from '../../../../../utils/baseUrl/baseUrl';
import { sectionSixBDataManipulation } from '../../../../../utils/HomePage/SectionSixB';

const SectionSixB = () => {
  const [years, setYears] = useState([]);
    const [agents, setAgents] = useState([]);
    const [stations, setStations] = useState([]);
    const [agentId, setAgentId] = useState("");
    const [changeValue, setChangeValue] = useState({
        agentId: "",
        yearOf: "",
        stationNo: ""
    })
    const [chart, setChart] = useState([]);

    const [show, setShow] = useState(false)

    // const []
    //get all years
    // console.log({chart})
    const getYear = async () => {
        const response = await axios.get(`${baseUrl}/airData/get/available/published/year/final`)

        setYears(response.data.years);

    }

    //get all agents
    const getAgents = async () => {
        const response = await axios.get(`${baseUrl}/airData/get/available/agency/final`)

        setAgents(response.data.agents);


    }
    //pass agent id to get stations of agents 
    const postToGetStation = async (e) => {
        const body = {
            agentId: e.target.value,
        }
        // setAgentId(body.agentId);
        setAgentId (e.target.value)


        //post to get agents station
        const response = await axios.post(`${baseUrl}/airData/get/aqi/all/station/of/agency`, body)
        // console.log(response)
        //set the data of agents along with stations

        if (body === null) {
            setStations([]);

        }
        else {
            setStations(response.data.airdata);
        }
        setShow(true);



    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setChangeValue({ ...changeValue, agentId: agentId, [name]: value })

    }
    const onClickHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${baseUrl}/airData/get/aqi/of/station/monthly`, changeValue)
      // console.log(changeValue)
        graphData(response.data.airData);


    }

    const graphData = (data) => {

        const plot = []
        if (data === null) {
            setChart([])
        }
        else {
            const plot = sectionSixBDataManipulation (data)
            setChart(plot);
        }


    }

    useEffect(() => {
        getYear();
        // getAgents()
    }, [])
    useEffect(() => {
        getAgents();
    }, [])

    useEffect (() => {
      agentId
      &&
      (async () => {
        try {
           const body = {
            agentId,
          }
          // setAgentId(body.agentId);
          // setAgentId (e.target.value)


          //post to get agents station
          const response = await axios.post(`${baseUrl}/airData/get/aqi/all/station/of/agency`, body)
          // console.log(response)
          //set the data of agents along with stations

          if (body === null) {
              setStations([]);

          }
          else {
              setStations(response.data.airdata);
          }
          setShow(true);
        }catch (err) {
          console.log(err.message)
        }
      }) ()
    }, [agentId])
    return (
        <div className='mt-5' style = {{
             background: "#F8F9FA",
                padding: "2%",
                marginTop: "4%",
                paddingBottom: "5%"
        }}>
            <h6 style = {{padding: "2%",
                background:"#C4C6C9"}}
            className = {`h5 text-center`} >Station-Wise AQI data visualization using a box plot(Monthly) </h6>
            <div className = {`row`}>
                <div className = {`col-12 col-md-4`}>
                    <label htmlFor="yearTo"  style = {{fontWeight: "bolder"}}>Select Agency</label>
                    <select name="agentId" id="" onChange={postToGetStation} className = {`form-select`}>
                    <option value="">select agents</option>
                        {
                            agents.map((agent) =>
                                <option key={agent.agentId} value={agent.agentId}>{agent.name}</option>)
                        }
                    </select>
                </div>

            {
                stations && show &&
                    <div className='mt-2  col-12 col-md-4'>
                         <label htmlFor="yearTo"  style = {{fontWeight: "bolder"}}>Select Year</label>
                        <select name="yearOf" id="" onChange={onChangeHandler} className="form-select">
                            <option value="">select years</option>
                            {years.map((year) => <option key={year.year} value={year.year}>{year.year}</option>)}
                        </select>
    
                    </div>
            }
            {
                stations && show &&
                 <div className='mt-2  col-12 col-md-4' >
                        <label htmlFor="yearTo"  style = {{fontWeight: "bolder"}}>Select Station</label>
                        <select name="stationNo" className='mx-2 form-select'  onChange={onChangeHandler} id="">
                            <option value="">select Station</option>
                            {
                            stations.map((station) => 
                            <option key={station.station} value={station.station}>{station.station}</option>)}
                        </select>
                       
                    </div>
            }

            {   stations && show &&
                  <div className = {`text-center mt-3 `}>
                         <input type="submit" onClick={onClickHandler} value="showData" className='btn btn-dark' />
                    </div>
            }
            </div>
            
            {/* graph 
              */}
            <div className="text-center mt-3">
                <Plot data={chart} />
            </div>

        </div>
    )
}

export default SectionSixB