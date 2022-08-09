import React, {
    useState,
    useEffect
} from 'react'
import ShowAIrDataTable from '../../component/common/Dashboard/ShowAIrDataTable'
import {connect} from "react-redux"
import { getAllAirData } from '../../store/readAirData/action'
import { addNewMessage } from '../../store/responseMessage/action'

const ShowMyData = (
    {
        fetchAirData,
        airData,
        pageNeed,
        dataLimit
    }
) => {
    // console.log(airData)
    //local state 
    const [sortBySelectionValue, setSortBySelectionValue] = useState (["Date", "A-Z(By Division)", "Z-A(By Division)"])
    // console.log(airData)
    // query data
    const [sortBy, setSortBy] = useState ("date")
    const [searchBy, setSearchBy] = useState ("")
    const [currentPageNo, setCurrentPageNo] = useState(1)
    console.log({currentPageNo})
    // console.log({sortBy, searchBy})


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
            <h1 className = {`text-center`}>My Air Data</h1>
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
                            if (selectOption.split("(")[1]){
                                value = selectOption.split ("(")[0]
                            }
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
            <div className = {`col-12 col-md-4 `}>
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
            <div>
                <ShowAIrDataTable
                    fetchData = {airData}
                    pageNeed = {pageNeed}
                    selectedPage = {currentPageNo}
                    setSelectPage = {setCurrentPageNo}
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
        fetchAirData : (searchBy, sortBy, pageNo, dataLimit) => dispatch (getAllAirData(searchBy, sortBy, pageNo, dataLimit))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ShowMyData)
