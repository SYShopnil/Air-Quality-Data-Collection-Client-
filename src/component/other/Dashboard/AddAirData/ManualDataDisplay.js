import React from 'react'
import manualDataStyleSheet from "./ManualDataDisplay.module.css"

const ManualDataDisplay = ({
  finalDataList,
  deleteHandler ,
  saveHandler
}) => {
  return (
    <div>
       {
        !!finalDataList.length
        ?
        <div className = {`row`}>
          <div className = {`col-1`}></div>
          {
            finalDataList.map ((item, ind) => {
              return (
                <div className = {`col-12 p-5`}>
                  <p className = {`${manualDataStyleSheet.listText}`}>{++ind}</p>
                  {/* list wrapper */}
                  <div className = {`row`}>
                    <ul className="list-group col-10">
                      <li class="list-group-item">
                          <p><span className = {`fw-bold`}>Published Date: </span> <span>{item.publishedDate ? item.publishedDate : "Not Available"}</span> </p> 
                          <p><span className = {`fw-bold`}>ValueOf PM 2.5: </span> <span>{item.valueOfPM ? item.valueOfPM : "Not Available"}</span> </p>  
                          <p><span className = {`fw-bold`} >Rain Precipitation: </span> <span>{item.rainPrecipitation ? item.rainPrecipitation : "Not Available"}</span> </p>  
                          <p><span className = {`fw-bold`}>Wind Speed: </span> <span>{item.windSpeed ? item.windSpeed : "Not Available"}</span> </p>  
                          <p><span className = {`fw-bold`}>Visibility: </span> <span>{item.visibility ? item.visibility : "Not Available"}</span> </p>  
                          <p><span className = {`fw-bold`}>Cloud Cover: </span> <span>{item.cloudCover ? item.cloudCover : "Not Available"}</span> </p>  
                          <p><span className = {`fw-bold`}>Real Humidity: </span> <span>{item.relHumidity ? item.relHumidity : "Not Available"}</span> </p>  
                          <p><span className = {`fw-bold`}>Station No: </span> <span>{item.stationNo ? item.stationNo : "Not Available"}</span> </p>  
                          <p><span className = {`fw-bold`}>Division: </span> <span>{item.division ? item.division : "Not Available"}</span> </p>  
                          <p><span className = {`fw-bold`}>Session: </span> <span>{item.season ? item.season : "Not Available"}</span> </p>  
                      </li>
                    </ul>
                     <a className = {`col-2 d-inline-block`}
                     onClick = {(e) => {deleteHandler (e, --ind)}}
                     >
                      <i className= {`fa-solid fa-minus ${manualDataStyleSheet.deleteButton} `}></i>
                     </a>
                  </div>
                </div>
              )
            })
          }
          <div className = {`col-1`}></div>
          <div className = {`col-3`}></div>
          <div className = {`col-8`}>
            <button 
            className = {`btn btn-primary`}
            onClick = {(e) => saveHandler (e)}>Save Data</button>
          </div>
        </div>
        :
        <div>
          <h1>No Air Data in the list.....</h1>
        </div>
       }
    </div>
  )
}

export default ManualDataDisplay

// publishedDate: "",
//     valueOfPM: "",
//     avgTemp: "",
//     rainPrecipitation: "",
//     windSpeed: "",
//     visibility: "",
//     cloudCover: "",
//     relHumidity: "",
//     stationNo: "",
//     division: "",
//     season: ""