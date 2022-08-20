import React, {
    useState,
    useEffect
} from 'react'
import ShowAIrDataTable from '../../component/common/Dashboard/ShowAIrDataTable'
import {connect} from "react-redux"
import { addNewMessage } from '../../store/responseMessage/action'
import { getAllDailyAirData } from '../../store/readDailyAirData/action'
import showDailyDataStyle from "./ShowMyDailyData.module.css"

const ShowMyDailyAirData = (
     {
        fetchAirData,
        airData,
        pageNeed,
        dataLimit
    }
) => {
    // console.log(airData)
    //local state 
    const [sortBySelectionValue, setSortBySelectionValue] = useState (
        [
            "Latest", 
            "Z-A(By median)", 
            "Z-A(By mean)", 
            "Z-A(By max)", 
            "Z-A(By sum)", 
            "Z-A(By count)"
        ]
    )
    const updateType = "dailyAirData"
    // console.log(airData)
    // query data
    const [sortBy, setSortBy] = useState ("date")
    const [searchBy, setSearchBy] = useState ("")
    const [currentPageNo, setCurrentPageNo] = useState(1)
    const [showHeaderField, setShowHeaderField] = useState(
        [
            "dataId", 
            "publishedDate", 
            "area",
            "mean",
            "max",
            "count"
        ]
    )
   
    //data fetch use effect
    useEffect (() => {
        (async () => {
            try {
                await fetchAirData (searchBy, sortBy, currentPageNo, dataLimit)
            }catch (err) {
                addNewMessage ([
                    {
                        type: "negative",
                        message: err.message
                    }
                ])
            }
        })()
    }, [sortBy, searchBy, currentPageNo ])

  return (
    //show my air data wrapper
    <div className = {`pt-3`}>
        {/* header  part */}
        <div>
            <h1 className = {`text-center`}>My Daily Air Data</h1>
        </div>

        <div className = {`row`} >
            {/* sorting selection part */}
            <div className = {`col-12 col-md-3 `}>
                <label htmlFor="sortBy" className = {`mb-2`}>Sort By</label>
                <select 
                className= {`form-select form-select-sm`} 
                aria-label=".form-select-sm example"
                onChange = {(e) => setSortBy(e.target.value)}
                >
                    {
                        sortBySelectionValue.map ((selectOption, ind) => {
                            let value = selectOption.toLowerCase()
                            if (ind > 0) {
                                if (selectOption.split("(")[1]){
                                    value = selectOption.split ("(")[1].split(")")[0].split (" ").join("").toLowerCase()
                                }
                            }
                            //   console.log(value)
                            return (
                                <option 
                                    value = {value.toLowerCase()}
                                    key = {ind}
                                    className = {`text-capitalize`}
                                >{selectOption}</option>
                            )
                        })
                    }
                </select>
            </div>
            
            {/* fake one */}
            <div className = {`col-0 col-md-4`}></div>
            
            {/* search bar */}
            <div className = {`col-12 col-md-4 d-flex justify-content-start align-items-end `}>
                 <form className ="d-flex">
                    <input 
                    className ="form-control me-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                    onChange = {(e) => setSearchBy (e.target.value)}/>
                </form>
            </div>
            {/* table part  wrapper main*/}
            <div className = {`${showDailyDataStyle.tableWrapper} mt-4 p-3`}>
                <ShowAIrDataTable
                    fetchData = {airData}
                    pageNeed = {pageNeed}
                    selectedPage = {currentPageNo}
                    setSelectPage = {setCurrentPageNo}
                    showHeaderField = {showHeaderField}
                    updateType = {updateType}
                    sortBy = {sortBy}
                    searchBy = {searchBy}
                    pageNo = {currentPageNo}
                    dataLimit = {dataLimit}
                />
            </div>
        </div>
    </div>
  )
}



//get global state 
const mapStateToProps = (state) => {
    const {
        airData
    } = state
    return {
        airData: airData.airData,
        pageNeed: airData.pageNeed,
        dataLimit: airData.dataLimit
    }
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAirData : (searchBy, sortBy, pageNo, dataLimit) => dispatch (getAllDailyAirData(searchBy, sortBy, pageNo, dataLimit))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ShowMyDailyAirData)
