import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {baseUrl} from "../../../../../utils/baseUrl/baseUrl"
import LocationStatus from "../../../common/HomePage/SectionOne/LocationStatus"

const SectionOne = () => {
  const [divisions, setDivision] = useState([]);// all divisions
  const [divisionData, setDivisionData] = useState({});//divisons data
  const [divisionvalue, setdivisonValue] = useState("");// value from select element

  const changeHandler = async (e) => {
        e.preventDefault()
        const value = e.target.value;

        //will get value from input
        setdivisonValue(value);
        //get particular dta
        const result = await axios.get(`${baseUrl}/airData/get/avg/pm/${value}`, { withCredentials: true })

        //set the data of all divisions
        setDivisionData(result.data);
  }

  const getData = async () => {
      const result = await axios.get(`${baseUrl}/airData/get/available/division`);
      // console.log(result)
      const allDivisions = result.data.session;

      //set all divisions 
        setDivision(allDivisions);

  }

  useEffect(() => {
        getData();

  }, [])

  return (
    <div className='' style = {{
             background: "#C4C6C9",
                padding: "2%",
                marginTop: "4%",
                paddingBottom: "5%"
        }}>
            <h6 className='mt-5 h4 text-center' style = {{padding: "2%",
    background:"#F8F9FA"}}>Division wise Data</h6>
            <div className='col-md-2 my-4'>
                <label className = {``} style = {{fontWeight: "bold"}} htmlFor="">Select Division</label>
                <select className="form-select text-bold"
                    onChange={changeHandler}
                    value={divisionvalue} aria-label="select division">
                    <option >select division</option>
                    {divisions.map((division) =>
                        <option key={division.division} value={division.division}>{division.division}</option>)}

                </select>
            </div>
            <LocationStatus divisionData={divisionData} ></LocationStatus>
        </div>
  )
}

export default SectionOne