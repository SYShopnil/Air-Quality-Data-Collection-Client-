import axios from 'axios';

import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import { baseUrl } from '../../../../../utils/baseUrl/baseUrl';
import { DataStructForSectionTwoB } from '../../../../../utils/HomePage/SectionTwoB';

const SectionTwoB = () => {
  const [availableYear, setAvailableYear] = useState([]);//state for get all available years
    // const [yearValue, setYearValue] = useState([])//start year and end year value;

    const [agency, setAgency] = useState([]);// agenciens value
    let valueBody = {
        starYear: '',
        endYear: '',
        agencyOne: 0,
        agencyTwo: 0,
    }
   
    const [values, setValues] = useState(valueBody)
    const [airData, setAirData] = useState([])
    const [layout, setLayout] = useState([])
    // console.log(values)
    //get all years
    const getYears = async () => {

        try {
            const response = await axios.get(`${baseUrl}/airData/get/available/published/year/final`)
            const result = response.data.years;
            
            setAvailableYear(result);
            
        }
        catch (error) {
            console.log(error);

        }
    }

    //get all agencies
    const getAgency = async () => {
        try {
            const response = await axios.get(`${baseUrl}/airData/get/available/agency/final`)
            const result = response.data.agents;
            setAgency(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //submit to get the data
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`${baseUrl}/airData/get/daily/basis/mean/inRange/between/two`, values, { withCredentials: true })
            // console.log(response.data.airData);
            const result = response.data.airData;
            // setAirData(result);
            // console.log({
            //     response,
            //     agency: values.agencyOne,
            //     agencyTwo: values.agencyTwo
            // })
        // console.log(values)

            const {
                data,
                layout
            } = DataStructForSectionTwoB(result, values.agencyOne, values.agencyTwo)
            
            setLayout(layout)
            setAirData(data)
        }
        catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        getYears();
        getAgency()

    }, [])


    return (
        <div className='' style = {{
             background: "#C4C6C9",
                padding: "2%",
                marginTop: "4%",
                paddingBottom: "5%"
        }}>
            <h6 style = {{padding: "2%",
    background:"#F8F9FA"}} className='mt-5 h4 text-center' >A comparison between multiple data sources should be shown using line charts,
scatterplots, and boxplots,</h6>
            <form className='form row ' onSubmit={handleSubmit}>
                
                <div className = {`col-12 col-md-3 mt-2 mt-md-0`}>
                    {/* start  year  */}
                    <label style = {{fontWeight: "bold"}} htmlFor="">Select Start Year</label>
                    <select name="startYear" onChange={(e) => setValues({ ...values, starYear: e.target.value })} className='form-select'>
                        <option value="">select start year</option>
                        {availableYear.map((year) =>
                            <option key={year.year}
                                value={year.year}>{year.year}</option>)}

                    </select>
                </div>

                <div className = {`col-12 col-md-3 mt-2 mt-md-0`}>

                     <label style = {{fontWeight: "bold"}} htmlFor="">Select End Year</label>
                    {/* end year   */}
                    <select name="endYear" onChange={(e) => setValues({ ...values, endYear: e.target.value })} className='form-select '>

                        <option value="">select end year</option>
                        {availableYear.map((year) =>
                            <option key={year.year}
                                value={year.year}>{year.year}</option>)}

                    </select>
                </div>
                
                <div className = {`col-12 col-md-3 mt-2 mt-md-0`}>
                     <label style = {{fontWeight: "bold"}} htmlFor="">Select First Agency</label>
                    {/* first agent  */}
                    <select name="agencyOne" onChange={(e) => setValues({ ...values, agencyOne: e.target.value })} className='  form-select'>

                        
                        {agency.map((ag) =>
                            <option key={ag.name}
                                value={ag.agentId}>{ag.name}</option>)}
                    </select>
                </div>

                <div className = {`col-12 col-md-3 mt-2 mt-md-0`}>
                     <label style = {{fontWeight: "bold"}} htmlFor="">Select Second Agency</label>
                    {/* second agent  */}
                    <select name="agencyTwo" onChange={(e) => setValues({ ...values, agencyTwo: e.target.value })} className=' form-select'>

                       
                        {agency.map((ag) =>
                            <option key={ag.name}
                                value={ag.agentId}>{ag.name}</option>)}
                    </select>
                </div>
                <div className = {`col-12 text-center`}>
                    <button className='btn btn-dark mt-3 mb-3'> submit </button>
                </div>
            </form>

            <div className='text-center'>
                <Plot
                    layout={layout}
                    data={airData}
                />
            </div>
        </div>
    )
}

export default SectionTwoB