import React, {useState, useEffect} from 'react'
import PlotStructure from '../../../common/Dashboard/PlotStructure'
import {
    connect
} from "react-redux"
import axios from 'axios'
import { baseUrl } from '../../../../../utils/baseUrl/baseUrl'
import { addNewMessage } from '../../../../store/responseMessage/action'
import { structureForMonthlyDataOfSectionFour, structureForYearlyDataOfSectionFour } from '../../../../../utils/HomePage/SectionFour'


const SectionFour = ({
  newMessage
}) => {
  // const [isLoading, setIsLoading] = useState (true)
  const [queryData, setQueryData] = useState ("yearly")

  const [queryOption, setQueryOption] = useState (["yearly", "monthly"])

  //for yearly query
  const [yearSelectBox, SetYearSelectBox] = useState ([])
  const [yearlySelectedData, setYearlySelectedData] = useState ({
    yearFrom: "",
    yearTo: ""
  })
  //for monthly query
  const [yearSelectBoxForMonth, setYearSelectBoxForMonth] = useState([])
  const [defaultSelectOptionForMonth, setDefaultSelectOptionForMonth] = useState ("")
  const [airData, setAirData] = useState ([])
  // console.log({yearlySelectedData})

  //all handler
  const dataSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = {
        queryBy:queryData
      }
      if (queryData == "yearly") {
        // console.log(yearlySelectedData)
        body.yearFrom = yearlySelectedData.yearFrom
        body.yearTo = yearlySelectedData.yearTo
      }else if (queryData == "monthly") {
        // console.log({year: defaultSelectOptionForMonth})
        body.year = defaultSelectOptionForMonth
      }
      
      const {data: {
        message,
        status,
        airData
      }} = await axios.post (
        `${baseUrl}/airData/get/aqi/all`,
        body,
        {
          withCredentials: true
        }
      )
      // console.log(status)
      if (status == 202) {
        if (queryData == "yearly") {
          const finalAirData = structureForYearlyDataOfSectionFour(airData)
          setAirData (finalAirData)
        }else if (queryData == "monthly") {
          const  finalAirData = structureForMonthlyDataOfSectionFour (airData)
          setAirData (finalAirData)
        }
      }else {
        newMessage ([{
          type: "negative",
          message
        }])
      }
    }catch(err) {
      newMessage ([{
          type: "negative",
          message: err.message
        }])
    }
  }


  //al useEffect 

  //use for get the available year
  useEffect (() => {
    (async () => {
      try {
        if (queryData == "yearly") {
            const {
            data: {
              status,
              years
            }
          } = await axios.get (`${baseUrl}/airData/get/available/published/year/final`)
          // console.log(years)
          if (status == 202) {
            const data = [];
            years.forEach(singleYear => {
              data.push (singleYear.year)
            })
            if (data.length >= 2) {
              setYearlySelectedData ({
                yearFrom: data[0],
                yearTo: data[1]
              })
            }
            SetYearSelectBox (data)
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
        }else if (queryData == "monthly") {
          // console.log(`hello`)
          const {
            data: {
              status,
              years
            }
          } = await axios.get (`${baseUrl}/airData/get/available/published/year/final`)
          // console.log(years)
          if (status == 202) {
            const data = [];
            years.forEach(singleYear => {
              data.push (singleYear.year)
            })
            if (data.length >= 1) {
              setDefaultSelectOptionForMonth (data[0])
            }
            setYearSelectBoxForMonth (data)
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
      }catch (err) {
        newMessage ([{
            type: "negative",
            message: err.message
          }])
      }
    })()
  }, [queryData])
  return (
    <div
       style = {{
             background: "#C4C6C9",
                padding: "2%",
                marginTop: "4%",
                paddingBottom: "5%"
        }}
    >
      {/* title wrapper */}
      <div>
           <h6 style = {{padding: "2%",
    background:"#F8F9FA"}} className='mt-5 h4 text-center' >Division-Wise Time-based Air Quality Index (AQI) data visualization using line charts</h6>
      </div>
     
      
      {/* graph wrapper */}
      <div className = {`row`}>
          {/* query Selector */}
          <div className = {`col-12 col-md-4 mt-2 mt-md-0`}>
            <label htmlFor="queryByt" style = {{fontWeight: "bolder"}}>Time</label>
            <select 
            class="form-select form-select-sm" 
            aria-label=".form-select-sm example"
            value = {queryData}
            onChange = {(e) => {setQueryData (e.target.value); setAirData ([])}}>
              {
                queryOption.map ((query, ind) => {
                  return (
                    <option 
                    selected
                    value = {query}
                    >
                      {query}
                    </option>
                  )
                })
              }
          </select>
          </div>

            {/* year range selector */}

            {
              queryData == "yearly"
              &&
              <>
                {/* query for yearly part */}
                {/* start year */}
                <div className = {`col-12 col-md-4 mt-2 mt-md-0`}>
                  <label htmlFor="Start Year"  style = {{fontWeight: "bolder"}}>Start Year</label>
                  <select 
                    class="form-select form-select-sm" 
                    aria-label=".form-select-sm example"
                    value = {yearlySelectedData.yearFrom}
                    onChange = {(e) => {setYearlySelectedData ({...yearlySelectedData, yearFrom: e.target.value})}}>
                      {
                        yearSelectBox.map ((year, ind) => {
                          return (
                            <option 
                            
                            value = {year}
                            >
                              {year}
                            </option>
                          )
                        })
                      }
                  </select>
                </div>

                {/* End year */}
                <div className = {`col-12 col-md-4 mt-2 mt-md-0`} >
                    <label htmlFor="yearTo"  style = {{fontWeight: "bolder"}}>End Year:</label>
                    <select 
                      class="form-select form-select-sm" 
                      aria-label=".form-select-sm example"
                      value = {yearlySelectedData.yearTo}
                      onChange = {(e) => {setYearlySelectedData ({...yearlySelectedData, yearTo: e.target.value})}}>
                        {
                          yearSelectBox.map ((year, ind) => {
                            return (
                              <option 
                              
                              value = {year}
                              >
                                {year}
                              </option>
                            )
                          })
                        }
                      </select>
                </div>

                
              </>
            }


            {/* query for monthly query */}
                {
                  queryData == "monthly"
                  &&
                  <div className = {`col-12 col-md-4 mt-2 mt-md-0`}>
                    <label htmlFor="Start Year">Select Year</label>
                    <select 
                      class="form-select form-select-sm" 
                      aria-label=".form-select-sm example"
                      value = {defaultSelectOptionForMonth}
                      onChange = {(e) => {setDefaultSelectOptionForMonth (e.target.value); }}>
                        {
                          yearSelectBoxForMonth.map ((year, ind) => {
                            return (
                              <option 
                              key = {ind}
                              value = {year}
                              >
                                {year}
                              </option>
                            )
                          })
                        }
                    </select>
                  </div>
                }
            <div className = {`text-center`}>
              <button
              className = {`btn btn-dark mt-3 mb-4 col-2`}
              onClick = {(e) => {dataSubmitHandler (e)} }
            >Show Data</button>
            </div>


            <div className = {`text-center`}>
              <PlotStructure
              isLoading = {false}
              airData = {airData}
              layout = {{
                  title:'Adding Names to Line and Scatter Plot'
              }}
            />
            </div>
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

export default connect (mapStateToProps, mapDispatchToProps)(SectionFour)
