import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import { baseUrl } from '../../../../../utils/baseUrl/baseUrl';
import { SectionFiveDataManipulation } from '../../../../../utils/HomePage/SectionFive';

const SectionFive = () => {
   const [chart, setChart] = useState([]);
    let layout = {
        title: "line graph",
    }
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${baseUrl}/airData/get/aqi/all/division`)
                const result = response.data;
                 const data = SectionFiveDataManipulation (result.airData)
                setChart(data)
            }
            catch (error) {
                console.log(error.message);
            }
        })()
    }, [])
    return (
        <div className='mt-5' style = {{
             background: "#F8F9FA",
                padding: "2%",
                marginTop: "4%",
                paddingBottom: "5%"
        }}>
          <div>
             <h6  style = {{padding: "2%",
                background:"#C4C6C9"}}
            className = {`h5 text-center`} >Division-Wise daily AQI data visualization using line charts,</h6>
          </div>
        
            <div className = {`d-flex justify-content-center align-items-center`}>
               <div>
                 <Plot
                    data={chart}
                    layout={layout}
                />
               </div>
            </div>
        </div>
    )
}

export default SectionFive