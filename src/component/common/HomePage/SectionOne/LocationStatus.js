import React, {useState} from 'react'

export default function LocationStatus({ divisionData }) {
    // console.log(divisionData);
    let { airData, message, status } = divisionData;
    const [isShow, setIsShow] = useState(false)

    let data = {
        aqiColor: "",
        level: "",
        division: "",
        average: "",
    }
    if (!airData) {
        data.aqiColor = "#8CBBE4";
        data.level = "status not found";
        data.average = "not found";
        data.division = "";

    }
    else {

        data.aqiColor = airData.aqiColor;
        data.level = airData.level;
        data.average = airData.average;
        data.division = airData.division;
    }
    let { aqiColor, level, average, division } = data;
    average = Number(average);

    return (
        <>
            <div className='col-md-10' style = {{background: "#F8F9FA",
    padding: "2%"}}>
                <div className='col-md-12 p-5' style={{ backgroundColor: aqiColor }}>
                    <h6 className='text-light text-center shadow-lg p-3 ' style={{ width: "200px" , border: "3px solid black !important" }}>AQI:  {average ? average.toFixed(2) : "Not Available"}</h6>
                    <div className = {`d-flex justify-content-center align-items-center`}>
                        <h6 className='' style = {{color: "#F8F9FA", textDecoration: "underline"}}>  {level.toUpperCase()}</h6>
                    </div>
                </div>
                <div className="overview my-3">
                    <button  
                    className='btn btn-dark'
                    onClick = {(e) => setIsShow(!isShow)}>{!isShow ? "Show Overview": "Hide Overview"}</button>
                    {division && <p>
                        What is the current air quality in {division ? division : ""}?</p>}
                </div>
                {
                    isShow
                    &&
                    <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Air Pollution Level</th>
                            <th scope="col">Air quality index</th>
                            <th scope="col">Main Pollutant</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <tr >{level}</tr>
                            <td>
                                {
                                    average
                                    ?
                                    `${average} US AQI`
                                    :
                                    "Not Available"
                                }
                            </td>
                            <td>PM2.5</td>

                        </tr>


                    </tbody>
                </table>
                }   
                
            </div >
        </>
    )
}