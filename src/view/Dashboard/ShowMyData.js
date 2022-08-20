import React, {
    useState,
    useEffect
} from 'react'
import ShowAIrDataTable from '../../component/common/Dashboard/ShowAIrDataTable'
import {connect} from "react-redux"
import { getAllAirData, updateAirData } from '../../store/readAirData/action'
import { addNewMessage } from '../../store/responseMessage/action'
import showMyDataStyleSheet from "./ShowMyData.module.css"

const ShowMyData = (
    {
        fetchAirData,
        airData,
        pageNeed,
        dataLimit
    }
) => {
    //local state 
    const [sortBySelectionValue, setSortBySelectionValue] = useState (["Date", "A-Z(By Division)", "Z-A(By Division)"])
    // query data
    const [sortBy, setSortBy] = useState ("date")
    const [searchBy, setSearchBy] = useState ("")
    const [currentPageNo, setCurrentPageNo] = useState(1)
    const updateType = "airData"
    const [showHeaderField, setShowHeaderField] = useState(
        [
            "dataId", 
            "publishedDate", 
            "valueOfPM",
            "stationNo",
            "division",
            "season"
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
        <div className = {`${showMyDataStyleSheet.titleHeaderWrapper}`}>
            <p className = {`text-center ${showMyDataStyleSheet.titleParagraphWrapper}`}>My Air Data</p>
        </div>

        <div className = {`row`} >
            {/* sorting selection part */}
            <div className = {`col-12 col-md-3 `}>
                <label htmlFor="sortBy" className = {`mb-2 fw-bold`}>Sort By</label>
                <select 
                className= {`form-select form-select-sm`} 
                aria-label=".form-select-sm example"
                onChange = {(e) => setSortBy(e.target.value)}
                >
                    {
                        sortBySelectionValue.map ((selectOption, ind) => {
                            let value = selectOption.toLowerCase()
                            if (selectOption.split("(")[1]){
                                value = selectOption.split ("(")[0]
                            }
                            // console.log(value)
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
            <div className = {`col-12 col-md-4 d-flex justify-content-start align-items-end`}>
                 <form className ="d-flex">
                    <input 
                    className = {`form-control me-2  ${showMyDataStyleSheet.searchBar} `} 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                    onChange = {(e) => setSearchBy (e.target.value)}/>
                </form>
            </div>
            {/* table part  wrapper main*/}
            <div className = {`bg-danger mt-3 p-2  ${showMyDataStyleSheet.tableWrapper}`}>
                <ShowAIrDataTable
                    fetchData = {airData}
                    pageNeed = {pageNeed}
                    selectedPage = {currentPageNo}
                    setSelectPage = {setCurrentPageNo}
                    showHeaderField = {showHeaderField}

                    sortBy = {sortBy}
                    searchBy = {searchBy}
                    pageNo = {currentPageNo}
                    dataLimit = {dataLimit}
                    updateType = {updateType}
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
        fetchAirData : (searchBy, sortBy, pageNo, dataLimit) => dispatch (getAllAirData(searchBy, sortBy, pageNo, dataLimit)),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ShowMyData)
